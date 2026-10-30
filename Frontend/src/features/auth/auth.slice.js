import { createSlice } from "@reduxjs/toolkit";



const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        loading:false,
        err:null,
    },
    reducers:{
        setUser : (state,action) => {
          state.user = action.payload
        },
        setLoading : (state,action)=>{
            state.loading = action.payload
        },
        setErr : (state,action) => {
            state.err = action.payload
        }
    }
})


export const  {setUser,setLoading,setErr} = authSlice
export default authSlice.reducer