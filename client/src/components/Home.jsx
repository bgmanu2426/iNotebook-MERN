import React from 'react'
import {
    Button,
    Label,
    TextInput,
    Textarea
} from "flowbite-react";

function Home() {
    return (
        <>
            <h1 className='text-2xl text-center font-black my-3'>Add Notes</h1>
            <form className="flex flex-col gap-4 w-1/2 m-auto">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="title" value="Enter title" />
                    </div>
                    <TextInput id="title" type="text" placeholder="Enter your title here" required={true} />
                </div>
                <div id="textarea">
                    <div className="mb-2 block">
                        <Label htmlFor="description" value="Enter description" />
                    </div>
                    <Textarea id="description" required={true} rows={4} />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="tag" value="Enter tag" />
                    </div>
                    <TextInput id="tag" type="text" required={true} />
                </div>
                <Button color="dark" type="submit">Submit</Button>
            </form>
        </>
    )
}

export default Home