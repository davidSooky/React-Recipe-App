import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { login, signup } from "../state/actions";

const Auth = ({ openModal }) => {
    const [inputData, setInputData] = useState({email: "", password: ""});
    const dispatch = useDispatch();
    const route = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        openModal(false);
        dispatch(login(route, inputData));
    }

    return (
       <form onSubmit={handleSubmit}>
            <input type="email" name="email" value={inputData.email} onChange={(e) => setInputData({...inputData, email: e.target.value})} />
            <input type="password" name="password" value={inputData.password} onChange={(e) => setInputData({...inputData, password: e.target.value})} />
            <input type="submit" value="Login" />
       </form>
    );
};

export default Auth;
