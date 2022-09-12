import axios from "axios";

const updateData = async (id,dataUbah,token) => {
    const {data} = await axios.put(`/api/orang/${id}`,dataUbah,{
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    })
    return data.msg
}
 
export default updateData;