import axios from "axios"

const getSingle = async (id,token) => {
    const {data} = await axios.get(`/api/orang/${id}`,{
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    })
    return data.data
}
 
export default getSingle;