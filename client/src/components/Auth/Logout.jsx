import React from 'react'
import { useNavigate } from 'react-router-dom';
import { auth, signOut } from "../Auth/Firebase";
import { toast } from "react-hot-toast";

const Logout = () => {
    const navigate = useNavigate();

    localStorage.removeItem('token');
    signOut(auth)
        .then(() => {
            toast.success("Loggout Successfull", {
                duration: 1500
            })
            navigate("/login")
        })
        .catch((error) => {
            console.log(error);
        });

    return (
        <>

        </>
    )
}

export default Logout