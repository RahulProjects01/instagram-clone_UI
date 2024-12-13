import { AiFillCompass, AiFillHeart, AiFillMessage, AiOutlineCompass, AiOutlineHeart, AiOutlineHome, AiOutlineMessage, AiOutlinePlayCircle, AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { RiVideoFill, RiVideoLine } from "react-icons/ri";

export const mainu = [
    {
      title: "Home",
      icon: <AiOutlineHome className="text-2xl mr-5" />,
      activeIcon: <AiOutlineHome className="text-2xl mr-5" />
    },
    {
      title: "Search",
      icon: <AiOutlineSearch className="text-2xl mr-5" />,
      activeIcon: <AiOutlineSearch className="text-2xl mr-5" />
    },
    {
      title: "Explore",
      icon: <AiOutlineCompass className="text-2xl mr-5" />,
      activeIcon: <AiFillCompass className="text-2xl mr-5" />
    },
    {
      title: "Reels",
      icon: <RiVideoLine className="text-2xl mr-5" />,
      activeIcon: <RiVideoFill className="text-2xl mr-5" />
    },
    {
      title: "Message",
      icon: <AiOutlineMessage className="text-2xl mr-5" />,
      activeIcon: <AiFillMessage className="text-2xl mr-5" />
    },
    {
      title: "Notification",
      icon: <AiOutlineHeart className="text-2xl mr-5" />,
      activeIcon: <AiFillHeart className="text-2xl mr-5" />
    },
    {
      title: "Create",
      icon: <AiOutlinePlayCircle className="text-2xl mr-5" />,
      activeIcon: <AiOutlinePlayCircle className="text-2xl mr-5" />
    },
    {
      title: "Profile",
      icon: <CgProfile className="text-2xl mr-5" />,
      activeIcon: <CgProfile className="text-2xl mr-5" />
    }
  ];
  