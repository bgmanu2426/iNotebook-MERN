import React from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = (props) => {
    const navigate = useNavigate();
    navigate("/login")
    localStorage.removeItem('token');
    props.AlertInfo("success", "Loggedout Successfully")
    return (
        <>

        </>
    )
}

export default Logout