import React, { useState } from "react";
import { UsersRound, UserRound } from "lucide-react";
import { ArrowLeft, Camera } from "lucide-react";
import ImageModal from "./ImageModal";
import { useSelector } from "react-redux";

const ProfileModal = ({ onClose }) => {
  const userdetail = useSelector((state) => state.user.userDetail);
  console.log("userprofie is", userdetail);
  const profileImage = useSelector((state) => state.profile.profileImage);
  const [profileImageModal, setProfileImageModal] = useState(false);
  return (
    <div className="bg-gray-100 w-[400px] h-[500px] fixed inset-0 m-auto p-2 z-50">
      <button className=" flex place-self-start" onClick={onClose}>
        <ArrowLeft size={30} />
      </button>

      <div className="flex flex-col justify-center items-center">
        {userdetail || profileImage ? (
          <img
            src={profileImage || userdetail.profileImg}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-gray-500"
          />
        ) : (
          <UsersRound size={150} className=" rounded-full p-2 " />
        )}

        <Camera size={24} className="relative -top-[30px] -right-[40px]" onClick={() => setProfileImageModal(true)} />
        {profileImageModal && (
          <ImageModal onClose={() => setProfileImageModal(false)} />
        )}

        <p>{userdetail._id}</p>
      </div>
      <div className="flex gap-4 p-2 items-center">
        <UserRound  className=""/>
        <div className=" flex flex-col">
          <span className="text-md">User Name</span>
          <span className=" text-gray-500 border-2 border-gray-500 p-2 rounded-xl w-[300px]   ">
            {userdetail.name} 
          </span>
        </div>
      </div>
      <div className="flex gap-4 p-2 items-center">
        <UserRound  className=""/>
        <div className=" flex flex-col">
          <span className="text-md">User Email</span>
          <span className=" text-gray-500 border-2 border-gray-500 p-2 rounded-xl w-[300px]   ">
            {userdetail.email} 
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
