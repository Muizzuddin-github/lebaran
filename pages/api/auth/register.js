import validator from "validator"
import bcrypt from 'bcryptjs'
import {Users} from '../../../database/schemaUsers'


const register = async (req,res) => {
    if(req.method !== 'POST') return res.status(405).json({msg : 'method not allowed'})
    try{
        const {nama,email,password} = req.body

        if(nama.length < 3){
            return res.status(400).json({msg : 'Nama terlalu pendek'})
        }else if(nama.length > 25){
            return res.status(400).json({msg : "Nama terlalu panjang"})
        }

        // validasi email
        if(!validator.isEmail(email)) return res.status(400).json({msg : 'Yang anda masukkan bukan email'})

        // check email
        const checkEmail = await Users.findOne({email})
        if(checkEmail) return res.status(401).json({msg : "User sudah ada"})
        
        // check length password
        if(password.length < 5){
            return res.status(401).json({msg : 'Password terlalu pendek'})
        }else if(password.length > 40){
             return res.status(401).json({msg : 'Password terlalu panjang'})
        }

        // hash password
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password,salt)

        const tambahUser = new Users({nama,email, password : hashPassword})
        const user = await tambahUser.save()


        return res.status(201).json({msg : "Berhasil membuat akun",userID : user._id})

    }catch(err){
        return res.status(400).json({msg : err.message})
    }
}
 
export default register;