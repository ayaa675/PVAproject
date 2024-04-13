import './App.css';
import Header from "./components/Header";
import { Routes,Route } from 'react-router-dom';
import Patients from "./pages/Patients";
import Login  from "./pages/Login";
import { ToastContainer } from 'react-toastify';
import DoctorsPatient from './pages/DoctorsPatient';
import PatientDetails from './pages/PatientDetails';
import CreatePatients from './pages/CreatePatients';
import Showpatient from './pages/Showpatient'
import Register from './pages/Register';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {fetchDoctorData  } from "./redux/reducers/doctors"
function App() {
    const isLogin=useSelector((state)=>state.doctors.isLogin)
    const user=useSelector((state)=>state.doctors.data)
    const dispatch=useDispatch();

    useEffect(()=>{
      dispatch(fetchDoctorData())
    },[])
  return (
     <>

      <Header/>
      <ToastContainer/>
      <Routes>
          <Route path='/' element={<Patients/>}/>
          { isLogin && user.isAdime && <Route path='/patients' element={<Patients/>}/>}
          { isLogin && <Route path='/my-patient' element={<DoctorsPatient/>}/>}
          {   isLogin && <Route path='/patient-details/:id' element={<PatientDetails/>}/>}
           {isLogin && <Route path='/create-patient' element={<CreatePatients/>}/>}
           <Route path='/showpatient' element={<Showpatient/>}></Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='*' element={<Patients/>}/>

      </Routes>
     </>
  );
}

export default App;
