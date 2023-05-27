import React from 'react'
import AuthContext from './authContext'
import { useNavigate } from "react-router-dom";

const AuthState = (props) => {

    let navigate = useNavigate();

    const loginUser = async (email, password) => {
        const response = await fetch(`${process.env.REACT_APP_HOST_URL}/api/user/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem("token", json.authToken);
            navigate("/");
            props.AlertInfo("success", "Loggedin successfully");
        } else {
            props.AlertInfo("failure", "Invalid Credentials");
        }
    }

    const signupUser = async (name, email, password) => {
        const response = await fetch(`${process.env.REACT_APP_HOST_URL}/api/user/createuser`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        if (json.success) {
            props.AlertInfo("success", "Account Created Successfully");
            localStorage.setItem("token", json.authToken);
            navigate("/");
        }
    }

    return (
        <>
            <AuthContext.Provider value={{ loginUser, signupUser }}>
                {props.children}
            </AuthContext.Provider>
        </>
    )
}

export default AuthState