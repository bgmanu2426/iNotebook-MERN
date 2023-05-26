import React from 'react'
import { Alert } from "flowbite-react";

const Alerts = (props) => {
    return (
        <>
            <Alert color="success" withBorderAccent={true}>
                <span>
                    <span className="font-medium">
                        {props.info}
                    </span>
                    {' '}{props.message}
                </span>
            </Alert>
        </>
    )
}

export default Alerts