
import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';

const Login = ()=>{
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword]= useState('');

    const handleLogin = async()=>{
        console.log(email,password);
        let result = await fetch('http://localhost:5000/login',{
        method:'post',
        body:JSON.stringify({email,password}),
        headers:{
            'Content-type':'application/json'
        }});
        result = await result.json();
        // console.log(result)
        if(result.auth){
          localStorage.setItem('user',JSON.stringify(result.user));
          localStorage.setItem('token',JSON.stringify(result.auth));
          navigate('/');
        }else{
            alert("Please enter correct details")
        }
    }
    return(
        <div className="login">
            
            <input type="text" className="input-box" placeholder="Enter Email"
            value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" className="input-box" placeholder="Enter password" 
            value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button type="button" className="app-button" onClick={handleLogin}>Login</button>
        </div>
    )
};
export default Login;