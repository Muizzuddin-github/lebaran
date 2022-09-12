import axios from 'axios'

export const authRegister = async (data) => {
    const hasil = await axios.post('/api/auth/register',data)
    return hasil
}

export const authLogin = async (data) => {
    const hasil =  await axios.post('/api/auth/login',data)
    return hasil
}