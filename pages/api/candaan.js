import authorization from '../../funcAuth/authorization'
import axios from 'axios'
import { Users } from '../../database/schemaUsers'

const candaan = async (req,res) => {
    if(req.method !== 'GET') return res.status(405).json({msg : "method not allowed"})

    const {id} = await authorization(res,process.env.SECRET_LOGIN,req.headers.authorization)

    try{

        const check = await Users.findOne({_id : id})

        if(!check) return res.status(401).json({msg : 'anda belum melakukan registrasi'})

        const {data} = await axios.get('https://zenquotes.io/api/random ')

        return res.status(200).json(data[0])
    }catch(err){
        return res.status(500).json({msg : err.message})
    }
}
 
export default candaan;