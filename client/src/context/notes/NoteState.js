/* eslint-disable no-unused-vars */

import React, { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
    const InitialNotes = []

    const [notes, setNotes] = useState(InitialNotes);

    //Fetch a Note
    const getNotes = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST_URL}/api/notes/fetchallnotes`, {
                method: 'GET',
                headers: {
                    "auth-token": localStorage.getItem('token')
                }
            });
            const json = await response.json();
            setNotes(json);
        } catch (error) {
            console.log({ error, message: error.message });
        }
    }

    //Add a Note
    const addNotes = async (title, description, tag) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST_URL}/api/notes/createnotes`, {
                method: 'POST',
                headers: {
                    "auth-token": localStorage.getItem('token'),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, description, tag })
            });
            const json = response.json();
            setNotes(notes.concat(json));
        } catch (error) {
            console.log({ error, message: error.message });
        }
    }

    //Edit a Note
    const updateNote = async (id, title, description, tag) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST_URL}/api/notes/updatenote/${id}`, {
                method: 'PUT',
                headers: {
                    "auth-token": localStorage.getItem('token'),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, description, tag })
            });
            const json = response.json();
            // Logic to edit in client
            for (let index = 0; index < notes.length; index++) {
                const element = notes[index];
                if (element._id === id) {
                    notes[index].title = title;
                    notes[index].description = description;
                    notes[index].tag = tag;
                    break;
                }
            }
            setNotes(notes);
        } catch (error) {
            console.log({ error, message: error.message });
        }
    }

    //Delete a Note
    const deleteNote = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST_URL}/api/notes/deletenote/${id}`, {
                method: 'DELETE',
                headers: {
                    "auth-token": localStorage.getItem('token'),
                    "Content-Type": "application/json"
                }
            });
            const json = response.json();
            const delNotes = notes.filter((note) => { return note._id !== id });
            setNotes(delNotes)
        } catch (error) {
            console.log({ error, message: error.message });
        }
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, getNotes, addNotes, updateNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState