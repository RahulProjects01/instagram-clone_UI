import React, { useEffect, useState } from 'react'
import { BsBookmark, BsBookmarkFill, BsEmojiSmile, BsThreeDots } from 'react-icons/bs'
import "./PostCard.css";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { RiSendPlaneLine } from 'react-icons/ri';
import CommentModel from '../Comment/CommentModel';
import { useDisclosure } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { likePostAction, savePostAction, unLikePostAction, unSavePostAction } from '../../Redux/Post/Action';
import { isPostLikedByUser, isSavedPost } from '../../Config/Logics';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post }) => {
    const [showDropDown, setShowDropDown] = useState(false);
    const [isPostLiked, setIsPostLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const { user } = useSelector(store => store);
    const navigate = useNavigate();
    const data = { jwt: token, postId: post?.id }

    // console.log("ReqUser --- ", user.reqUser);

    const handleSavedPost = () => {
        setIsSaved(true);
        dispatch(savePostAction(data))
    }

    const handleUnsavedPost = () => {
        setIsSaved(false);
        dispatch(unSavePostAction(data))
    }

    const handlepostLike = () => {
        setIsPostLiked(true);
        dispatch(likePostAction(data))
    }

    const handlepostUnlike = () => {
        setIsPostLiked(false);
        dispatch(unLikePostAction(data))
    }

    const handleClick = () => {
        setShowDropDown(!showDropDown)
    }

    const handleOpenCommentModel = () => {
        navigate(`/comment/${post.id}`)
        onOpen();
    }

    useEffect(() => {
        setIsPostLiked(isPostLikedByUser(post, user.reqUser?.id))
        setIsSaved(isSavedPost(user.reqUser, post.id))
    }, [post.likedByUsers, user.reqUser])


    return (
        <div>
            <div className='border rounded-md w-full '>
                <div className='flex justify-between items-center w-full py-4 px-5'>
                    <div className='flex items-center'>
                        <img className='h-12 w-12 rounded-full'
                            src={post.user.userImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="" />

                        <div className='pl-2'>
                            <p className='font-semibold text-sm '>{post?.user.username}</p>
                            <p className='font-thin text-sm'>{post?.location}</p>
                        </div>
                    </div>

                    <div className='dropdown'>
                        <BsThreeDots className='dots' onClick={handleClick} />
                        <div className='dropdown-content'>
                            {showDropDown && <p className='bg-black text-white py-1 px-4 rounded-md cursor-pointer'>Delete </p>}
                        </div>
                    </div>
                </div>

                <div className='w-full'>
                    <img className='w-full' src={post?.image} alt={post.title || 'Post Image'} />
                </div>

                <div className='flex justify-between items-center w-full px-5 py-4'>
                    <div className='flex items-center space-x-2'>
                        {isPostLiked ? <AiFillHeart className='text-2xl hover:opacity-50 cursor-pointer text-red-600'
                            onClick={handlepostUnlike} /> : <AiOutlineHeart className='text-2xl hover:opacity-50 cursor-pointer' onClick={handlepostLike} />}
                        <FaRegComment onClick={handleOpenCommentModel} className='text-xl hover:opacity-50 cursor-pointer' />
                        <RiSendPlaneLine className='text-xl hover:opacity-50 cursor-pointer' />
                    </div>

                    <div>
                        {isSaved ? (<BsBookmarkFill onClick={handleUnsavedPost} className='text-xl hover:opacity-50 cursor-pointer' />) : (<BsBookmark onClick={handleSavedPost} className='text-xl hover:opacity-50 cursor-pointer' />)}
                    </div>
                </div>

                <div className='w-full py-2 px-5 '>
                    {post?.likedByUsers?.length > 0 && <p>{post?.likedByUsers?.length} likes</p>}
                    {post.comments.length > 0 && <p className='opacity-50 py-2 cursor-pointer'>view all {post?.comments?.length} comments</p>}
                </div>

                <div className='border '>
                    <div className='flex w-full items-center px-5 '>
                        <BsEmojiSmile />
                        <input className='commentInput' type="text" placeholder='Add a comment...' />
                    </div>
                </div>
            </div>
            <CommentModel handlepostLike={handlepostLike} onClose={onClose} isOpen={isOpen} handleSavedPost={handleSavedPost} isPostLiked={isPostLiked} isSaved={isSaved} />
        </div>
    )
}

export default PostCard