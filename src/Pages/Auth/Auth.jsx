import React from 'react'
import "./Auth.css";
import { useLocation} from 'react-router-dom';
import Singin from '../../Components/Register/Singin';
import Singup from '../../Components/Register/Singup';
const Auth = () => {

    const location = useLocation();

    return (
        <div>
            <div>
                {location.pathname === "/login" ? <Singin /> : <Singup />}
            </div>
        </div>
    )
}

export default Auth