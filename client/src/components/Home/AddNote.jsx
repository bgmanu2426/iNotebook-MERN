/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useState, useEffect } from 'react'
import {
    Button,
    Label,
    TextInput,
    Textarea
} from "flowbite-react";
import noteContext from '../../context/notes/noteContext'

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNotes, getNotes } = context;

    const [note, addNote] = useState({ title: "", description: "", tag: "" })
    const [fetchNotes, setFetchNotes] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        addNotes(note.title, note.description, note.tag);
        setFetchNotes(true);
        addNote({ title: "", description: "", tag: "" })
        props.AlertInfo("success", "Note added successfully");
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-1/2 m-auto">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="title" value="Enter title" />
                    </div>
                    <TextInput
                        id="title"
                        type="text"
                        name='title'
                        placeholder="Enter your title here"
                        onChange={onChange}
                        minLength="3"
                        value={note.title}
                        required={true}
                    />
                </div>
                <div id="description">
                    <div className="mb-2 block">
                        <Label htmlFor="description" value="Enter description" />
                    </div>
                    <Textarea
                        id="description"
                        type="text"
                        name='description'
                        placeholder="Enter your description here"
                        required={true}
                        onChange={onChange}
                        minLength="7"
                        value={note.description}
                        rows={4}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="tag" value="Enter tag" />
                    </div>
                    <TextInput
                        id="tag"
                        name='tag'
                        placeholder='Enter your tag here'
                        type="text"
                        onChange={onChange}
                        value={note.tag}
                        required={true}
                    />
                </div>
                <Button
                    color="dark"
                    className='md:w-full w-[30%] mx-auto'
                    type="submit"
                    disabled={note.description.length < 7 || note.title.length < 3}
                >
                    Add Note
                </Button>
            </form>
        </>
    )
}

export default AddNote