import {Status} from '../../database/schemaStatus'
import {Users} from '../../database/schemaUsers'
import authorization from "../../funcAuth/authorization"

export default async function handler(req, res) {

  // check token, check schema token
  const {id} = await authorization(res,process.env.SECRET_LOGIN,req.headers.authorization)

  const check = await Users.findOne({_id : id})

  if(!check) return res.status(401).json({msg : 'anda belum melakukan registrasi'})

  if(req.method === 'POST'){
    try{

      const {nama,alamat,noHP,tanggal,status} = req.body

      const checkKunjungan = await Status.aggregate([
        {$unwind : '$kunjungan'},
        {$match : {id_user : id}},
        {$match : {
          "kunjungan.nama" : nama,
          "kunjungan.alamat": alamat,
          "kunjungan.noHP" : noHP,
          "kunjungan.tanggal" : tanggal
        }}
      ])

      if(checkKunjungan.length != 0){
        throw new Error('data sudah ada')
      }

      const checkKunjunganUnique = await Status.aggregate([
        {$unwind : '$kunjungan'},
        {$match : {id_user : id}},
        {$match : {
          "kunjungan.noHP" : noHP,
          "kunjungan.tanggal" : tanggal
        }}
      ])


      if(checkKunjunganUnique.length != 0){
        if(nama !== checkKunjunganUnique[0].nama){
          throw new Error('noHP tidak boleh sama')
        }else if(alamat !== checkKunjunganUnique[0].alamat){
          throw new Error('noHP tidak boleh sama')
        
        }
      }


      const checkStatus = await Status.findOne({id_user : id,status})

      if(!checkStatus){
        const tambahStatus = new Status({
          status : status,
          id_user : id,
          kunjungan : []
        })

        await tambahStatus.save()
      }



      const kunjungan = await Status.updateOne({id_user : id,status},{
        $push : {
          kunjungan : { nama,alamat,noHP,tanggal }
        }
      })
      return res.status(201).json({msg : "data berhasil ditambahkan",kunjungan})
    
    }catch(err){
      return res.status(400).json({msg : err.message})
    }
  }

  if(req.method != 'GET') return res.status(405).json({msg : "method not allowed"})


  try{
    const data = await Status.aggregate([
      {$match : {id_user : id}},
      {$unwind : "$kunjungan"},
      {$project : {_id : 0,id_user : 0}},
      {$sort : {'kunjungan.tanggal' : -1,'kunjungan.nama' : 1}}
    ])

    return res.status(200).json({jumlahData : data.length,data})
  }catch(err){
    return res.status(500).json({msg : err.message})
  }
  
}