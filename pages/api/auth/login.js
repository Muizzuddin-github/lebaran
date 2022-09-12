import {Users} from '../../../database/schemaUsers'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import validator from "validator"

const login = async (req,res) => {
    if(req.method !== 'POST') return res.status(405).json({msg : "Method not allowed"})

    try{
        const {email,password} = req.body

        if(!validator.isEmail(email)) return res.status(400).json({msg : "Yang ada masukkan bukan email"})

        const user = await Users.findOne({email})
        if(!user) return res.status(404).json({msg : 'Silahkan buat akun terlebih dahulu'})

        const checkPassword = bcrypt.compareSync(password,user.password)
        if(!checkPassword) return res.status(401).json({msg : "Password salah"})

        const token = jwt.sign({id : user._id},process.env.SECRET_LOGIN,{
            expiresIn : '1d'
        })

        return res.status(200).json({msg : 'Berhasil login',token})
    }catch(err){
        return res.status(400).json({msg : err.message})
    }
}
 
export default login;