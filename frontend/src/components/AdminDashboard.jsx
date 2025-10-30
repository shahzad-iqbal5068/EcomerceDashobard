import React,{useEffect, useState}from "react";
import SaleProfitChart from "./SaleProfitChart ";
import SalesChart from "./SalesChart";
import { Bell, Users, ShoppingCart, Package } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
const AdminDashboard = () => {
  const navigate = useNavigate();
 const [count,setCount]=useState({
  allowedVendor:0,
  customerUser:0,
  notAllowedVendor:0,
  totalVendor:0
})
 const token = JSON.parse(localStorage.getItem("token"));
 const apiUrl = import.meta.env.VITE_API_URL;
//  console.log(token)
 useEffect(()=>{
  
  countUser()
 },[]);

 const countUser =async()=>{
  try {
    let response=await fetch(`${apiUrl}/user/count`
    ,{
      headers:{
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    if(!response.ok){
      navigate('/login');
      localStorage.removeItem('userid')
      localStorage.removeItem('token')
      throw new Error("Invlaid token");
    }
     const data = await response.json();
    console.log("user count is ",data);
     setCount(data)
  } catch (error) {
    toast.error("Error counting user")
    console.log(error);
  }
 }
 const countProduct=async()=>{
  try {
    let response = await fetch (`${apiUrl}/product/count`,{
      headers:{
        "Authorization":`Bearer ${token}`,
        "Content-Type":"application/json"
      }
    })
  } catch (error) {
    
  }
 }
 
  return (
    <div className=" border p-4">
      <section className="flex justify-evenly flex-wrap">
        <div className=" p-2 w-48 h-32 bg-white   m-2 flex flex-col justify-evenly font-bold text-xl shadow-2xl shadow-amber-200 rounded-xl">
          <span className="flex justify-between items-center">
            {" "}
            <h3> Products</h3>
            <ShoppingCart size={30} />
          </span>
          <span>300</span>
        </div>
        <div className=" p-2 w-48 h-32 bg-white   m-2 flex flex-col justify-evenly font-bold text-xl shadow-2xl shadow-amber-200 rounded-xl">
          <span className="flex justify-between items-center">
            {" "}
            <h3> Catogories</h3>
            <Package size={30} />
          </span>
          <span>150</span>
        </div>
        <div className=" p-2 w-48 h-32 bg-white   m-2 flex flex-col justify-evenly font-bold text-xl shadow-2xl shadow-amber-200 rounded-xl">
          <span className="flex justify-between items-center">
            {" "}
            <h3>Vendors</h3>
            <Users size={30} />
          </span>
          <span>{count.totalVendor}</span>
        </div>
        <div className=" p-2 w-48 h-32 bg-white   m-2 flex flex-col justify-evenly font-bold text-xl shadow-2xl shadow-amber-200 rounded-xl">
          <span className="flex justify-between items-center">
            {" "}
            <h3>Verified Vendors</h3>
            <Users size={30} />
          </span>
          <span>{count.allowedVendor}</span>
        </div>
        <div className=" p-2 w-48 h-32 bg-white   m-2 flex flex-col justify-evenly font-bold text-xl shadow-2xl shadow-amber-200 rounded-xl">
          <span className="flex justify-between items-center">
            {" "}
            <h3>Non Verified Vendors</h3>
            <Users size={30} />
          </span>
          <span>{count.notAllowedVendor}</span>
        </div>
        <div className=" p-2 w-48 h-32 bg-white   m-2 flex flex-col justify-evenly font-bold text-xl shadow-2xl shadow-amber-200 rounded-xl">
          <span className="flex justify-between items-center">
            {" "}
            <h3>Customers</h3>
            <Users size={30} />
          </span>
          <span>{count.customerUser}</span>
        </div>
        <div className=" p-2 w-48 h-32 bg-white   m-2 flex flex-col justify-evenly font-bold text-xl shadow-2xl shadow-amber-200 rounded-xl">
          <span className="flex justify-between items-center">
            {" "}
            <h3>Alerts</h3>
            <Bell size={30} />
          </span>
          <span>20</span>
        </div>
        
      </section>
      <h1 className="text-2xl font-bold mb-4">Sales & Profit</h1>
      <div className="grid  grid-cols-1 md:grid-cols-2 gap-4 w-full p-4 ">
        <SaleProfitChart />
        <SalesChart />
      </div>
    </div>
  );
};

export default AdminDashboard;
