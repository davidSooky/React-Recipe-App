import React from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Barbecue from "./Barbecue";
import { login } from "../../state/actions";

const LoginForm = ({ inputData, handleChange, openModal, handleClick, showPassword, setShowPassword }) => {
    const dispatch = useDispatch();
    const route = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(login(route, openModal, inputData));
    }

    return (
        <div className="form-container login">
            <form className="form form-login" onSubmit={handleSubmit}>
                <h2 className="input-field-header">Welcome back</h2>
                <div className="input-field">
                    <input type="email" id="email-login" name="email" required placeholder="Email"value={inputData.email} onChange={handleChange} />
                    <span></span>
                    <label htmlFor="email-login"><i className="fas fa-envelope"></i></label>
                </div>
                <div className="input-field">
                    <input type={showPassword ? "text" : "password"} id="password-login" name="password" required placeholder="Password" value={inputData.password} onChange={handleChange} />
                    <span></span>
                    <label htmlFor="password-login"><i className="fas fa-lock"></i></label>
                    <i className="far fa-eye-slash" onClick={() => setShowPassword(!showPassword)}></i>
                </div>
                <input type="submit" value="Login" className="btn btn-login" />
                <p>Does not have an account ? Create one</p>
                <button className="auth-button" onClick={handleClick}>Sign up</button>
            </form>
            <div className="form-image">
                <Barbecue />
            </div>
        </div>
    );
};

export default LoginForm;