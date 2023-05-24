import React from 'react'
import AddNote from './AddNote';
import Alert from './Alerts';
import Expire from './Expire';

const Home = () => {
    const AlertProps = {
        info: "This is info",
        message: "And this is a message"
    }
    return (
        <>
            <Expire delay="5000"> <Alert info={AlertProps.info} message={AlertProps.message} /> </Expire>
            <h1 className='text-2xl text-center font-black my-2'>Add Notes</h1>
            <AddNote />
        </>
    )
}

export default Home