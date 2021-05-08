import React, { useState } from 'react';

import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import "./style.css";

const Auth = ({ openModal }) => {
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [inputData, setInputData] = useState({username: "", email: "", password: "", confirmPassword: ""});

    const handleChange = (e) => {
        setInputData({...inputData, [e.target.name]: e.target.value});
    };

    const handleClick = (e) => {
        e.preventDefault();

        setIsSignup(prevState => !prevState);
    };

    return (
        <div className={`auth-form ${isSignup ? "active" : ""}`}>
            <LoginForm 
                inputData={inputData}
                handleChange={handleChange}
                openModal={openModal}
                handleClick={handleClick}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
            />
            <SignUpForm
                inputData={inputData}
                handleChange={handleChange}
                openModal={openModal}
                handleClick={handleClick}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
            />
        </div>
    );
};

export default Auth;
