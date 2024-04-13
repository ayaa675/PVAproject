import {toast} from 'react-toastify'
// import "../../src/App.css"
export const notifySuccess=(msg)=>{
    toast.success(msg,{
        position:"top-right",
        autoClose:3000,
        hideProgressBar:false,
        closeOnClick:true,
        pauseOnHover:true,
        draggable:true,
        progress:undefined,
        //add adddition style customizatio
        className:"toast-success"
    });
}


export const notifyInfo=(msg)=>{
    toast.success(msg,{
        position:"top-right",
        autoClose:3000,
        hideProgressBar:false,
        closeOnClick:true,
        pauseOnHover:true,
        draggable:true,
        progress:undefined,
        //add adddition style customizatio
        className:"toast-info",
        
    });
}


export const notifyError=(msg)=>{
    toast.success(msg,{
        position:"top-right",
        autoClose:3000,
        hideProgressBar:false,
        closeOnClick:true,
        pauseOnHover:true,
        draggable:true,
        progress:undefined,
        //add adddition style customizatio
        className:"toast-error custom-toast",
    });
}