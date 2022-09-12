import {Users} from '../../../database/schemaUsers'
import {Status} from '../../../database/schemaStatus'
import authorization from "../../../funcAuth/authorization"

// hapus akun

export default async function account (req,res){
   const {id} = await authorization(res,process.env.SECRET_LOGIN,req.headers.authorization)

   if(req.method === 'POST'){
        try{

          const {nama} = req.body

          const user = await Users.findOne({_id : id})
          if(!user) return res.status(404).json({msg : "user tidak ada"})

          if(nama.length < 3){
          return res.status(400).json({msg : 'Nama terlalu pendek'})
          }else if(nama.length > 25){
          return res.status(400).json({msg : "Nama terlalu panjang"})
          }

          await Users.updateOne({_id : id},{
          $set : { nama }
          })

          return res.status(200).json({msg : "Nama berhasil diubah",namaUser : nama})

        }catch(err){
          return res.status(400).json({msg : err.message})
        }
   }

    if(req.method !== 'DELETE') return res.status(405).json({msg : "method not aloowed"})
    
   try{
        const user = await Users.findOne({_id : id})
        if(!user) return res.status(404).json({msg : "user tidak ada"})

        const hapusUser = await Users.deleteOne({_id : id})
        await Status.deleteMany({id_user : id})
        res.status(200).json({msg : 'Akun berhasil dihapus',user : hapusUser})
    
   }catch(err){
        res.status(400).json({msg : err.message})
   }
}