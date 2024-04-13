import React ,{useState,useRef} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box , Button , InputLabel , TextField,Typography } from '@mui/material';
import toast from 'react-hot-toast';
import defaultImage from "../assets/default.png";
import Api from "../config/api";
import {notifyError ,notifySuccess} from "../components/Notify"
import {fetchPatientDoctors} from "../redux/reducers/patient"
import { useDispatch } from 'react-redux';
const CreatePatients=()=> {
  const id=localStorage.getItem("doctorId")
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const imageFile=useRef()
  const [inputs,setInputs] =useState  ({
    firstName:"",
    LastName:"",
    email:"",
    image:null
  });
  //input change 
  const handleChange = (e) =>{
    setInputs ((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value,
    }));
  };
  //form 
  const handleSubmit =async (e) =>{
    e.preventDefault();
    try {
          Api.post("/patient",inputs,{
            headers:{
              "Content-Type":"multipart/form-data"
            }
          })
          .then(()=>{
            notifySuccess("Patient Created !!!!!!!!!!!")
            dispatch(fetchPatientDoctors())
            setInputs({
              firstName:"",
              LastName:"",
              email:"",
              image:null
            })
          })
           
    }
    catch(error){
      const errMeg = error?.response?.data?.message || error?.response?.data?.error;
      notifyError(errMeg);
    
    }
  }
  // console.log(imageFile)
  const uploadImage=()=>{
    imageFile.current.click()
  }
  console.log(inputs)
  const fileUpload =(e)=>{
      let image=e.target.files[0]
      setInputs({...inputs,image})
      console.log()
  }
  console.log(inputs)
  return (
    <>
        <form onSubmit={handleSubmit}>
          <Box
           width={"50%"}
           border={3}
           borderRedius={10}
           margin="auto"
           boxShadow="10px 10px 20px #ccc"
           padding={3}
           display="flex"
           flexDirection={"column"}
           marginTop="30px"
          
           
          >

         <Typography
            variant='h4'
            fontWeight={"bold"}
            color={"gray"}
            padding={3}
            textAlign="center">
          Create New Patient
         </Typography>
         <InputLabel sx={{mb:1,mt:2,fontSize:"24px" ,fontWeight:"bold"}}>FirstName</InputLabel>
         <TextField
          name="firstName"
          value={inputs.firstName}
          onChange={handleChange}
          margin='normal'
          variant='outlined'
          required
          >
         </TextField>
         <InputLabel sx={{mb:1,mt:2,fontSize:"24px" ,fontWeight:"bold"}}>LastName</InputLabel>
         <TextField
          name="LastName"
          value={inputs.LastName}
          onChange={handleChange}
          margin='normal'
          variant='outlined'
          required
          >
         </TextField>
         <InputLabel sx={{mb:1,mt:2,fontSize:"24px" ,fontWeight:"bold"}}>Email</InputLabel>

         <TextField
                name='email'
                value={inputs.email}
                onChange={handleChange}
                variant='outlined'
                margin='normal'
                type={"email"}
                required
            ></TextField>

          <InputLabel sx={{mb:1,mt:2,fontSize:"24px" ,fontWeight:"bold"}}>Image URL</InputLabel>

          <input
                type='file'
                name='image'
                ref={imageFile}
                style={{display:"none"}}
                // value={inputs.image}
                onChange={fileUpload}
                variant='outlined'
                margin='normal'
                required
            ></input>
            <img alt='Image' src={(inputs.image && URL.createObjectURL(inputs.image)) || defaultImage}/>
              <Button type='button' color="warning" variant='contained' sx={{marginBottom:2}} onClick={uploadImage}>Upload Image</Button>
              <Button type='submit' color="primary" variant='contained'>SUBMIT</Button>
          </Box>

        </form> 
    </>
   )
}

export default CreatePatients
 