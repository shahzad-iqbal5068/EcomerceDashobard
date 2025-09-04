import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCallback } from "react";

const useFetchApi = () => {
  const navigate = useNavigate();

  const apicall = useCallback(async ({ url, method = "GET", body = null }) => {
    const token = JSON.parse(localStorage.getItem("token")) || null;

    try {
      const options = {
        method: method || "GET",
        headers: {},
      };

      // 🔹 Add token if exists
      if (token) {
        options.headers.Authorization = `Bearer ${token}`;
      }

      // 🔹 Handle FormData (file upload) vs JSON
      if (body instanceof FormData) {
        options.body = body; 
        // ❌ Don't set Content-Type, browser will do it
      } else if (body && method !== "GET" && method !== "DELETE") {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body);
      }

      let response = await fetch(url, options);

      if (response.status === 401) {
        toast.error("Session expired. Please log in again.");
        navigate("/login");
        localStorage.removeItem("token");
        localStorage.removeItem("userid");
        return;
      }

      const data = await response.json();
      console.log("Response in useFetchApi", data);

      return data;
    } catch (error) {
      console.error("Error in API call:", error);
      toast.error("Something went wrong, try again.");
      navigate("/login");
    }
  }, [navigate]);

  return apicall;
};

export default useFetchApi;
