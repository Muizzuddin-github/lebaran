import axios from "axios";

const getAll = async (setKunjungan,token) => {
    const {data} = await axios.get('/api/orang',{
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    })
    setKunjungan(data.data)
    return data.data
}
 
export default getAll;