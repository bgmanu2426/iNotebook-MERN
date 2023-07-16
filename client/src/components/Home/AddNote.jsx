/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useState, useEffect } from 'react'
import {
    Button,
    Label,
    TextInput,
    Textarea
} from "flowbite-react";
import noteContext from '../../context/notes/noteContext'
import { toast } from 'react-hot-toast'

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNotes, getNotes } = context;

    const [note, setNote] = useState({
        title: "",
        description: "",
        tag: ""
    })
    const [fetchNotes, setFetchNotes] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        addNotes(note.title, note.description, note.tag);
        setFetchNotes(true);
        setNote({
            title: "",
            description: "",
            tag: ""
        })
        toast.success("Note added successfully", {
            duration: 1500
        })
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
                        placeholder="Enter note title"
                        minLength="3"
                        value={note.title}
                        autoComplete='title'
                        onChange={(e) => {
                            setNote({ ...note, title: e.target.value })
                        }}
                        required
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
                        placeholder="Enter notes description"
                        required
                        autoComplete='description'
                        minLength="7"
                        value={note.description}
                        rows={4}
                        onChange={(e) => {
                            setNote({ ...note, description: e.target.value })
                        }}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="tag" value="Enter tag" />
                    </div>
                    <TextInput
                        id="tag"
                        name='tag'
                        placeholder='Enter notes tag'
                        type="text"
                        value={note.tag}
                        autoComplete='tag'
                        onChange={(e) => {
                            setNote({ ...note, tag: e.target.value })
                        }}
                        required
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