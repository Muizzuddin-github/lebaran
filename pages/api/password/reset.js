import jwt from 'jsonwebtoken'
import { Users } from '../../../database/schemaUsers'
import bcrypt from 'bcryptjs'

const resetPasswod = async (req,res) => {

    if(req.method !== 'POST') return res.status(405).json({msg : "method not allowed"})

    try{
        const {token,password} = req.body
        const {id} = jwt.verify(token,process.env.SECRET_FORGOT_PASS)

        const user = await Users.findOne({_id : id})
        if(!user) return res.status(404).json({msg : "Token invalid user tidak ada"})

        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password,salt)


        const userUpdate = await Users.updateOne({_id : id},{$set : {
            password : hashPassword
        }})
        return res.status(200).json({msg : "Password berhasil diubah",user : userUpdate})


    }catch(err){
        return res.status(400).json({msg : err.message})
    }
}
 
export default resetPasswod;