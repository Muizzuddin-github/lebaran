import { Users } from '../../../database/schemaUsers'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import validator from 'validator'

const forgot = async (req,res) => {
    if(req.method !== 'POST') return res.status(405).json({msg : 'method not allowed'})

    try{
        const {email} = req.body

        // check email dan validasi email
        if(!email) return res.status(400).json({msg : 'Tuliskan email terlebih dahulu'})
        if(!validator.isEmail(email)) return res.status(400).json({msg : 'Yang anda masukkan bukan email'})

        

        const user = await Users.findOne({email})
        if(!user) return res.status(404).json({msg : 'Silahkan buat akun dahulu'})

        // buat token

        const token = jwt.sign({id : user.id, email : user.email},process.env.SECRET_FORGOT_PASS,{expiresIn : '3m'})

        // buat email pengirim

        const pengirim = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
            user: process.env.SECRET_EMAIL, 
            pass: process.env.SECRET_EMAIL_PASS  
            }
        })

        // kirim ke email tujuan

        const kirim = await pengirim.sendMail({
            from : 'Idul fitri center',
            to : email,
            subject : "Link reset password",
            html : `<h3> silahkan klik link dibawah untuk mereset password anda </h3> <p> jika link tidak bisa maka klik lupa password lagi pada menu login </p> <p> ${req.headers.origin}/password/${token} </p>`
        })

        return res.status(200).json({msg : 'Check gmail anda',messageID : kirim.messageId,token})

    }catch(err){
        return res.status(400).json({msg : err.message})
    }

}
 
export default forgot;