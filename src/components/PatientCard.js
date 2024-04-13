import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader  from "@mui/material/CardHeader";
import CardMedia  from "@mui/material/CardMedia";
import CardContent  from "@mui/material/CardContent";
import Avatar  from "@mui/material/Avatar";
import Typography  from "@mui/material/Typography";
import {red} from '@mui/material/colors';
import ModeEditIcon from "@mui/icons-material/ModeEdit"
// import DeleteIcon from "@mui/icons-material/Delete";
import { Box ,IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Api } from "@mui/icons-material";
import { notifyError, notifySuccess } from "./Notify";
import { useDispatch } from "react-redux";
import { fetchPatientDoctors } from "../redux/reducers/patient";
import DeleteIcon from '@mui/icons-material/Delete';

// export default function PatientCard ({
//     id,
//     firstName,
//     LastName,
//     email,
//     image,
//     username,
//     time,
   
//     isUser
// }) {
//     const navigate=useNavigate();
//     const handleEdit=()=>{
//         navigate(`//my-patient/${id}`)
//     };
//     const handleDelete=async () =>{
//         try {
//             const {data}=await axios.delete(`/api/patient/${id}`)
//             if(data?.success){
//                 alert("Patient Delete ")
//                 window.location.reload();
//             }
//         }catch(error){
//             console.log(error)
//         }
//     };
//     return(
//         <Card>
//             sx={{
//                 width:"40%",
//                 margin:"auto",
//                 mt:2,
//                 padding:2,
//                 boxShadow:"5px 5px 10px #ccc",
//                 ":hover:":{
//                     boxShadow:"10px 10px 20px #ccc",
//                 }
//             }}
//         {isUser && (
//             <Box display={"flex"}>
//                 <IconButton onClick={handleEdit} sx={{marginLeft:"auto"}}>
//                     <ModeEditIcon colot="info"/>
//                 </IconButton>
//                 <IconButton onClick={handleDelete}>
//                     <DeleteIcon colot="error"/>
//                 </IconButton>
//             </Box>
//         )}
//         <CardHeader
//             avatar={
//                 <Avatar sx={{bgcolor:red[500]}} aria-label="recipe">{username}</Avatar>
//             }
//             title={username}
//             subheader={time}
//         />
//         <CardMedia component="img" height="194" image={image} alt="paella dish"/>
//         <CardContent>
//             <Typography variant="h6" color="text.secondary">FirstName : {firstName}</Typography>
//             <Typography variant="h6" color="text.secondary">LastName : {LastName}</Typography>
//             <Typography variant="h6" color="text.secondary">Email : {email}</Typography>
//             {/* <Typography variant="h6" color="text.secondary">LastName : {LastName}</Typography> */}
//         </CardContent>
//         </Card>
//     )
// }

export default function PatientCard({
    id,
    firstName,
    LastName,
    email,
    image,
    username,
    time,
    isUser,
  }) {
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const handleEdit = () => {
      navigate(`/patient-details/${id}`);
    };
  
 
  const handleDelete = async () => {
    console.log("running");
    try {
        await axios.delete(`http://localhost:5000/api/patient/${id}`);
        // await Api.delete(`/patient/${id}`)
        notifySuccess("Patient Deleted");
        dispatch(fetchPatientDoctors());
    } catch (error) {
        const errMeg = error?.response?.data?.message || error?.response?.data?.error;
        notifyError(errMeg);
    }
};
  
    return (
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          "&:hover": { // Use "&:hover" instead of ":hover:"
            boxShadow: "10px 10px 20px #ccc", // Corrected indentation
          },
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditIcon color="info" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">{username}</Avatar>}
          title={username}
          subheader={time}
        />
        <CardMedia component="img" height="194" image={image} alt="paella dish" />
        <CardContent>
          <Typography variant="h6" color="text.secondary">FirstName : {firstName}</Typography>
          <Typography variant="h6" color="text.secondary">LastName : {LastName}</Typography>
          <Typography variant="h6" color="text.secondary">Email : {email}</Typography>
        </CardContent>
      </Card>
    );
  }
  
