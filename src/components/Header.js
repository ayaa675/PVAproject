import React ,{useEffect, useState} from "react";
import { useNavigate ,Link } from "react-router-dom";

import { 
    Box  ,
    AppBar,
    Toolbar ,
    Button ,
    Typography ,
    Tabs ,
     Tab 
} 
from '@mui/material';
import { useDispatch, useSelector} from "react-redux";
import toast from "react-hot-toast";
import {fetchDoctorData , DoctorLogout } from "../redux/reducers/doctors.js"
 
const Header =() =>{
  const dispatch=useDispatch();
  const navigate =useNavigate();
  const [value,setValue]=useState();
  const isLogin=useSelector((state)=>state.doctors.isLogin)
  const doctors=useSelector((state)=>state.doctors.data)
  useEffect(()=>{
    dispatch(fetchDoctorData())
  },[])
  return(
    <>
        <AppBar position="sticky">
           <Toolbar>
             <Link to="/"  style={{textDecoration:"none" ,color:"#fff"}}><Typography variant="h4">PVA</Typography></Link>
             <Box display={"flex"} marginLeft={"auto"} marginRight={"auto"}>
                  <Tabs textColor="inherit" value={value} onChange={(e,val)=>setValue(val)}>

                    {
                      isLogin && doctors?.isAdime  &&  <Tab label="Patients" LinkComponent={Link} to="/patients"></Tab>
                    }
                   

                    {
                      isLogin&&
                      <>
                        <Tab label="DoctorsPatient" LinkComponent={Link} to="/my-patient"></Tab>
                        <Tab label="CreatePatients" LinkComponent={Link} to="/create-patient"></Tab>

                      </>
                    }
                   
                  </Tabs>
             </Box>

             <Box display={"flex"} marginLeft={"auto"}>
              {!isLogin && 
                <>
                    <Button sx={{margin:1 ,color:"white"}} LinkComponent={Link}  to="/login">Login</Button>
                   <Button sx={{margin:1 ,color:"white"}} LinkComponent={Link}  to="/register">Register</Button>
                </>
              }
               {
                   isLogin && <Button sx={{margin:1 ,color:"white"}} onClick={()=>dispatch(DoctorLogout())} LinkComponent={Link}  to="/login" >LogOut</Button>
  
               }    
                   

             </Box>
           </Toolbar>
        </AppBar>
    </>
  )
}
export default Header;
