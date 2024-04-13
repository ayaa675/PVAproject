// import React ,{useEffect,useState} from 'react';
// import axios from 'axios';
// import PatientCard from "../components/PatientCard"
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAdminePatient } from '../redux/reducers/patient';
// import domain from '../config/domain';
 
// const Patients=() =>{
//    const dispatch=useDispatch()
//   const patient=useSelector((state)=>state.patient.allData)
//   console.log(patient)
//   //get patient
//   useEffect(()=>{
//       dispatch(fetchAdminePatient())
//   },[])
//   return (
//     <div>
//         {patient &&
//             patient.map((patient)=>{
//               <PatientCard
//                 id={patient?._id}
//                 // key={patient?._id}
//                 firstName={patient?.firstName}
//                 LastName={patient?.LastName}
//                 email={patient?.email}  
//                 image={domain+patient?.image}
//                 username={patient?.owner?.firstName}
//                 // time={patient.createdAt}
//               >
//               </PatientCard>
//             })
//         }
//     </div>
//   )
// }

// export default Patients


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminePatient } from '../redux/reducers/patient';
import PatientCard from "../components/PatientCard"
import domain from '../config/domain';

const Patients = () => {
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.patient.allData);

  useEffect(() => {
    dispatch(fetchAdminePatient());
  }, [dispatch]);

  return (
    <div>
      {patient && patient.map((patient) => (
        <PatientCard
          key={patient?._id} // Make sure to add key prop to avoid react warnings
          id={patient?._id}
          firstName={patient?.firstName}
          LastName={patient?.LastName}
          email={patient?.email}
          image={domain + patient?.image}
          username={patient?.owner?.firstName}
          // time={patient.createdAt}
        />
      ))}
    </div>
  );
}

export default Patients;
