import { axiosInstance } from "../utils/axiosInstance";


export async function deleteUrl(id){
    const response = await axiosInstance.delete(`api/user/delete-urls/${id}`)
    return response.data
}