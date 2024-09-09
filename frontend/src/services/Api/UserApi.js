import { axiosClient } from "@/api/axios";

export const UserApi = {
    login : async(email, password)=> {
        return await axiosClient.post('/login', {email, password})
    },
    logout : async()=>{
        return await axiosClient.post('/logout')
    },
    getUser : async()=>{
        return await axiosClient.get('/api/user')
    },
    register : async(payload)=>{
        return await axiosClient.post('/register',payload)
    },
}
