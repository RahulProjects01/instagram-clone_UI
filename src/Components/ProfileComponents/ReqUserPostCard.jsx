import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import './ReqUserPostCard.css';

const ReqUserPostCard = () => {
    // Get posts from Redux store
    const { usersPost } = useSelector(state => state.post); 

    // Check if usersPost exists and has data
    if (!usersPost || usersPost.length === 0) {
        return <div>No posts available</div>; // Or handle loading state
    }

    // Assuming usersPost is an array of post objects
    const post = usersPost[0]; // Adjust to fetch the appropriate post data

    return (
        <div className="p-2">
            <div className="post w-60 h-60 relative">
                <img className="cursor-pointer" src={post?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="Post" />
                <div className="overlay absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                    <div className="overlay-text flex justify-between w-full p-2 bg-black bg-opacity-50 text-white">
                        <div className="flex items-center">
                            <AiFillHeart />
                            <span className="ml-2">{post?.likes || 0}</span>
                        </div>

                        <div className="flex items-center">
                            <FaComment />
                            <span className="ml-2">{post?.comments || 0}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReqUserPostCard;
