import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCallback } from "react";

const useFetchApi = () => {
  const navigate = useNavigate();

  const apicall = useCallback(async ({ url, method = "GET", body = null }) => {
   const token = JSON.parse(localStorage.getItem("token")) || null;
   
    try {
      let response = await fetch(url, {
        method: method || "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: method !== "GET" && method !== "DELETE" && body ? JSON.stringify(body) : undefined,
      });
      
      if (response.status ===  401) {
         toast.error("Session expired. Please log in again.");
         navigate("/login");
         localStorage.removeItem("token");
         localStorage.removeItem("userid");
         return
      }
      response = await response.json();
      console.log("Response in useFetchApi", response);

      return response; 
    } catch (error) {
      console.error("Error in API call:", error);
      toast.error("something wrong try again  ",error);
      navigate('/login');
    }
  }, [navigate]);

  return apicall; 
};

export default useFetchApi;
