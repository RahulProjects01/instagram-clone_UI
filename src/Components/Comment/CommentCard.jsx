import React, { useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const CommentCard = () => {

    const [isCommentLike, setIsCommentLike] = useState(false);

    const handleLikeComment = ()=>{
        setIsCommentLike(!isCommentLike);
    }

    return (
        <div>
            <div className='flex items-center justify-between py-5'>
                <div className='flex items-center'>
                    <div>
                        <img className='h-9 w-9 rounded-full' src="https://cdn.pixabay.com/photo/2024/09/28/05/13/dog-9080320_960_720.jpg" alt="" />
                    </div>

                    <div className='ml-3'>
                        <p>
                            <span className='font-semibold'>username</span>
                            <span className='ml-2'>nice post</span>
                        </p>

                        <div className='flex items-center space-x-3 text-xs opacity-60 pt-2'>
                            <span>1 min ago</span>
                            <span>23 likes</span>
                        </div>
                    </div>
                </div>

                {isCommentLike ? <AiFillHeart onClick={handleLikeComment} className='text-xs hover:opacity-60 cursor-pointer text-red-700' /> : <AiOutlineHeart onClick={handleLikeComment} className='text-xs hover:opacity-60 cursor-pointer'/>}

            </div>
        </div>
    )
}

export default CommentCard