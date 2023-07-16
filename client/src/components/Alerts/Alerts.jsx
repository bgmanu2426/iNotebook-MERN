import React from 'react'
import { Alert } from "flowbite-react";

const Alerts = (props) => {
    return (
        <>
            <div className='absolute left-[44%]'>
                {props.alert && <Alert color={props.alert.type} withBorderAccent={true} className='py-2'>
                    <span>
                        {
                            props.alert.type === "success"
                                ?
                                <span className="flex h-fit items-center gap-3 font-semibold text-cyan-800 dark:text-cyan-800 rounded-full p-1.5 text-xs" data-testid="flowbite-badge">
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" className="w-5 h-5" data-testid="flowbite-badge-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                    {props.alert.msg}
                                </span>
                                :
                                <span>
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" className="mr-3 inline h-5 w-5 flex-shrink-0" data-testid="flowbite-alert-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                                    </svg>
                                    {props.alert.msg}
                                </span>
                        }
                    </span>
                </Alert>}
            </div>
        </>
    )
}

export default Alerts