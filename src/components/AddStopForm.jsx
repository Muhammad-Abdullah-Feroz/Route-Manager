import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import MapSection  from "./MapSection";
import Bttn from "./Bttn";
import { messageToast, messageToastError } from "../handlers/messageToast";
import axios from "axios";

const AddStopForm = ({setIsFormPageState,FormPageState,stopDetails={name:'Uet Ksk Campus',latitude:31.693515,longitude:74.246157},isAddNew=true}) => {
  
  const [suggestionData, setSuggestionData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [directions, setDirections] = useState(stopDetails);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);


  const handleSubmit =async () => {
    setIsBtnLoading(true);
    // name, latitude,longitude
    const MakeData={
      name:directions.name,
      latitude:directions.latitude,
      longitude:directions.longitude
    }
    if(!isAddNew){
      if(!stopDetails._id){
        messageToastError("Something went wrong , contanct with admin");
        setIsBtnLoading(false);
        return;
      }
      MakeData['stop_id']=stopDetails._id;
    }
    console.log("Submitting the form data",MakeData);
    try {
      const response= await axios.post(`${import.meta.env.VITE_LOCAL_BACKEND_URL}/api/admin/stop${!isAddNew?'/update-stop':'/add-stop'}`,MakeData);
      if(response.data.success){
        messageToast(response.data.msg);
        setTimeout(() => {
          setIsBtnLoading(false);
          setIsFormPageState(FormPageState.INACTIVE);
        }, 4000);
      }else{
        messageToastError(response.data.msg);
        setIsBtnLoading(false);
      }
      console.log(response);
      
    } catch (error) {
      console.log(error);
      
      messageToastError(error?.response?.data?.msg || 'Something went wrong');
      setIsBtnLoading(false);
    }

    
  };
  const ChangeSearchfield =async(e) => {
    setSearchQuery(e.target.value);
    setIsLoadingSuggestions(true);
    try {
        const query=e.target.value;
        // Call the API to get suggestions based on the query
       fetch(`${import.meta.env.VITE_MAP_URL+query}&key=${import.meta.env.VITE_MAP_API_KEY}`).then((response) => response.json()).then((data) => {
            setSuggestionData(data.predictions);
            console.log(data);
        }).catch((error) => {
            console.error("Error:", error);
        });
    } catch (error) {
        
    }finally{
        setTimeout(() => {
            setIsLoadingSuggestions(false);
    },1500)
    }
  };

  const getlangAndlat=async(ID)=>{
    // const ID=e.target.id;
    console.log("i ma here ",ID);
    
    setSuggestionData(null);
    setSearchQuery("");
    await fetch(`${import.meta.env.VITE_MAP_PLACE_DIRECTION_URL+ID}&key=${import.meta.env.VITE_MAP_API_KEY}`).then((response) => response.json()).then((data) => {
        if(data.status==="OK"){
            setDirections({
                name:data.result.name,
                latitude:data.result.geometry.location.lat,
                longitude:data.result.geometry.location.lng
            });
        }
        console.log(directions);
    }).catch((error) => {
        console.error("Error:", error);
    });
    // console.log(e.target.id);
    
  }

  
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6 m-auto xl:w-5/6 w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">{isAddNew?'Add New Stop':'Edit Stop'}</h2>
        <section>
     
          <label className="block   m-1">
            Search Stop :
          </label>

          <div className="mb-4 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e)=>ChangeSearchfield(e)}
              className={`w-full px-4 py-2 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500`}
              placeholder="Search Stop here for map"
            />
            {isLoadingSuggestions && (
              <div className="dot_pulse absolute right-8 top-1/2 transform -translate-y-1/2"></div>
            )}
            <div className="absolute z-20 bg-white w-full  mt-2">

             {suggestionData && suggestionData.length>0 && suggestionData.map((suggestion, index) => (
                 <div key={index} id={suggestion.place_id || suggestion.reference} onClick={()=>getlangAndlat(suggestion.place_id)} className="p-2 border flex items-center gap-3  border-gray-200 hover:bg-blue-200 hover:border-blue-400 cursor-pointer">
                    <FaMapMarkerAlt className="inline-block text-blue-500" />
                <div>{suggestion.description}</div>
              </div>
            ))}
            </div>
          </div>
          <MapSection  latitude={directions.latitude} longitude={directions.longitude} label={directions.name}/>
          <div className="flex gap-4 justify-between items-center">
            <button type="button" className={`mt-4 bg-gray-300 hover:bg-gray-200 text-slate-700 py-2 px-6 rounded-lg  transition duration-300`}
            onClick={()=>setIsFormPageState(FormPageState.INACTIVE)}
           >back</button>
          <Bttn
          type={'submit'}
          children= {isAddNew? 'Add Stop':'Edit Stop'}
          onClick={handleSubmit}
          isLoading={isBtnLoading}
          
          />
          {/* <button
            className={`mt-4  ${isAddNew? 'bg-blue-600 hover:bg-blue-700':'bg-yellow-400 hover:bg-yellow-500'} text-white font-semibold py-2 px-6 rounded-lg transition duration-300`}
            >
           
          </button> */}
            </div>
        </section>
      </div>
    </div>
  );
};

export default AddStopForm;
