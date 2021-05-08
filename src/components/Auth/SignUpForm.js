import React from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Cooking from "./Cooking";
import { signup } from "../../state/actions";

const SignUpForm = ({ inputData, handleChange, openModal, handleClick, showPassword, setShowPassword }) => {
    const dispatch = useDispatch();
    const route = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(signup(route, openModal, inputData));
    }

    return (
        <div className="form-container signup">
            <form className="form form-signup" onSubmit={handleSubmit}>
                <h2 className="input-field-header">New here ? Create an account</h2>
                <div className="input-field">
                    <input type="text" id="username-signup" name="username" required placeholder="Username"value={inputData.username} onChange={handleChange} />
                    <span></span>
                    <label htmlFor="username-signup"><i className="fas fa-user"></i></label>
                </div>
                <div className="input-field">
                    <input type="email" id="email-signup" name="email" required placeholder="Email"value={inputData.email} onChange={handleChange} />
                    <span></span>
                    <label htmlFor="email-signup"><i className="fas fa-envelope"></i></label>
                </div>
                <div className="input-field">
                    <input type={showPassword ? "text" : "password"} id="password-signup" name="password" required placeholder="Password" value={inputData.password} onChange={handleChange} />
                    <span></span>
                    <label htmlFor="password-signup"><i className="fas fa-lock"></i></label>
                    <i className="far fa-eye-slash" onClick={() => setShowPassword(!showPassword)}></i>
                </div>
                <div className="input-field">
                    <input type={showPassword ? "text" : "password"} id="passwordConfirm-signup" name="confirmPassword" required placeholder="Confirm password" value={inputData.confirmPassword} onChange={handleChange} />
                    <span></span>
                    <label htmlFor="passwordConfirm-signup"><i className="fas fa-lock"></i></label>
                    <i className="far fa-eye-slash" onClick={() => setShowPassword(!showPassword)}></i>
                </div>
                <input type="submit" value="Signup" className="btn btn-login" />
                <p>Already have an account ? Log in</p>
                <button className="auth-button" onClick={handleClick}>Login</button>
            </form>
            <div className="form-image">
                <Cooking />
            </div>
        </div>
    );
};

export default SignUpForm;