let api_uri= process.env.VUE_APP_API_ROOTER
import axios from 'axios'

export default async function update(path, data){
    try {
        await axios.put(`${api_uri}/${path}`, data)
                   .then((response)=> {return response.status})
                   .catch((er)=>{return er.response.status})
    } catch (error) {
        console.log(error)
    }
}