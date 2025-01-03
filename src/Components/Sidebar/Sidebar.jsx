import React, { useState } from 'react'
import { IoReorderThreeOutline } from 'react-icons/io5'
import { mainu } from './SidebarConfig'
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react'
import CreatePostModel from '../../Components/Post/CreatePostModel'
import SearchComponents from '../SearchComponents/SearchComponents';
import { useSelector } from 'react-redux';

const Sidebar = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [activeTab, setActiveTab] = useState("");
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const navigate = useNavigate();
    const { user } = useSelector(store => store);

    const handleTabClick = (title) => {
        setActiveTab(title);
        if (title === "Profile") {
            navigate(`/${user.reqUser?.username}`);
        } else if (title === "Home") {
            navigate("/");
        } else if (title === "Create") {
            onOpen();
        }
        if (title === "Search") {
            setIsSearchVisible(true);
        } else {
            setIsSearchVisible(false);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user"); // Clear user details if stored
        window.location.href = "/login"; // Replace with your login route
      };
      
    return (
        <div className='sticky top-0 h-[100vh] flex'>
            <div className={`flex flex-col justify-between h-full ${activeTab === "Search" ? "px-2" : "px-10"}`}>
                {<div>
                    {activeTab !== "Search" && <div className='pt-10 '>
                        <img className='w-40' src="https://i.imgur.com/zqpwkLQ.png" alt="" />
                    </div>}

                    <div className="mt-10">
                        {mainu.map((item) => (
                            <div
                                key={item.title}
                                onClick={() => handleTabClick(item.title)}
                                className={`flex items-center mb-5 cursor-pointer text-lg ${activeTab === item.title ? "text-bold" : ""
                                    }`}
                            >
                                <div className="mr-3">
                                    {activeTab === item.title ? item.activeIcon : item.icon}
                                </div>
                                {activeTab !== "Search" && <p
                                    className={`${activeTab === item.title ? "font-bold" : "font-semibold"
                                        }`}
                                >
                                    {item.title}
                                </p>}
                            </div>
                        ))}
                    </div>

                </div>}
                <div className='flex items-center cursor-pointer pb-10'>
                    <IoReorderThreeOutline className='text-2xl ' />
                    {activeTab !== "Search" && <p className='ml-5 text-bold ' onClick={handleLogout}>Logout</p>}
                </div>
            </div>

            <CreatePostModel onClose={onClose} isOpen={isOpen} />
            {isSearchVisible && <SearchComponents />}
        </div>
    )
}

export default Sidebar