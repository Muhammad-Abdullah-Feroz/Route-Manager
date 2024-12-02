import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import notify from '../assets/notify.mp3';
import notify_alert from '../assets/alert-notify.mp3';
const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.play();
  }


const messageToast = (message) => { 
    toast.success(message,{
        position:"bottom-right",
        // theme:"colored",
        autoClose:4000
    });
    playSound(notify);
}
const messageToastError=(message)=>{
    toast.error(message,{
        position:"bottom-right"
    });
    playSound(notify_alert);
}

export {messageToast,messageToastError};