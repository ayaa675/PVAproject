import { configureStore } from '@reduxjs/toolkit'
import doctors from './reducers/doctors'
// import patients from './reducers/patients'
import patient from './reducers/patient'
export const Store = configureStore({
    reducer: {
        doctors,
        patient
    },
})
 
// export default Store;
 