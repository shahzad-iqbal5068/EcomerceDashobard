import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div>
        <img
         className="logo-image"
         alt='logo' 
         crossOrigin="anonymous" 
         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHMxuqqnkGPEc0_-r1VvKQ4wALmZ3x-ueuUA&s"/>
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/add">Add Products</Link>
          </li>
          <li>
            <Link to="/update">Update Products</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link onClick={handleLogout} to="/signup">
              Logout   ({JSON.parse(auth).name})
            </Link>
          </li>

          {/* <li>{auth ? <Link  onClick={handleLogout} to='/signup'>Logout</Link> : 
            <Link to='/signup'>Signup</Link>}</li>
            <li><Link to='/login'>Login</Link></li> */}

          {/* { auth ? <li><Link  onClick={handleLogout} to='/signup'>Logout</Link></li>
            : <>
            <li><Link to='/signup'>Signup</Link></li>
            <li><Link to='/login'>Login</Link></li>
            </>} */}
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};
export default Nav;
