import axios from 'axios';
import { axiosInstance } from '../utils/axiosInstance';

export async function createShortUrlApi(url){
    const response = await axiosInstance.post('/api/create', {url})
    console.log(response);
    
    return {
        shortUrl : response.data.shortUrl ,
        status : response.status ,
    }
}

// export async function createCustomUrlApi(url){
//     const response = await axiosInstance.post('/api/create/user/custom-url', {url , customUrl : "demoo"})
//     console.log(response);
    
//     return {
//         shortUrl : response.data.shortUrl ,
//         status : response.status ,
//     }
// }

