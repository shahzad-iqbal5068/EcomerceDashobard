import React, { useState ,useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Signup = ()=>{
    const [name,setName]=useState("");
    const [password,setPassword]= useState("");
    const [email,setEmail]= useState("")
    const navigate = useNavigate();
    
    useEffect(()=>{
        const auth = localStorage.getItem('user')
        if(auth){
            navigate('/')
        }
    })
    const collectData = async()=>{
        // console.log({name,email,password})
        if(!name || !email || !password){
            // console.log("jfjfjjf", name, email, password)
                alert(" Enter all values")
                return;
            }
        try {
            let result = await fetch('http://localhost:5000/register',{
                method:'post',
                body:JSON.stringify({name,email,password}),
                headers:{
                    'Content-Type':'application/json'
                },
            })
            result = await result.json();
            console.log(result);
            if(result){
                localStorage.setItem("user",JSON.stringify(result.data))
                localStorage.setItem("token",JSON.stringify(result.auth))
                navigate('/')
            }
        } catch (error) {
            console.error("error registering user data",error);
        }
    
    }
    return(
        <div className="register">
            <h1>Register</h1>
            <input className="input-box"
            value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="Enter Name"/>

            <input className="input-box" 
            value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="Enter Email"/>

        
            <input className="input-box" 
            value={password} onChange={(e)=>setPassword(e.target.value)} 
            type="password" placeholder="Enter Password"/>

            <button className="app-button" onClick={collectData} type="button">Sing Up</button>
        </div>
    )
}

export default Signup;