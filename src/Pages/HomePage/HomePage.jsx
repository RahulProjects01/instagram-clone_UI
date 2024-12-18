import React, { useEffect, useState } from 'react'
import StoryCircle from '../../Components/Story/StoryCircle'
import HomeRight from '../../Components/HomeRight/HomeRight'
import PostCard from '../../Components/Post/PostCard'
import { useDispatch, useSelector } from 'react-redux'
import { findUserPostAction } from '../../Redux/Post/Action'

const HomePage = () => {

  const [userIds, setUserIds] = useState();
  const token = localStorage.getItem("token")

  const dispatch = useDispatch();
  const { user, post } = useSelector(store => store);

  useEffect(() => {
    const newIds = user.reqUser?.following?.map((user) => user.id) || [];
    setUserIds([user.reqUser?.id, ...newIds]);
  }, [user.reqUser]);
  
  useEffect(() => {
    const data = {
      jwt: token,
      userIds: userIds, 
    };
  
    dispatch(findUserPostAction(data));
  }, [userIds, post.createdPost?.id, post.deletedPost?.id]); 
  
  return (
    <div>
      <div className='mt-10 flex w-[100%] justify-center'>
        <div className='w-[44%] px-10 '>

          <div className='flex storyDiv space-x-2 border p-4 rounded-md justify-start w-full'>
            {[1, 2, 1, 1, 1].map((item) => <StoryCircle />)}
          </div>

          <div className='space-y-10 w-full mt-10'>
            {post.usersPost.length > 0 && post.usersPost.map((item) => 
            (
            <PostCard post={item} />))}
          </div>
        </div>

        <div className='w-[27%] '>
          <HomeRight />
        </div>
      </div>

    </div>
  )
}

export default HomePage