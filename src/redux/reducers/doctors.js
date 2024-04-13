import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit'
import {notifyError } from "../../components/Notify.js"
import Api from "../../config/api.js"
  
export const fetchDoctorData=createAsyncThunk(
   "doctors/fetchDoctorData",
   async (_,thunkApi)=>{
      try{
          let response=await Api.get("/user")
          return response.data
      }
      catch(error){
        let errMeg = error?.response?.data?.message || error?.response?.data?.error
        notifyError(errMeg)
        return thunkApi.rejectWithValue(errMeg)
      }
   }
)

export const DoctorLogout=createAsyncThunk(
  "doctors/logout",
  async (_,thunkApi)=>{
     try{
         let response=await Api.post("/user/logout")
         return response.data
     }
     catch(error){
       let errMeg = error?.response?.data?.message || error?.response?.data?.error
       notifyError(errMeg)
       return thunkApi.rejectWithValue(errMeg)
     }
  }
)

export const doctors = createSlice({
  name: 'doctors',
  initialState:{
        data:{},
        isLogin:false,
  },
  reducers: {
    login: (state) => {
      state.isLogin = true 
    },
    logout:(state)=>{
        state.isLogin=false
    },
     
  },
  extraReducers:(builder)=>{
      builder.addCase(fetchDoctorData.fulfilled,(state,action)=>{
         state.data=action.payload
         state.isLogin=true
      })
      // DoctorLogout
      builder.addCase(DoctorLogout.fulfilled,(state,action)=>{
         state.isLogin=false
     })
  }
})

 export const {login ,logout } = doctors.actions

export default doctors.reducer