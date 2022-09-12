import {Users} from '../../../../database/schemaUsers'
import {Status} from '../../../../database/schemaStatus'
import authorization from "../../../../funcAuth/authorization";

const search = async (req,res) => {

    if(req.method != 'GET') return res.status(405).json({msg : "method not allowed"})

    // check token, check schema token
    const {id} = await authorization(res,process.env.SECRET_LOGIN,req.headers.authorization)
    const check = await Users.findOne({_id : id})
  
    if(!check) return res.status(401).json({msg : 'anda belum melakukan registrasi'})


   // searching
        try{
            const search = req.query.src
            let data = await Status.aggregate([
            
                { $match: { id_user : id } },
                { $unwind : "$kunjungan" },
                { $project: { _id: 0,id_user : 0, } },
                {
                    $match : {
                        $or : [
                            { status : {$regex : search,$options : 'i'} },
                            { 'kunjungan.nama' : {$regex : search,$options : 'i'} },
                            { 'kunjungan.alamat' : {$regex : search,$options : 'i'} },
                            { 'kunjungan.noHP' : {$regex : search,$options : 'i'} },
                            { 'kunjungan.tanggal' : {$regex : search,$options : 'i'} },
                        ]
                    }
                }

            ])
            res.status(200).json({data})
        }catch(err){
            res.status(400).json({msg : err.message})
        }
}
 
export default search;

