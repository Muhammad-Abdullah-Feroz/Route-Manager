import axios from "axios";
import React, { useState } from "react";
import { messageToast, messageToastError } from "../handlers/messageToast";
import Bttn from "./Bttn";

const Modal = ({ requestData,apikey,displayBtnText,ActionBtnText,title, children,action,reFetchData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [loading, setLoading] = useState(false);
  const actionBtnMethod = async() => {
      console.log("Action Button Clicked");
      console.log(requestData,apikey);
      try {
        const response=await axios.post(apikey,requestData);
        console.log(response.data);
        
        if(response.data.success){
          messageToast(`Success,${response.data.msg}`);
          reFetchData();
        }else{
            messageToastError(`Error,${response.data.msg}`);
            }
      } catch (error) {
        console.log(error);
        
        messageToastError("Error,Please try again");
      }finally{
setTimeout(() => {
    setIsOpen(false);
}, 4000);
      }
  }

  return (
    <>
      <button
        onClick={openModal}
        className={`text-white px-4 py-2 rounded ${action== 'delete'?'bg-red-600 hover:bg-red-500':'bg-yellow-500 hover:bg-yellow-400'} transition duration-300`}
      >
        {displayBtnText}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3
                        className="text-base font-semibold text-gray-900"
                        id="modal-title"
                      >
                        {title}
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {children}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <Bttn
                    type="button"
                    onClick={actionBtnMethod}
                    isLoading={loading}
                    className={`inline-flex w-full justify-center rounded-md ${action== 'delete'?'bg-red-600 hover:bg-red-500':'bg-yellow-500 hover:bg-yellow-400'} transition duration-300 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto`}
                    children={ActionBtnText}
                  />
                 
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
