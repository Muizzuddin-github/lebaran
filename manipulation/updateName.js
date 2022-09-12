import axios from "axios";

const updateName = async (token,data) => {
    const hasil = await axios.post('/api/account',data,{
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    })

    return hasil
}
 
export default updateName;