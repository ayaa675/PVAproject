import React ,{useEffect,useState} from 'react';
// import axios from 'axios';
import {  useDispatch, useSelector} from "react-redux";
import {fetchPatientDoctors} from "../redux/reducers/patient";
import PatientCard from "../components/PatientCard";
import domain from '../config/domain';

const DoctorsPatient=()=> {
  // const [patients,setPatient]=useState([])
  const dispatch=useDispatch()
  const patient=useSelector((state)=>state.patient.data)
 
  //getPatientDoctors
  useEffect(()=>{
    dispatch(fetchPatientDoctors())
  },[]);
 
  return (
    <div>
         {patient && patient.length?(
            patient.map((patient)=>(
                <PatientCard
                key={patient._id}
                id={patient._id}
                isUser={true}
                firstName={patient.firstName}
                LastName={patient.LastName}
                email={patient.email}  
                image={domain+patient.image}
                // time={patient.createdAt}
                />
            ))
         ):(<h1>You Havent Created a Patient</h1>)}
    </div>
  )
}

export default DoctorsPatient;
 