import axios from "axios";

const search = async (src,token) => {
    const {data} = await axios.get(`/api/orang/cari?src=${src}`,{
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    })
    return data
}
 
export default search;