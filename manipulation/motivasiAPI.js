import axios from "axios";

const candaanApi = async (token) => {
    const {data} = await axios.get('/api/motivasi',{
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    })
    return data
}
 
export default candaanApi;