import { axiosInstance } from '../utils/axiosInstance';

export async function signUpUser(name , email , password){
    const response = await axiosInstance.post('/api/auth/signup', { name , email , password})
    console.log(response);
    
    return {
        message : response.data.message
    }
}


export async function signInUser(email , password){
    const response = await axiosInstance.post('/api/auth/signin', {
        email , password
    })
    return response
}


export async function getCurrentUser(){
    const response = await axiosInstance.get('/api/auth/me')
    return response.data.userSafe
}


export async function signOutUser(){
    const response = await axiosInstance.post('/api/auth/signout')  
    console.log(response);

    return response.data
}

export async function getUserUrlsApi(){
    const response = await axiosInstance.get('/api/user/get-urls')  
    console.log(response);

    return response.data
}
