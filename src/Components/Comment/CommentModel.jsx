import React, { useEffect, useState } from 'react';

import { BsBookmarkFill, BsBookmark, BsEmojiSmile } from 'react-icons/bs';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { RiSendPlaneLine } from 'react-icons/ri';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
} from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import CommentCard from './CommentCard';
import "./CommentModel.css"
import { useDispatch, useSelector } from 'react-redux';
import { createCommentAction } from '../../Redux/Comment/Action';
import { useParams } from 'react-router-dom';
import { findPostByIdAction } from '../../Redux/Post/Action';
import { timeDifference } from '../../Config/Logics';

const CommentModel = ({ onClose, isOpen, isPostLiked, isSaved, handleSavedPost, handlepostLike }) => {

    const [commentContent, setCommentContent] = useState();
    const dispatch = useDispatch();
    const token = localStorage.getItem("token")
    const { postId } = useParams();
    const { comment, post, user } = useSelector(store => store);



    // console.log("Post", post);

    useEffect(() => {
        const data = { jwt: token, postId }
        if (postId) {
            dispatch(findPostByIdAction(data));
        }
    }, [comment.createdComment, postId, comment.likeComment])



    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose} size='4xl' isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <div className="flex h-[75vh]  ">
                            <div className="w-[45%] flex flex-col justify-center">
                                <img
                                    className="max-h-full w-full"
                                    src={post.singlePost?.image}
                                    alt="Cat"
                                />
                            </div>

                            <div className=" w-[55%] pl-10">
                                <div className='flex justify-between items-center py-5'>
                                    <div className='flex items-center'>
                                        <div>
                                            <img className='h-9 w-9 rounded-full'
                                                src={user.reqUser.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="" />
                                        </div>

                                        <div className='ml-2'>
                                            <p>{user.reqUser.username}</p>
                                        </div>
                                    </div>

                                    <BsThreeDots />
                                </div>
                                <hr />
                                <div className='comment'>
                                    {post.singlePost?.comments?.map((item) => <CommentCard comment={item} />)}
                                </div>


                                {/* comment card */}
                                <div className=' absolute bottom-0'>
                                    <div className='flex justify-between items-center w-full py-4'>
                                        <div className='flex items-center space-x-2'>
                                            {isPostLiked ? <AiFillHeart className='text-2xl hover:opacity-50 cursor-pointer text-red-600'
                                                onClick={handlepostLike} /> : <AiOutlineHeart className='text-2xl hover:opacity-50 cursor-pointer' onClick={handlepostLike} />}
                                            <FaRegComment className='text-xl hover:opacity-50 cursor-pointer' />
                                            <RiSendPlaneLine className='text-xl hover:opacity-50 cursor-pointer' />
                                        </div>

                                        <div>
                                            {isSaved ? (<BsBookmarkFill onClick={handleSavedPost} className='text-xl hover:opacity-50 cursor-pointer' />) : (<BsBookmark onClick={handleSavedPost} className='text-xl hover:opacity-50 cursor-pointer' />)}
                                        </div>
                                    </div>

                                    <div className='w-full py-2'>
                                        {post.singlePost?.likedByUsers.length > 0 && <p>{post.singlePost?.likedByUsers.length} likes</p>}
                                        <p className='opacity-50 text-sm'>{timeDifference(post.singlePost?.createdAt)}</p>
                                    </div>

                                    <div className='p-2'>
                                        <div className='flex w-full items-center'>
                                            <BsEmojiSmile />
                                            <input className='commentInput border-none' type="text"
                                                onChange={(e) => setCommentContent(e.target.value)}
                                                value={commentContent}
                                                onKeyPress={(e) => {
                                                    if (e.key === "Enter") {
                                                        const data = {
                                                            postId,
                                                            jwt: token,
                                                            data: {
                                                                content: commentContent
                                                            }
                                                        };
                                                        dispatch(createCommentAction(data));
                                                        setCommentContent("");
                                                    }
                                                }}
                                                placeholder='Add a comment...' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default CommentModel;
