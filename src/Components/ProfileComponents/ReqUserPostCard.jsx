import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
import './ReqUserPostCard.css';

const ReqUserPostCard = ({ post }) => {
    // Ensure post exists before rendering
    if (!post) {
        return <div>No Post Data</div>;
    }

    return (
        <div className="p-2">
            <div className="post w-60 h-60 relative">
                {/* Post Image */}
                <img 
                    className="cursor-pointer w-full h-full object-cover"
                    src={post.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} 
                    alt="Post" 
                />
                
                {/* Overlay Section */}
                <div className="overlay absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                    <div className="overlay-text flex justify-between w-full p-2 bg-black bg-opacity-50 text-white">
                        
                        {/* Likes Section */}
                        <div className="flex items-center">
                            <AiFillHeart />
                            <span className="ml-2">{post.likes || 0}</span>
                        </div>

                        {/* Comments Section */}
                        <div className="flex items-center">
                            <FaComment />
                            <span className="ml-2">{post.comments || 0}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReqUserPostCard;
