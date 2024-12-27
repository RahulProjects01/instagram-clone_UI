import React, { useEffect } from 'react'
import ProfileUserDetails from '../../Components/ProfileComponents/ProfileUserDetails'
import ReqUserPostPart from '../../Components/ProfileComponents/ReqUserPostPart'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { isFollowing } from '../../Config/Logics';
import { findUserByUserNameAction, getUserProfileAction } from '../../Redux/User/Action';

const Profile = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { username } = useParams();
  const { user } = useSelector(store => store);

  // Corrected logic
  const isRequser = user.reqUser?.id === user.findByUserName?.id;
  const isFollowed = isFollowing(user.reqUser, user.findByUserName);
  console.log(user);

  useEffect(() => {
    const data = {
      token, username
    }
    dispatch(getUserProfileAction(token))
    dispatch(findUserByUserNameAction(data))
  }, [username, user.follower, user.following])

  return (
    <div className='px-20'>
      <div>
        <ProfileUserDetails
          user={isRequser ? user.reqUser : user.findByUserName}
          isFollowing={isFollowed}
          isRequser={isRequser}
        />
      </div>

      <div>
        <ReqUserPostPart user={isRequser ? user.reqUser : user.findByUserName} />
      </div>
    </div>
  )
}

export default Profile