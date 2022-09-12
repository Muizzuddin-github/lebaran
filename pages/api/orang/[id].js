import { Users } from "../../../database/schemaUsers";
import { Status } from "../../../database/schemaStatus";
import authorization from "../../../funcAuth/authorization";
import mongoose from "mongoose";

const singleData = async (req,res) => {
    // check token, check schema token
    const {id} = await authorization(res,process.env.SECRET_LOGIN,req.headers.authorization)
    const check = await Users.findOne({_id : id})
  
    if(!check) return res.status(401).json({msg : 'anda belum melakukan registrasi'})
  

    try{
        if(req.method === 'GET'){
            const data = await Status.aggregate([
                {$match : {id_user : id}},
                {$unwind : "$kunjungan"},
                {$project : {_id : 0,id_user : 0}},
                {$match : {"kunjungan._id" : mongoose.Types.ObjectId(req.query.id)}}
            ])

            if(!data.length) return res.status(404).json({msg : "data tidak ditemukan",data})
            return res.status(200).json({data})
        }else if(req.method === 'PUT'){


            const {nama,alamat,noHP,tanggal,status} = req.body            
            const checkUserKunjungan = await Status.aggregate([
                {$unwind : "$kunjungan"},
                {$match : {id_user : id}},
                {$match : {"kunjungan._id" : mongoose.Types.ObjectId(req.query.id)}}
            ])

            if(!checkUserKunjungan.length) return res.status(404).json({msg : `akun ini tidak memiliki kunjungan tersebut`})


            const checkStatus = await Status.findOne({id_user : id,status})

            if(!checkStatus){
              const tambahStatus = new Status({
                status : status,
                id_user : id,
                kunjungan : []
              })
      
              await tambahStatus.save()
            }


            if(checkUserKunjungan[0].status !== status) {

                await Status.updateOne({_id : mongoose.Types.ObjectId(checkUserKunjungan[0]._id) },{
                    $pull : {
                        kunjungan : {
                            _id : mongoose.Types.ObjectId(req.query.id)
                        }
                    }
                })
                
                await Status.updateOne({status},{
                    $push : {
                        kunjungan : { nama,alamat,noHP,tanggal }
                    }
                })
                
            }else{
                await Status.updateOne({id_user : id,status},{
                    $set : {
                        "kunjungan.$[element].nama" : nama,
                        "kunjungan.$[element].alamat" : alamat,
                        "kunjungan.$[element].noHP" : noHP,
                        "kunjungan.$[element].tanggal" : tanggal,
                        }
                },{
                    arrayFilters : [
                        {
                            "element._id" : mongoose.Types.ObjectId(req.query.id)
                        }
                    ]
                }
                )
            }

            return res.status(200).json({msg : 'data berhasil diubah'})
        }else if(req.method === "DELETE"){

            const checkUserKunjungan = await Status.aggregate([
                {$unwind : "$kunjungan"},
                {$match : {id_user : id}},
                {$match : {"kunjungan._id" : mongoose.Types.ObjectId(req.query.id)}}
            ])

            if(!checkUserKunjungan.length) return res.status(404).json({msg : `akun ini tidak memiliki kunjungan tersebut`})

            await Status.updateOne({_id : mongoose.Types.ObjectId(checkUserKunjungan[0]._id) },{
                $pull : {
                    kunjungan : {
                        _id : mongoose.Types.ObjectId(req.query.id)
                    }
                }
            })

            await Status.deleteMany({
                kunjungan : {
                    $size : 0
                }
            })

            res.status(200).json({msg : "data telah dihapus"})
        }else{
            return res.status(405).json({msg : "method not allowed"})
        }
    }catch(err){
        res.status(400).json({msg : err.message})
    }
}
 
export default singleData;
