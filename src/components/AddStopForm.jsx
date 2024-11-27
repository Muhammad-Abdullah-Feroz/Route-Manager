import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MapSection from "./MapSection";

const AddStopForm = () => {
  
  const navigate = useNavigate();
  const [suggestionData, setSuggestionData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [directions, setDirections] = useState({
    name:"Uet Ksk Campus",
    latitude:31.693515,
    longitude:74.246157
});
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);


  const handleSubmit = () => {
    // Submit the data to API or perform other actions (e.g., adding a new route)
    console.log(" Data:", directions);
    navigate("/admin");
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

  const getlangAndlat=(e)=>{
    const ID=e.target.id;
    setSuggestionData(null);
    setSearchQuery("");
    fetch(`${import.meta.env.VITE_MAP_PLACE_DIRECTION_URL+ID}&key=${import.meta.env.VITE_MAP_API_KEY}`).then((response) => response.json()).then((data) => {
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
      <div className="bg-white rounded-lg shadow-md p-6 m-auto w-5/6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Add New Stop</h2>
        <form onSubmit={handleSubmit}>
     
          <label className="block text-lg font-semibold mb-2">
            Enter Stop Name :
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
                 <div key={index} id={suggestion.place_id || suggestion.reference} onClick={(e)=>getlangAndlat(e)} className="p-2 border border-gray-200 hover:bg-blue-200 hover:border-blue-400 cursor-pointer">
                    <FaMapMarkerAlt className="inline-block text-blue-500 mx-2" />
                {suggestion.description}
              </div>
            ))}
            </div>
          </div>
          <MapSection  latitude={directions.latitude} longitude={directions.longitude} label={directions.name}/>
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Add Stop
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStopForm;
