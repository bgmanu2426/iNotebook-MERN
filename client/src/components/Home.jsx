import React from 'react'
import {
    Button,
    Label,
    TextInput,
    Textarea
} from "flowbite-react";
import NotesTable from './NotesTable';

const Home = () => {
    return (
        <>
            <h1 className='text-2xl text-center font-black my-2'>Add Notes</h1>
            <form className="flex flex-col gap-3 w-1/2 m-auto">
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

            <h2 className='text-2xl text-center font-black mt-6'>Your notes</h2>
            <NotesTable />
        </>
    )
}

export default Home