import { Button, FormControl, FormHelperText, FormLabel, Input, Stack, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editUserAction, getUserProfileAction } from '../../Redux/User/Action';
import { useFormik } from 'formik';
import ChangeProfilePhotoModel from './ChangeProfilePhotoModel';
import { uploadToCloudinary } from '../../Config/UploadToCloudinary';

const EditAccountDetails = () => {
    const { user } = useSelector((store) => store);
    const toast = useToast();
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [imageFile, setImageFile] = useState(null);
    const [initialValues, setInitialValues] = useState({
        name: "",
        username: "",
        email: "",
        bio: "",
        mobile: "",
        gender: "",
        website: "",
        private: false
    });



    useEffect(() => {
        console.log("reqUser", user.reqUser);
        const newValue = {};

        for (let item in initialValues) {
            if (user.reqUser && user.reqUser[item]) {
                newValue[item] = user.reqUser[item];
            }
        }

        console.log("new value", newValue);

        formik.setValues(newValue);
    }, [user.reqUser]);

    useEffect(() => {
        dispatch(getUserProfileAction(token));
    }, [token]);

    useEffect(() => {
        if (user.reqUser) {
            console.log("reqUser", user.reqUser);
            const newValue = { ...initialValues };

            for (let key in newValue) {
                if (user.reqUser[key]) {
                    newValue[key] = user.reqUser[key];
                }
            }

            console.log("new value", newValue);
            setInitialValues(newValue);
        }
    }, [user.reqUser]);

    const formik = useFormik({
        initialValues: {
            name: user.reqUser?.name || "",
            username: user.reqUser?.username || "",
            email: user.reqUser?.email || "",
            bio: user.reqUser?.bio || "",
            mobile: user.reqUser?.mobile || "",
            gender: user.reqUser?.gender || "",
            website: user.reqUser?.website || "",
            private: user.reqUser?.private || false,
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            const payload = {
                ...values,
                id: user.reqUser?.id,
                image: imageFile || user.reqUser?.image,
            };
            dispatch(editUserAction(payload));

            toast({
                title: "Account updated...",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        },
    });



    async function handleProfileImageChange(event) {
        const selectedFile = event.target.files[0]; 
        if (!selectedFile) return; 

        const image = await uploadToCloudinary(selectedFile);
        setImageFile(image);

        const payload = {
            id: user.reqUser?.id,
            image: image,
        };

        dispatch(editUserAction(payload));
        onClose();
    }


    return (
        <div className='border rounded-md p-10 lg:px-40'>
            <div className='flex pb-7'>
                <div className='w-[15%]'>
                    <img className='w-8 h-8 rounded-full'
                        src={
                            imageFile ||
                            user.reqUser?.image ||
                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                        } alt="" />
                </div>

                <div>
                    <p>{user.reqUser?.username}</p>
                    <p onClick={onOpen}
                        className='font-bold text-blue-800 cursor-pointer'
                    >Change Profile Photo</p>
                </div>
            </div>

            <form onSubmit={formik.handleSubmit} action="">
                <Stack spacing="6">
                    <FormControl className='flex' id='name'>
                        <FormLabel className='w-[15%]'>Name</FormLabel>
                        <div className='w-full'>
                            <Input placeholder='Name' className='w-full' type='text'
                                {...formik.getFieldProps("name")} />
                            <FormHelperText className='text-xs'>
                                Help people discover your account by using the name you're known by: either your full name, nickname, or business name.
                            </FormHelperText>
                            <FormHelperText className='text-xs'>
                                You can only change your name twice within 14 days.
                            </FormHelperText>
                        </div>
                    </FormControl>
                    <FormControl className='flex' id='username'>
                        <FormLabel className='w-[15%]'>username</FormLabel>
                        <div className='w-full'>
                            <Input placeholder='username' className='w-full' type='text'
                                {...formik.getFieldProps("username")} />
                            <FormHelperText className='text-xs'>
                                In most cases, you'll be able to change your username back to ashok. zarmiya for another 14 days. Learn more
                            </FormHelperText>
                        </div>
                    </FormControl>
                    <FormControl className='flex' id='website'>
                        <FormLabel className='w-[15%]'>Website</FormLabel>
                        <div className='w-full'>
                            <Input placeholder='Website'
                                className='w-full'
                                type='text'
                                {...formik.getFieldProps("website")} />
                            <FormHelperText className='text-xs'>
                                Editing your links is only available on mobile. visit the Instagram app and edit your profile to change the website in your bio.
                            </FormHelperText>
                        </div>
                    </FormControl>

                    <FormControl className='flex' id='bio'>
                        <FormLabel className='w-[15%]'>Bio</FormLabel>
                        <div className='w-full'>
                            <Input placeholder='Bio'
                                className='w-full'
                                type='text'
                                {...formik.getFieldProps("bio")} />
                            <FormHelperText className='text-xs'>
                                Editing your links is only available on mobile. visit the Instagram app and edit your profile to change the website in your bio.
                            </FormHelperText>
                        </div>
                    </FormControl>


                    <div className='py-10'>
                        <p className='font-bold text-sm '>Personal information</p>
                        <p className='text-xs'>
                            Provide your Personal information, even if the account is used for a business, a pet or something else. This won't be a part of your public profile.
                        </p>
                    </div>

                    <FormControl className='flex' id='email'>
                        <FormLabel className='w-[15%]'>Email address</FormLabel>
                        <div className='w-full'>
                            <Input placeholder='Email'
                                className='w-full'
                                type='email'
                                {...formik.getFieldProps("email")} />
                        </div>
                    </FormControl>

                    <FormControl className='flex' id='mobile'>
                        <FormLabel className='w-[15%]'>Phone number</FormLabel>
                        <div className='w-full'>
                            <Input placeholder='phone'
                                className='w-full'
                                type='tel'
                                {...formik.getFieldProps("mobile")} />
                        </div>
                    </FormControl>

                    <FormControl className='flex' id='gender'>
                        <FormLabel className='w-[15%]'>Gender</FormLabel>
                        <div className='w-full'>
                            <Input placeholder='Gender'
                                className='w-full'
                                type='text'
                                {...formik.getFieldProps("gender")} />
                        </div>
                    </FormControl>

                    <div>
                        <Button colorScheme='blue' type='submit' >submit</Button>
                    </div>
                </Stack>
            </form>

            <ChangeProfilePhotoModel
                handleProfileImageChange={handleProfileImageChange}
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen} />
        </div>
    )
}

export default EditAccountDetails