import axios from 'axios'

const forgotPassword = async (data) => {

    const hasil = axios.post('/api/password/forgot',data)
    return hasil

}
 
export default forgotPassword;