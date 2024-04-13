import React ,{useEffect,useRef,useState} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate ,useParams } from 'react-router-dom';
import { Box ,Button ,InputLabel,TextField,Typography} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {fetchPatientDoctors} from "../redux/reducers/patient";
import defaultImage from "../assets/default.png";
import domain from '../config/domain'; 
import Api from '../config/api';
import { notifySuccess } from '../components/Notify';


const PatientDetails=() =>{
  const {id}=useParams();
  const nevigate=useNavigate();
 const patients=useSelector((state)=> state.patient.data);
  const dispatch=useDispatch();
  const patientData=patients.find((ele)=>ele._id == id)
  console.log(patientData)
  const [inputs,setInputs] =useState  ({
    firstName:"",
    LastName:"",
    email:"",
    image:null
  });
  const [image,setImage]=useState(null)
  // console.log(patients)
  useEffect(()=>{
    dispatch(fetchPatientDoctors())
    setInputs(patientData)
   },[id]);
  //get Patient Details

  const getPatientDetail =async()=>{

  };

  //input change 
  const handleChange =(e)=>{
    setInputs((prevState)=>({
      ...prevState
      [e.target.name]=e.target.value

    }));
  };

  //form 
  const handleSubmit=async(e)=>{
    e.preventDefault();
    await Api.patch("/patient",{...inputs,image:image || inputs.image },{
      headers:{
        "Content-Type":"multipart/form-data"
      }
    })
    .then(()=>{
        notifySuccess("Patient Update !!")
    })
  }
  
  const fileUpload =(e)=>{
    let image=e.target.files[0]
    setImage(image)
    // console.log()
}
const imageRef=useRef()
const uploadImage=()=>{
  imageRef.current.click()
}
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
                  Update Patient  
              </Typography>
              <InputLabel sx={{mb:1 ,mt:2,fontSize:"24px",fontWeight:"bold"}}>
                FirstName
              </InputLabel>
              <TextField
                name="firstName"
                value={inputs?.firstName}
                onChange={handleChange}
                margin='normal'
                variant='outlined'
                required
              ></TextField>

              <InputLabel sx={{mb:1 ,mt:2,fontSize:"24px",fontWeight:"bold"}}>
                LastName
              </InputLabel>
              <TextField
          name="LastName"
          value={inputs?.LastName}
          onChange={handleChange}
          margin='normal'
          variant='outlined'
          required
          >
         </TextField>
         <InputLabel sx={{mb:1,mt:2,fontSize:"24px" ,fontWeight:"bold"}}>Email</InputLabel>

         <TextField
                name='email'
                value={inputs?.email}
                onChange={handleChange}
                variant='outlined'
                margin='normal'
                type={"email"}
                required
            ></TextField>
             <InputLabel sx={{mb:1,mt:2,fontSize:"24px" ,fontWeight:"bold"}}>Image Url</InputLabel>
             <img alt='Image' src={(image && URL.createObjectURL(image)) || domain+inputs?.image || defaultImage}/>
             <input
                type='file'
                name='image'
               style={{display:"none"}}
                onChange={fileUpload}
                variant='outlined'
                margin='normal'
                required
                ref={imageRef}
            ></input>
             <Button type='button' color="primary" variant='contained' sx={{marginBottom:2}} onClick={uploadImage}>Upload Image</Button>

        
            <Button type="submit" color="warning" variant="contained">UPDATE</Button>
              </Box>
        </form>
     </>
  )
}

export default PatientDetails;