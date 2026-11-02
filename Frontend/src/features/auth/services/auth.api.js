import axios from "axios";


const api = axios.create({
    baseURL:"http://localhost:8080/api/auth",
    withCredentials:true
})



export  async function  Login({email,password}){
      const response = await api.post("/login",{email,password})
      return response.data
}

export async function register({username,email,password}){
  const response = await api.post("/register",{username,email,password})
  return response.data
}


export async function getMe(){
    const response = await api.get('/get-me')
    return response.data
}