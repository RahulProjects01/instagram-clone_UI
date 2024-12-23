import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Singin from '../../Components/Register/Singin';
import Singup from '../../Components/Register/Singup';

const Auth = () => {
    const location = useLocation();

 

    return (
        <div>
            {location.pathname === "/login" ? <Singin /> : <Singup />}
        </div>
    );
};

export default Auth;
