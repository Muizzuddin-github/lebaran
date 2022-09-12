import authorization from '../../funcAuth/authorization'
import axios from 'axios'
import { Users } from '../../database/schemaUsers'

const motivasi = async (req,res) => {
    if(req.method !== 'GET') return res.status(405).json({msg : "method not allowed"})

    const {id} = await authorization(res,process.env.SECRET_LOGIN,req.headers.authorization)

    try{

        const check = await Users.findOne({_id : id})

        if(!check) return res.status(401).json({msg : 'anda belum melakukan registrasi'})

        const {data} = await axios.get('https://zenquotes.io/api/random ')


        const options = {
            method: 'GET',
            url: 'https://translated-mymemory---translation-memory.p.rapidapi.com/api/get',
            params: {langpair: 'en|id', q: data[0].q, mt: '1', onlyprivate: '0', de: 'a@b.c'},
            headers: {
              'X-RapidAPI-Key': '96184d6484msh0b821f95cd5a6b9p14a39djsn9dfcb068e476',
              'X-RapidAPI-Host': 'translated-mymemory---translation-memory.p.rapidapi.com'
            }
          };

        const hasil = await axios.request(options)
          

        return res.status(200).json({author : data[0].a,indo : hasil.data.responseData.translatedText,eng : data[0].q})
    }catch(err){
        return res.status(500).json({msg : err.message})
    }
}
 
export default motivasi;