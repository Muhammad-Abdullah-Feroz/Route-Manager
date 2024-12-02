import { toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';


const messageToast = (message) => { 
    toast.info(message,{
        position:"bottom-right"
    });
}
const messageToastError=(message)=>{
    toast.error(message,{
        position:"bottom-right"
    });
}

export {messageToast};