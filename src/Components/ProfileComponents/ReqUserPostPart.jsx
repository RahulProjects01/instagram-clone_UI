import React, { useEffect, useState } from 'react';
import { AiOutlineTable, AiOutlineUser } from 'react-icons/ai';
import { BiBookmark } from 'react-icons/bi';
import { RiVideoAddLine } from 'react-icons/ri';
import ReqUserPostCard from './ReqUserPostCard';
import { useDispatch, useSelector } from 'react-redux';
import { reqUserPostAction } from '../../Redux/Post/Action';

const ReqUserPostPart = ({ user }) => {
  const [activeTab, setActiveTab] = useState("post");
  const dispatch = useDispatch();
  const { post } = useSelector((store) => store.post); // Ensure correct state reference
  const token = localStorage.getItem("token");

  const tabs = [
    { tab: "Post", icon: <AiOutlineTable /> },
    { tab: "Reels", icon: <RiVideoAddLine /> },
    { tab: "Saved", icon: <BiBookmark /> },
    { tab: "Tagged", icon: <AiOutlineUser /> }
  ];

  useEffect(() => {
    if (user) {
      const data = { jwt: token, userId: user?.id }; // Use user ID and token to fetch posts
      dispatch(reqUserPostAction(data)); // Trigger post fetching action
    }
  }, [dispatch, user, token]);

  return (
    <div>
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

      <div>
        <div className='flex flex-wrap'>
          {activeTab === "Post" ? (
            post?.profilePost?.map((item) => <ReqUserPostCard post={item} key={item.id} />) // Ensure `key` prop is provided
          ) : (
            user?.savedPost?.map((item) => <ReqUserPostCard post={item} key={item.id} />) // Handle other tabs if needed
          )}
        </div>
      </div>
    </div>
  );
}

export default ReqUserPostPart;
