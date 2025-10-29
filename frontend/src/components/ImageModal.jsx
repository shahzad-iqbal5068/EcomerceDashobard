import React, { useState } from "react";
import { X, Camera, Images } from "lucide-react";
import { useDispatch , useSelector} from 'react-redux'
import OpenCamera from "./OpenCamera";
import { setProfileImage } from "../redux/user/ProfileSlice";

const ImageModal = ({ onClose }) => {
  const [openCam, setOpenCam] = useState(false);
  const [showUploadInput, setShowUploadInput] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const userid = JSON.parse(localStorage.getItem('userid'));
  const token = JSON.parse(localStorage.getItem('token'));
  const dispatch = useDispatch();
  const apiUrl = import.meta.env.VITE_API_URL;
  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); // Store image as Base64
        
      };
      reader.readAsDataURL(file);
    }
  };

  const SaveProfileImg =async()=>{
         console.log(selectedImage);
    try {
      let result = await fetch(`${apiUrl}updateuser/${userid}`,{
        method:"Put",
        headers:{
          'Content-Type':"application/json",
          Authorization: token,
        },
        body:JSON.stringify({profileImg:selectedImage})
      });

       result = await result.json();
      console.log(result);
      if(result){
        dispatch(setProfileImage(reader.result));
      }

    } catch (error) {
      console.log(error);
    }

  }

  const handleUpload =()=>{
    setShowUploadInput(true)
    
  }
  return (
    <>
      {!openCam && !showUploadInput && (
        <div className="bg-gray-300 w-[350px] h-[150px] fixed inset-0 m-auto mb-14 p-2 z-50 rounded-3xl text-sm">
          <button className="flex place-self-end" onClick={onClose}>
            <X size={25} />
          </button>

          {/* Upload File Button */}
          <div className="flex justify-evenly">
          <div className="flex  flex-col items-center">
          <button onClick={handleUpload }>
            <Images /> 
          </button>
          <span>Gallery</span>
          </div>

          {/* Open Camera Button */}
          <div className=" flex flex-col items-center ">
          <button onClick={() => setOpenCam(true)}>
            <Camera />             
          </button>
          <span> Camera </span>
          </div>
          </div>
        </div>
      )}

      {/* File Upload UI */}
      {showUploadInput && (
        <div className="bg-gray-200 p-4 rounded-lg shadow-md w-[350px] h-[400px] fixed inset-0 m-auto z-50">
          <button className="flex place-self-end" onClick={() => setShowUploadInput(false)}>
            <X size={30} />
          </button>
         
         

          <img src={selectedImage } alt="Preview" className="w-32 h-32 rounded-full border mt-2" />
          <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2" />
          <button className="app-button" onClick={SaveProfileImg}>Upload Profile Image</button>

          {selectedImage && (
            <>
           
            </>
          )}
          
        </div>
      )}

      {/* Open Camera UI */}
      {openCam && <OpenCamera onClose={() => setOpenCam(false)} />}
    </>
  );
};

export default ImageModal