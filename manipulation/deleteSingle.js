import axios from "axios";

const deleteSingle = async (id,token) => {
    const {data} = await axios.delete(`/api/orang/${id}`,{
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    })
    return data.msg
}
 
export default deleteSingle;