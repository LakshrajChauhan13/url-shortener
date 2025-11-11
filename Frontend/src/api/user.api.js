
import { axiosInstance } from '../utils/axiosInstance';

export async function signUpUser(name , email , password){
    const response = await axiosInstance.post('/api/auth/signup', { name , email , password})
    console.log(response);
    
    return {
        message : response.data.message ,

    }
}


export async function signInUser(email , password){
    const response = await axiosInstance.post('/api/auth/signin', {
        email , password
    } , {
        withCredentials : true
    })
    console.log(response);
    
    return response
}