import React, {useEffect, useRef} from 'react'


const OpenCamera = ({onClose}) => {

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(()=>{
   
    startCamera();

    return () => {
      // ✅ Stop camera when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  },[]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };
  
  const captureImage = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");
  
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
    const imageData = canvas.toDataURL("image/png"); // Convert image to Base64
  
    // ✅ Save to Database
    try {
      const response = await fetch(`http://localhost:5000/api/users/update-profile/${userProfile._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profileImage: imageData }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  
    // Stop Camera Stream
    const stream = video.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50">
        <video ref={videoRef} autoPlay className="w-full max-w-md border-4 border-gray-200" />
        <button onClick={captureImage} className="bg-green-500 text-white px-4 py-2 rounded mt-4">
          Capture Photo
        </button>
        <button onClick={onClose} className="mt-2 text-red-400">
          Cancel
        </button>
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  )
}

export default OpenCamera
