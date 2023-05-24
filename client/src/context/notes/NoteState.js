import React, { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
    const host = `http://localhost:5000`
    const InitialNotes = []

    const [notes, setNotes] = useState(InitialNotes);
    //Fetch a Note
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2MTAxZWI3M2M1YzVlNDdhMGU0MDlkIn0sImlhdCI6MTY4NDE1NDMwMn0.k0XUhx9RFAJtkxUXjJCkiejAKOpZMlHztr3BboRumQM"
            }
        });
        const json = await response.json();
        setNotes(json);
    }

    //Add a Note
    const addNotes = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/createnotes`, {
            method: 'POST',
            headers: {
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2MTAxZWI3M2M1YzVlNDdhMGU0MDlkIn0sImlhdCI6MTY4NDE1NDMwMn0.k0XUhx9RFAJtkxUXjJCkiejAKOpZMlHztr3BboRumQM",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();
        setNotes(notes.concat(json));
    }

    //Edit a Note
    const updateNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2MTAxZWI3M2M1YzVlNDdhMGU0MDlkIn0sImlhdCI6MTY4NDE1NDMwMn0.k0XUhx9RFAJtkxUXjJCkiejAKOpZMlHztr3BboRumQM",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
                break;
            }
        }
        console.log(json);
    }

    //Delete a Note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2MTAxZWI3M2M1YzVlNDdhMGU0MDlkIn0sImlhdCI6MTY4NDE1NDMwMn0.k0XUhx9RFAJtkxUXjJCkiejAKOpZMlHztr3BboRumQM",
                "Content-Type": "application/json"
            }
        });
        const json = response.json();
        console.log(json);
        const delNotes = notes.filter((note) => { return note._id !== id });
        setNotes(delNotes)
    }
    return (
        <NoteContext.Provider value={{ notes, setNotes, getNotes, addNotes, updateNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState