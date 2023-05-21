import React from 'react'

const Alert = (props) => {
    return (
        <>
            <Alert color="success">
                <span>
                    <span className="font-medium">
                        {props.alert}
                    </span>
                    {' '}{props.message}
                </span>
            </Alert>
        </>
    )
}

export default Alert