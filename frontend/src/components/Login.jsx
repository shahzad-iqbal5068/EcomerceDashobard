
import React, { useRef } from "react";
import {useNavigate} from 'react-router-dom';
import { setUserDetail } from "../redux/user/userdetails";
import { useDispatch } from "react-redux";
import {Link} from 'react-router-dom'
import { Google, Facebook, Instagram } from "./SocialSvg";
import { toast } from "react-toastify";


const Login = ()=>{
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const dispatch = useDispatch ();

    const handleLogin = async()=>{

        const user =await FetchData();
        if(user.user.role ==="customer"){   
          toast.success("Login user Sucessfully")
          navigate('/')
         handleUserData(user);
         return
       }
        if(user.user.role === "admin"){
          toast.success("Login user Sucessfully")
          handleUserData(user);
          navigate('/dashboard');
          return
        }

      if(user.user.isAllowed === true && user.user.role ==='vendor'){
        toast.success("Login user Sucessfully")
          navigate('/MyProducts');
          handleUserData(user);
          return
      }
      else{
        navigate('/')
        toast.warn("Please Wait For Activating Your Seller Dashboard")
        return
      } 
      
      
    }
    const FetchData = async()=>{
      const email=emailRef.current.value;
      const password = passwordRef.current.value;
      try {
        let response = await fetch('http://localhost:5000/login',{
        method:'post',
        body:JSON.stringify({email,password}),
        headers:{
            'Content-type':'application/json'
        }});
        response= await response.json();
        if(response.status === 200){
          // toast.success("woooow");
          return response;
        }
        if (!response.ok) {
          throw new Error(response.error || "Something went wrong");
        }
         
      } catch (error) {
        toast.error(error.message);
      }      
    }
    const handleUserData=(user)=>{
      localStorage.setItem('userid',JSON.stringify(user.user._id));
      localStorage.setItem('token',JSON.stringify(user.auth));
      dispatch(setUserDetail(user.user));          
  } 
    return(
      <div className="flex justify-center p-8  ">
      <div className="w-full max-w-sm h-140 bg-white p-6 shadow-2xl shadow-amber-200 rounded-2xl">
        <h1 className="text-2xl text-center font-bold mb-4">Login</h1>

        <input
          type="text"
          ref={emailRef}
          className="w-full p-2 border border-slate-200 rounded-lg my-4 focus:outline-none focus:ring-2 focus:ring-slate-400"
          placeholder="Enter Email"
        />

        <input
          type="password"
          ref={passwordRef}
          className="w-full p-2 border  border-slate-200 rounded-lg my-4 focus:outline-none focus:ring-2 focus:ring-slate-400"
          placeholder="Enter Password"
        />

        <button
          type="button"
          className="w-full bg-slate-400 my-4 text-white p-2 rounded-lg hover:bg-slate-600"
          onClick={handleLogin}
        >
          Sign In
        </button>

        <div className="flex justify-between my-4 text-sm">
          <Link to="#" className="text-slate-500 hover:underline">
            Forgot password?
          </Link>
          <Link to="/signup" className="text-slate-500 hover:underline">
            Sign up
          </Link>
        </div>

        <div className="flex flex-col items-center mt-4">
          <span className="text-gray-500 text-sm">or sign in with</span>
          <div className="flex gap-2">
                      <button className="p-2 hover:bg-gray-200 rounded-lg">
                        <Google />
                      </button>
                      <button className="p-2 hover:bg-gray-200 rounded-lg">
                        <Facebook />
                      </button>
                      <button className="p-2 hover:bg-gray-200 rounded-lg">
                        <Instagram />
                      </button>
                    </div>

        </div>
      </div>
    </div>
    )
};
export default Login;