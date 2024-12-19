import React, { useState } from 'react';

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
import { useDispatch } from 'react-redux';
import { createCommentAction } from '../../Redux/Comment/Action';
import { useParams } from 'react-router-dom';

const CommentModel = ({ onClose, isOpen, isPostLiked, isSaved, handleSavedPost, handlepostLike }) => {

    const [commentContent, setCommentContent] = useState();
    const dispatch = useDispatch();
    const token = localStorage.getItem("token")
    const { postId } = useParams();


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
                                    src="https://cdn.pixabay.com/photo/2023/11/04/07/40/cat-8364405_1280.jpg"
                                    alt="Cat"
                                />
                            </div>

                            <div className=" w-[55%] pl-10">
                                <div className='flex justify-between items-center py-5'>
                                    <div className='flex items-center'>
                                        <div>
                                            <img className='h-9 w-9 rounded-full' src="https://cdn.pixabay.com/photo/2023/01/30/11/04/cat-7755394_1280.jpg" alt="" />
                                        </div>

                                        <div className='ml-2'>
                                            <p>username</p>
                                        </div>
                                    </div>

                                    <BsThreeDots />
                                </div>
                                <hr />
                                <div className='comment'>
                                    {[1, 1, 1, 1, 1, 1].map((item) => <CommentCard />)}
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
                                        <p>10 likes</p>
                                        <p className='opacity-50 text-sm'>1 day ago</p>
                                    </div>

                                    <div className='p-2'>
                                        <div className='flex w-full items-center'>
                                            <BsEmojiSmile />
                                            <input className='commentInput border-none' type="text" onChange={(e) => setCommentContent(e.target.value)}
                                                onKeyPress={(e) => {
                                                    if (e.key === "Enter") {
                                                        const data = {
                                                            postId,
                                                            jwt: token,
                                                            data:{
                                                                content: commentContent
                                                            }
                                                        };
                                                        dispatch(createCommentAction(data));
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
