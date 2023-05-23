import React, { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
    const host = `http://localhost:5000`
    const InitialNotes = [
        {
            "_id": "64687742c160f667a310ca24",
            "user": "646101eb73c5c5e47a0e409d",
            "title": "test",
            "description": "This is a test title",
            "tag": "testing",
            "date": "2023-05-20T07:31:14.237Z",
            "__v": 0
        },
        {
            "_id": "6468f13942a1ec34ba3d5562",
            "user": "646101eb73c5c5e47a0e409d",
            "title": "code",
            "description": "you have to code tommorow",
            "tag": "coding",
            "date": "2023-05-20T16:11:37.365Z",
            "__v": 0
        },
        {
            "_id": "6468f15342a1ec34ba3d5565",
            "user": "646101eb73c5c5e47a0e409d",
            "title": "mabu",
            "description": "kilo ni mai lorem",
            "tag": "thisva",
            "date": "2023-05-20T16:12:03.686Z",
            "__v": 0
        }
    ]

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
            body: JSON.stringify({title, description, tag})
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
            body: JSON.stringify({title, description, tag})
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
    }

    //Delete a Note
    const deleteNote = (id) => {
        console.log(id);
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