import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'

const ChangeProfilePhotoModel = ({ isOpen, onOpen, onClose, handleProfileImageChange }) => {
    return (
        <>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader textAlign={"center"} >Modal Title</ModalHeader>

                        <ModalBody>
                            <div className='flex flex-col items-center'>
                                <label for="profileImage" className='font-bold py-3 text-blue-600 cursor-pointer text-center text-xs w-full'>Upload Photo</label>
                                <input type="file" onChange={handleProfileImageChange} id='profileImage' name='profileImage' />
                                <hr />

                                <p className='font-bold py-3 text-red-600 text-center'>Remove Photo</p>
                                <hr />
                                <p className='py-3 text-center' onClick={onClose}>Cancel</p>
                            </div>
                        </ModalBody>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </>
    )
}

export default ChangeProfilePhotoModel