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
                                <label for="profileImage" className='font-bold py-3 text-blue-600 cursor-pointer text-xs w-full'>Upload Photo</label>

                            </div>
                        </ModalBody>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </>
    )
}

export default ChangeProfilePhotoModel