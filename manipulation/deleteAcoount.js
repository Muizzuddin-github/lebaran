import axios from "axios";

const deleteAccount = async (token) => {
    const hasil = await axios.delete('/api/account',{
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    })
    return hasil
}
 
export default deleteAccount;