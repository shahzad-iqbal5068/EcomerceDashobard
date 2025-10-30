import { ShoppingCart, UsersRound } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link,useLocation, useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetail } from "../redux/user/userdetails";
import useFetchApi from "../customHook/useFetchApi";



const Nav = () => {
  const navigate = useNavigate();
  const dispatch =useDispatch();
  const location = useLocation();
  const fetchApi = useFetchApi();
  const [showProfile, setShowProfile] = useState(false);
  const profileImage = useSelector((state) => state.profile.profileImage);
  const userdetail = useSelector((state)=>state.user.userDetail);
  console.log("userdetail is ",userdetail)
  const { totalQuantity } = useSelector((state)=>state.cart);  
  const userid = JSON.parse(localStorage.getItem("userid"));
  console.log("userid in nav.js",userid);
  const token = JSON.parse(localStorage.getItem("token"));
  const apiUser = import.meta.env.VITE_API_URL;


  useEffect(() => {
  
    if (userid) {
      fetchUserData();
    } 

  },[]);

  const fetchUserData = async () => {
    const url = `${apiUser}/users/${userid}`;
    try {
      const response = await fetchApi({url});
      console.log("response in navbar is ",response);
      dispatch(setUserDetail(response[0]));
      
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setUserDetail (null));
    navigate("/login");
  };
 
  return (
    <nav className="flex flex-col md:flex-row justify-center gap-5 md:justify-between font-medium items-center p-2 text-white bg-slate-400  sticky top-0 z-50 ">
    <div className="flex items-center gap-5 font-medium">
      <img
        className="w-auto h-10  border-2 border-amber-50"
        alt="logo"
        crossOrigin="anonymous"
        src="./QuickMart.png"
      />
      <h1 className="text-2xl">QuickMart</h1>
    </div>

    <ul className="flex flex-col md:flex-row gap-4 text-xl">
      {userdetail ? (
        <>
          {/* Customer Navigation */}
          {userdetail?.role === "customer" && (
            <>
              <li className={location.pathname === "/" ? "bg-slate-500 rounded-xl" : ""}>
                <Link to="/">Products</Link>
              </li>
              <li className={location.pathname === "/cart" ? "bg-slate-500 rounded-xl" : ""}>
                <div className="flex">
                  <Link to="/cart">
                    <ShoppingCart size={30} />
                  </Link>
                  <span className="relative left-[-10px] top-[-8px] text-sm bg-slate-200 w-5 h-5 rounded-full flex justify-center">
                    {totalQuantity || 0}
                  </span>
                </div>
              </li>
            </>
          )}

          {/* Vendor Navigation */}
          {userdetail?.role === "vendor" && (
            <>
              <li className={location.pathname === "/MyProducts" ? "bg-slate-500 rounded-xl" : ""}>
                <Link to="/MyProducts">My Products</Link>
              </li>
              <li className={location.pathname === "/add" ? "bg-slate-500 rounded-xl" : ""}>
                <Link to="/add">Add Products</Link>
              </li>
            </>
          )}

          {/* Admin Navigation */}
          {userdetail?.role === "admin" && (
            <>
              <li className={location.pathname === "/dashboard" ? "bg-slate-500 rounded-xl" : ""}>
                <Link to="/dashboard">Admin Dashboard</Link>
              </li>
              <li className={location.pathname === "/manage-users" ? "bg-slate-500 rounded-xl" : ""}>
                <Link to="/manage-users">Manage Users</Link>
              </li>
              <li className={location.pathname === "/signup" ? "bg-slate-500 rounded-xl" : ""}>
                <Link to="/signup">Create Vendor</Link>
              </li>
            </>
          )}

          {/* Common for All Logged-in Users */}
          <li>
            <button onClick={() => setShowProfile(true)} className={showProfile ? "bg-slate-500 rounded-xl" : ""}>
              Profile
            </button>
          </li>
          {showProfile && <ProfileModal onClose={() => setShowProfile(false)} userProfile={userdetail} />}

          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>

          {/* Profile Picture / User Info */}
          <li className="flex gap-2 items-center">
            {userdetail.name}
            <div onClick={() => setShowProfile(true)} className="cursor-pointer">
              {userdetail.profileImg || profileImage ? (
                <img
                  src={userdetail.profileImg || profileImage}
                  alt="profile"
                  className="w-10 h-10 rounded-full border-gray-500"
                />
              ) : (
                <UsersRound size={30} />
              )}
            </div>
          </li>
        </>
      ) : (
        <>
          {/* When No User is Logged In */}
          <li className={location.pathname === "/" ? "bg-slate-500 rounded-xl" : ""}>
            <Link to="/">Products</Link>
          </li>
          <li className={location.pathname === "/cart" ? "bg-slate-500 rounded-xl" : ""}>
            <div className="flex">
              <Link to="/cart">
                <ShoppingCart size={30} />
              </Link>
              <span className="relative left-[-10px] top-[-8px] text-sm bg-slate-200 w-5 h-5 rounded-full flex justify-center">
                {totalQuantity || 0}
              </span>
            </div>
          </li>
          <li className={location.pathname === "/seller" ? "bg-slate-500 rounded-xl" : ""}>
            <Link to="/seller">Become A Seller</Link>
          </li>
          <li className={location.pathname === "/signup" ? "bg-slate-500 rounded-xl" : ""}>
            <Link to="/signup">Signup</Link>
          </li>
          <li className={location.pathname === "/login" ? "bg-slate-500 rounded-xl" : ""}>
            <Link to="/login">Login</Link>
          </li>
        </>
      )}
    </ul>
  </nav>
  );
};

export default Nav;


