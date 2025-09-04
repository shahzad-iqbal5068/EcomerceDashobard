import React, {useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDetail } from "../redux/user/userdetails";
import { Link } from "react-router-dom";
import { Google, Facebook, Instagram } from "./SocialSvg";
import {toast} from 'react-toastify'

const Signup = ({vendorRequest}) => {
  console.log("vendor request in sinup", vendorRequest);

  const nameRef= useRef(null);
  const passwordRef = useRef(null);
  const emailRef= useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = localStorage.getItem("userid");
    if (auth) {
      navigate("/");
    }
  });
  const collectData = async () => {
    const name = nameRef.current.value;
    const password = passwordRef.current.value;
    const email = emailRef.current.value
    if (!name || !email || !password) {
      toast.warn("Enter all values");
      return;
    }
    const userdata = {name,email,password,role:"customer"};
    const vendorbody = {name,email,password,isAllowed: false,role:"vendor"}
    if (vendorRequest) {
        
        const result =await senduserData(vendorbody);
        if(result){
            toast.success("Register sucessfully wait atleast 2 workdays")
            navigate("/")
        }
    }else{
        const result =await senduserData(userdata);

        if (result) {
                  localStorage.setItem("userid",JSON.stringify(result.data._id));
                  localStorage.setItem("token", JSON.stringify(result.auth));
                  dispatch(setUserDetail(result.data));
                  navigate("/");
                  toast.success("Register succesfully")
                }
    }
       
  };

  const senduserData = async(body)=>{
     try {
            let result = await fetch(`http://localhost:5000/register`,{
                method:"Post",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                  },
            })
            result = await result.json();
            console.log("result is",result);
            return result;
        } catch (error) {
            console.error("error registering user data", error);
        }
  }

  const handleGoogleLogin = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <div className="flex justify-center  p-8">
      <div className="w-full max-w-sm h-140 bg-white p-6 shadow-2xl shadow-amber-200 rounded-2xl">
        <h1 className="text-2xl text-center font-bold mb-4">Register</h1>

        <input
          className="w-full p-2 border border-slate-200 rounded-lg my-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
          type="text"
          ref={nameRef}
          placeholder="Enter Name"
        />

        <input
          type="text"
          ref={emailRef}
          className="w-full p-2 border border-slate-200 rounded-lg my-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
          placeholder="Enter Email"
        />

        <input
          type="password"
          ref={passwordRef}
          className="w-full p-2 border border-slate-200 rounded-lg my-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
          placeholder="Enter Password"
        />

        <button
          type="button"
          onClick={collectData}
          className="w-full bg-slate-400 my-3 text-white p-2 rounded-lg hover:bg-slate-600"
        >
          Sign Up
        </button>

        <p className="text-center my-3 text-gray-500">
          Have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>

        <div className="flex flex-col items-center mt-4">
          <span className="text-gray-500 text-sm mb-2">or sign up with</span>
          <div className="flex gap-2">
            <button  onClick={handleGoogleLogin}className="p-2 hover:bg-gray-200 rounded-lg">
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
  );
};

export default Signup;