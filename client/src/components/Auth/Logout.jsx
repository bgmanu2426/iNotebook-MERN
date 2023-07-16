import React from 'react'
import { useNavigate } from 'react-router-dom';
import { auth, signOut } from "../Auth/Firebase";
import { toast } from "react-hot-toast";

const Logout = () => {
    const navigate = useNavigate();

    localStorage.removeItem('token');
    toast.success("Logout Successfull", {
        duration: 1500
    })
    setTimeout(() => {
        navigate("/login")
    }, 1600);

    signOut(auth)
        .then(() => {
            toast.success("Loggout Successfull", {
                duration: 1500
            })
        })
        .catch((error) => {
            console.log(error);
            toast.error("Error Loggingout", {
                duration: 1500
            })
        });

    return (
        <>

        </>
    )
}

export default Logout