import React from 'react'
import { useNavigate } from 'react-router-dom';
import { auth, signOut } from "../Auth/Firebase";

const Logout = (props) => {
    const navigate = useNavigate();
    navigate("/login")
    localStorage.removeItem('token');
    props.AlertInfo("success", "Loggedout Successfully")

    signOut(auth).then(() => {
        // Sign-out successful.
        props.AlertInfo("success", "Loggedout Successfully")
    }).catch((error) => {
        // An error happened.
        console.log(error);
    });
    
    return (
        <>

        </>
    )
}

export default Logout