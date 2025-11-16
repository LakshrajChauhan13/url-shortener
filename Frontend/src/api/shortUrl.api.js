import axios from 'axios';
import { axiosInstance } from '../utils/axiosInstance';
import { useSelector } from 'react-redux';

export async function createShortUrlApi(url , isAuthenticated , customUrl){

    const endPoint = isAuthenticated ? "/api/create/user" : "/api/create"
    
    const response = await axiosInstance.post(endPoint, {url , customUrl} , {
        withCredentials : isAuthenticated
    })
    console.log(response);
    
    return {
        shortUrl : response.data.shortUrl ,
        status : response.status ,
    }
}

