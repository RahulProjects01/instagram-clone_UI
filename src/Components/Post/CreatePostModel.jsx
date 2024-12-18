import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Button,
} from '@chakra-ui/react';
import { FaPhotoVideo } from 'react-icons/fa';
import "./CreatePostModel.css";
import { GrEmoji } from 'react-icons/gr';
import { GoLocation } from 'react-icons/go';
import { useDispatch } from 'react-redux';
import { createPostAction } from '../../Redux/Post/Action';
import { uploadToCloudinary } from '../../Config/UploadToCloudinary';


const CreatePostModel = ({ isOpen, onClose }) => {
    const [dragOver, setIsDragOver] = useState(false);
    const [file, setFile] = useState();
    const [caption, setCaption] = useState("");
    const dispatch = useDispatch();
    const [imageUrl, setImageUrl] = useState("");
    const [location, setLocation] = useState("");
    const token = localStorage.getItem("token");

    const handleDragover = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
        setIsDragOver(true);
    }

    const handleDragLeave = () => {
        setIsDragOver(false);
    }

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragOver(false); // Reset drag state
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile.type.startsWith("image/") || droppedFile.type.startsWith("video/")) {
            setFile(droppedFile);
        } else {
            alert("Please drop an image or video file.");
        }
    };


    const handleOnChaange = async (e) => {
        const file = e.target.files[0];
        if (file && (file.type.startsWith("image/") || file.type.startsWith("video/"))) {
            try {
                const imgUrl = await uploadToCloudinary(file);
                setImageUrl(imgUrl);
                setFile(file);
                console.log("File uploaded successfully:", imgUrl);
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        } else {
            setFile(null);
            alert("Please select an image or video");
        }
    };


    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
    }
    const handleCreatePost = () => {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
    
        if (!token) {
            console.error("JWT token is missing.");
            alert("You are not logged in. Please log in to create a post.");
            return;
        }
    
        const data = {
            jwt: token, // Pass the JWT token
            data: {
                caption, 
                location, 
                image: imageUrl, // Ensure this is the Cloudinary URL
            }
        };
    
        console.log("Sending data to create post:", data);
    
        dispatch(createPostAction(data)); // Pass the data to the action
        onClose();
    };
    


    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose} size='4xl' isCentered>
                <ModalOverlay>
                    <ModalContent>
                        <div className='flex justify-between py-1 px-10 items-center'>
                            <p>Create new post</p>
                            <Button variant='ghost' size='sm' onClick={handleCreatePost} colorScheme='blue'>Shere</Button>
                        </div>
                        <hr />

                        <ModalBody>
                            <div className='h-[70vh] justify-between pb-5 flex '>
                                <div className='w-[50%]'>
                                    {!file && <div onDrop={handleDrop} onDragOver={handleDragover}
                                        onDragLeave={handleDragLeave} className='drag-drop h-full'>
                                        <div>
                                            <FaPhotoVideo className='text-3xl' />
                                            <p>Drag Photos or videos here</p>
                                        </div>
                                        <label className='custom-file-uploded' htmlFor="file-upload">Select from computer</label>
                                        <input className='fileInput' type="file" id='file-upload' accept='image/*, video/*' onChange={handleOnChaange} />
                                    </div>}

                                    {file && <img className='max-h-full' src={URL.createObjectURL(file)} alt="" />}
                                </div>

                                <div className='w-[1px] border h-full'></div>

                                <div className='w-[50%]'>
                                    <div className='flex items-center px-2'>
                                        <img className='w-7 h-7 rounded-full' src="https://cdn.pixabay.com/photo/2016/11/02/11/08/monk-1791113_640.jpg" alt="" />
                                        <p className='font-semibold ml-4'>username</p>
                                    </div>

                                    <div className='px-2'>
                                        <textarea className='captionInput' placeholder='Write a caption' name="caption" cols="30" rows="8" id="" onChange={handleCaptionChange}></textarea>
                                    </div>

                                    <div className='flex justify-between px-2'>
                                        <GrEmoji />
                                        <p className='opacity-70'>{caption?.length} /2,200</p>
                                    </div>
                                    <hr />

                                    <div className='p-2 flex justify-between items-center'>
                                        <input className='locationInput' onChange={(e) => setLocation(e.target.value)} type="text" placeholder='location' name="location" id="" />
                                        <GoLocation />
                                    </div>

                                    <hr />
                                </div>
                            </div>
                        </ModalBody>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </div>
    )
}

export default CreatePostModel