import axios from "axios";

const motivation = async (token) => {
    const {data} = await axios.get('/api/motivation',{
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    })
    return data
}
 
export default motivation;