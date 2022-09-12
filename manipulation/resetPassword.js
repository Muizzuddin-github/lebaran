import axios from 'axios'

const resetPassword = async (data) => {
    const hasil = await axios.post('/api/password/reset',data)
    return hasil
}
 
export default resetPassword;