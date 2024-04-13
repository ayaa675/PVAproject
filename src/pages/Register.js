import React ,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Box  ,Typography ,TextField ,Button} from '@mui/material';
import toast from 'react-hot-toast';
import axios from 'axios';
import {notifyError ,notifySuccess} from "./../components/Notify"
import Api from "../config/api.js"
const Register=() =>{
    const navigate=useNavigate();
    //state 
    const [loading,setLoading]=useState(false)
    const [inputs,setInputs] =useState ({
      firstName:"",
      LastName:"",
      email:"",
      password:"",
      // Repassword:""
    });
    //handle input change 
    const handleChange =(e)=>{
      setInputs((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value
      }));
    };
    //form handle 
    const handleSubmit=async (e)=>{
      setLoading(true)
      e.preventDefault();
      try {
         console.log(inputs)
        
        Api.post("/auth/singup",inputs)
        .then(()=>{
          notifySuccess("Account Created !!!!!!")
          navigate("/login")
          setLoading(false)
        })
        .catch((error)=>{
          const errMeg = error?.response?.data?.message || error?.response?.data?.error
          notifyError(errMeg)
          setLoading(false)

        })
        

      }
      catch(error){
          console.log(error)
      }
    }
  return (
    <>
        <form onSubmit={handleSubmit}>
          <Box 
            maxWidth={450}
            display="flex"
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            margin="auto"
            marginTop={5}
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            borderRadius={5}
          >
            <Typography
                variant='h4'
                sx={{textTransform:"uppercase"}}
                padding={3}
                textAlign="center"
            > Register </Typography>
            <TextField
                placeholder='firstName'
                value={inputs.firstName}
                onChange={handleChange}
                name='firstName'
                margin='normal'
                type={"text"}
                required
            ></TextField>
             <TextField
                placeholder='LastName'
                value={inputs.LastName}
                onChange={handleChange}
                name='LastName'
                margin='normal'
                type={"text"}
                required
            ></TextField>
             <TextField
                placeholder='email'
                value={inputs.email}
                onChange={handleChange}
                name='email'
                margin='normal'
                type={"text"}
                required
            ></TextField>
             <TextField
                placeholder='password'
                value={inputs.password}
                onChange={handleChange}
                name='password'
                margin='normal'
                type={"password"}
                required
            ></TextField>
              
            <Button
              type='submit'
              sx={{borderRadius:3,marginTop :3}}
              variant='contained'
              color='primary'
            >
              submit
            </Button>
            <Button onClick={()=>{navigate("/login")}}
             sx={{borderRadius:3,marginTop :3}}
             disabled={loading}>
              Already register ? Please Login
            </Button>
          </Box>

        </form>
    </>
    )
}
export default Register