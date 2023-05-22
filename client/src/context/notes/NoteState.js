import React, { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
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
    //Add a Note
    const addNotes = (title, description, tag) => {
        const note = {
            "_id": "6468f15342a1ec34ba3d5565",
            "user": "646101eb73c5c5e47a0e409d",
            "title": "title",
            "description": "desc",
            "tag": "tag",
            "date": "2023-05-20T16:12:03.686Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }

    //Edit a Note
    const updateNote = () => {

    }

    //Delete a Note
    const deleteNote = () => {

    }
    return (
        <NoteContext.Provider value={{ notes, setNotes, addNotes, updateNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState