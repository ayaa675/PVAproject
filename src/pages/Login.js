import React ,{useState ,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box  ,Typography ,TextField ,Button} from '@mui/material';
import axios from 'axios';
import {  useDispatch, useSelector} from "react-redux";
import {notifyError ,notifySuccess} from "./../components/Notify"
import Api from "../config/api.js"
import {login} from "../redux/reducers/doctors.js"
import {fetchDoctorData} from "../redux/reducers/doctors.js"
///
 

import logo from '../images/logo.svg'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../vendors/feather/feather.css'
import '../vendors/ti-icons/css/themify-icons.css'
import '../vendors/css/vendor.bundle.base.css'
import '../css/style.css'

//
const Login=()=>{
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [loading,setLoading]=useState(false)
  // const user=useSelector((state)=>state.doctors.data)
  const user=useSelector((state)=>state.doctors.isLogin)
  console.log(user)
  useEffect(()=>{
    dispatch(fetchDoctorData())
  },[])
  //state
  const [inputs,setInputs] =useState ({
    email:"",
    password:"",
    });
    //handle Inputs Change :
    const handleChange =(e)=>{
      setInputs((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value
      }));
    };
     //form handle 
    //  const handleSubmit=async (e)=>{
    //   setLoading(true)
    //   e.preventDefault();
    //   try {
    //      console.log(inputs)
        
    //     Api.post("/auth/login",inputs)
    //     .then(()=>{
    //       notifySuccess("Login Successful!!!!!!")
    //       // navigate("/")
    //       setLoading(false)
    //       dispatch(fetchDoctorData())
    //     })
    //     .catch((error)=>{
    //       const errMeg = error?.response?.data?.message || error?.response?.data?.error
    //       notifyError(errMeg)
    //       setLoading(false)

    //     })
        

    //   }
    //   catch(error){
    //       console.log(error)
    //   }
    // }

    const handleSubmit = async (e) => {
      setLoading(true);
      e.preventDefault();
      try {
        const response = await Api.post("/auth/login", inputs);
        notifySuccess("Login Successful!!!!!!");
        setLoading(false);
        navigate("/")
        // Dispatch the login action here
        dispatch(login()); // This will update the isLogin state to true
        dispatch(fetchDoctorData()); // Fetch doctor data after login
        // Optionally, you might want to navigate to another page after successful login
        // navigate("/");
      } catch (error) {
        const errMeg = error?.response?.data?.message || error?.response?.data?.error;
        notifyError(errMeg);
        setLoading(false);
      }
    };
  return(
        <>
          {/* <form onSubmit={handleSubmit}>
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
                borderRadius={5}>
               <Typography
                variant='h4'
                sx={{textTransform:"uppercase"}}
                padding={3}
                textAlign="center"
            > Login </Typography>
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
            <Button onClick={()=>{navigate("/register")}}
             sx={{borderRadius:3,marginTop :3}}
             disabled={loading}>
              Not A User ? Please Register
            </Button>
            </Box>

          </form> */}

    <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-center auth px-0">
        <div class="row w-100 mx-0">
          <div class="col-lg-4 mx-auto">
            <div class="auth-form-light text-left py-5 px-4 px-sm-5">
              <div class="brand-logo">
 
                <img src={logo} alt="logo"/>
              </div>
              <h4>Hello! let's get started</h4>
              <h6 class="font-weight-light">Sign in to continue.</h6>
              <form class="pt-3" onSubmit={handleSubmit}>
                <div class="form-group">
                  <input
                     type={"email"} 
                     class="form-control form-control-lg" 
                     id="exampleInputEmail1" 
                     placeholder='Email'
                     value={inputs.email}
                     onChange={handleChange}
                     name='email'
                     required
                     />
                </div>
                <div class="form-group">
                  <input
                      class="form-control form-control-lg" 
                      id="exampleInputPassword1" 
                      placeholder="Password"
                      value={inputs.password}
                      onChange={handleChange}
                      name='password'
                      margin='normal'
                      type={"password"}
                    required/>
                </div>
                <div class="mt-3">
                  {/* <Link class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" href="../index.html">SIGN IN</Link> */}
                  <Button
                  class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn btnSubmit"
                    type='submit'
                    variant='contained'
                    color='primary'>SIGN IN </Button>
                </div>
                <div class="my-2 d-flex justify-content-between align-items-center">
                  <div class="form-check">
                    <label class="form-check-label text-muted">
                      <input type="checkbox" class="form-check-input"/>
                      Keep me signed in
                    </label>
                  </div>
                  <a href="#" class="auth-link text-black">Forgot password?</a>
                </div>
                <div class="mb-2">
                  <button type="button" class="btn btn-block btn-facebook auth-form-btn">
                    <i class="ti-facebook mr-2"></i>Connect using facebook
                  </button>
                </div>
                <div class="text-center mt-4 font-weight-light But-Res" >
                  {/* Don't have an account? <a href="register.html" class="text-primary">Create</a> */}

                  <Button onClick={()=>{navigate("/register")}}
                   disabled={loading}>
                   <p>Don't have an account?<span>Create</span>  </p>
                 </Button>
                </div>
 

              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- content-wrapper ends --> */}
    </div>
    {/* <!-- page-body-wrapper ends --> */}
  </div>
        

 
        </>
  )
}

export default Login;