import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import notify from "../assets/notify.mp3";
import notify_alert from "../assets/alert-notify.mp3";
const playSound = (sound) => {
  const audio = new Audio(sound);
  audio.play();
};

const messageToast = (message) => {
  toast.success(message, {
    pauseOnFocusLoss: false,
    position: "bottom-right",
    // theme:"colored",
    autoClose: 2000,
    closeOnClick: true,
    draggable:true
  });
  playSound(notify);
};
const messageToastError = (message) => {
  toast.error(message, {
    pauseOnFocusLoss: false,
    position: "bottom-right",  
      autoClose: 2000,
    closeOnClick: true,
  });
  // playSound(notify_alert);
};

export { messageToast, messageToastError };
