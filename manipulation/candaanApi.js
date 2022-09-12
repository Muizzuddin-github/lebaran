import axios from "axios";

const candaanApi = async (token) => {
    const {data} = await axios.get('/api/candaan',{
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    })
    return data
}
 
export default candaanApi;