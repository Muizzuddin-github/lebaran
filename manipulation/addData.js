import axios from "axios";

const addData = async (data,token) => {
    
    const hasil = await axios.post('/api/orang', data,{
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    })
    return hasil
}
 
export default addData;