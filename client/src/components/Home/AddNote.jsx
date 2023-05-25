/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useState, useEffect } from 'react'
import {
    Button,
    Label,
    TextInput,
    Textarea
} from "flowbite-react";
import noteContext from '../../context/notes/noteContext'

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNotes, getNotes } = context;

    const [note, addNote] = useState({ title: "", description: "", tag: "" })
    const [fetchNotes, setFetchNotes] = useState(false);
    const handleOnClick = (e) => {
        e.preventDefault();
        addNotes(note.title, note.description, note.tag);
        setFetchNotes(true);
    }
    const onChange = (e) => {
        addNote({ ...note, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (fetchNotes) {
            getNotes()
            setFetchNotes(false);
        }
    }, [fetchNotes])


    return (
        <>
            <form className="flex flex-col gap-3 w-1/2 m-auto">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="title" value="Enter title" />
                    </div>
                    <TextInput id="title" type="text" name='title' placeholder="Enter your title here" required={true} onChange={onChange} />
                </div>
                <div id="description">
                    <div className="mb-2 block">
                        <Label htmlFor="description" value="Enter description" />
                    </div>
                    <Textarea id="description" name='description' required={true} rows={4} onChange={onChange} />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="tag" value="Enter tag" />
                    </div>
                    <TextInput id="tag" name='tag' type="text" required={true} onChange={onChange} />
                </div>
                <Button color="dark" className='md:w-full w-[30%] mx-auto' disabled={note.title.length < 3 || note.description.length < 7} type="submit" onClick={handleOnClick}>Submit</Button>
            </form>


        </>
    )
}

export default AddNote