import React, { useEffect, useState } from 'react';
import { AiOutlineTable, AiOutlineUser } from 'react-icons/ai';
import { BiBookmark } from 'react-icons/bi';
import { RiVideoAddLine } from 'react-icons/ri';
import ReqUserPostCard from './ReqUserPostCard';
import { useDispatch, useSelector } from 'react-redux';
import { reqUserPostAction } from '../../Redux/Post/Action';

const ReqUserPostPart = ({ user }) => {
  const [activeTab, setActiveTab] = useState("Post");
  const dispatch = useDispatch();

  // Updated selector for Redux state
  const { post } = useSelector(store => store);
  console.log("Redux state posts: ", post.usersPost);


  const token = localStorage.getItem("token");

  const tabs = [
    { tab: "Post", icon: <AiOutlineTable /> },
    { tab: "Reels", icon: <RiVideoAddLine /> },
    { tab: "Saved", icon: <BiBookmark /> },
    { tab: "Tagged", icon: <AiOutlineUser /> }
  ];

  useEffect(() => {
    if (user && token) {
      const data = { jwt: token, userId: user.id };
      dispatch(reqUserPostAction(data));
      console.log("Fetching User Posts with ID:", user.id);
    } else {
      console.log("User or token is missing");
    }
  }, [dispatch, user, token]);

  return (
    <div>
      {/* Tabs Section */}
      <div className='flex space-x-14 border-t relative'>
        {tabs.map((item) => (
          <div
            key={item.tab}
            onClick={() => setActiveTab(item.tab)}
            className={`${activeTab === item.tab ? "border-t border-black" : "opacity-60"} 
              flex items-center cursor-pointer py-2 text-sm`}
          >
            <p>{item.icon}</p>
            <p className='ml-1 text-sm'>{item.tab}</p>
          </div>
        ))}
      </div>

      {/* Posts Section */}
      <div>
        <div className='flex flex-wrap'>
          {activeTab === "Post" && post?.usersPost?.length > 0 ? (
            post.usersPost.map((item) => (
              <ReqUserPostCard post={item} key={item.id || Math.random()} />
            ))
          ) : (
            <p className="text-center w-full py-4">No Posts Found</p>
          )}
        </div>
      </div>

    </div>
  );
}

export default ReqUserPostPart;
