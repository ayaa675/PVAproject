import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit'
import {notifyError } from "../../components/Notify.js"
import Api from "../../config/api.js"
  
export const fetchPatientDoctors=createAsyncThunk(
   "patient/fetchPatientDoctors",
   async (_,thunkApi)=>{
      try{
          let response=await Api.get("/patient")
          return response.data
      }
      catch(error){
        let errMeg = error?.response?.data?.message || error?.response?.data?.error
        notifyError(errMeg)
        return thunkApi.rejectWithValue(errMeg)
      }
   }
)
export const fetchAdminePatient=createAsyncThunk(
  "patient/fetchAdminePatient",
  async (_,thunkApi)=>{
     try{
         let response=await Api.get("/patient/allPatient")
         return response.data
     }
     catch(error){
       let errMeg = error?.response?.data?.message || error?.response?.data?.error
       notifyError(errMeg)
       return thunkApi.rejectWithValue(errMeg)
     }
  }
)

 

export const  patient= createSlice({
  name: 'patient',
  initialState:{
        data:[],
        allData:[]
       
  },
  reducers: {
    
     
  },
  extraReducers:(builder)=>{
      builder.addCase(fetchPatientDoctors.fulfilled,(state,action)=>{
         state.data=action.payload
       })
       builder.addCase(fetchAdminePatient.fulfilled,(state,action)=>{
        state.allData=action.payload
      })
       
  }
})

 export const {} = patient.actions

export default patient.reducer