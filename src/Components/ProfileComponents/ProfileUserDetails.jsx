import React from 'react';
import { TbCircleDashed } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProfileUserDetails = () => {
  const { user } = useSelector(store => store);  // Ensure you're accessing the correct user from Redux
  const navigate = useNavigate();
  console.log("User Data:", user); 
  return (
    <div className='py-10'>
      <div className='flex items-center'>
        <div className='w-[15%]'>
        <img
  className="w-32 h-32 rounded-full object-cover"
  src={user.reqUser?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}
  alt="User Profile"
/>

        </div>

        <div className='space-y-5'>
          <div className='flex space-x-10'>
            <p>{user?.reqUser?.username}</p>
            <button onClick={() => navigate("/account/edit")}>Edit profile</button>
            <TbCircleDashed />
          </div>

          <div className='flex space-x-10'>
            <div>
              <span className='font-semibold mr-2'>{user?.reqUser?.posts?.length || 0}</span>
              <span>posts</span>
            </div>

            <div>
              <span className='font-semibold mr-2'>{user?.reqUser?.follower?.length || 0}</span>
              <span>follower</span>
            </div>

            <div>
              <span className='font-semibold mr-2'>{user?.reqUser?.following?.length || 0}</span>
              <span>following</span>
            </div>
          </div>

          <div>
            <p className='font-semibold'>{user?.reqUser?.name}</p>
            <p className='font-thin text-sm'>{user?.reqUser?.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileUserDetails;
