/* eslint-disable react-hooks/exhaustive-deps */

import AddNote from './AddNote';
import NotesTable from './NotesTable';
import { Table } from 'flowbite-react'
import React, { useContext, useState, useRef, useEffect } from 'react'
import { Modal, Button, Label, TextInput } from "flowbite-react";
import noteContext from '../../context/notes/noteContext'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Home = () => {
    const navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNotes, updateNote } = context;

    const [visible, setVisible] = useState(false);
    
    const handleModalOpen = () => {
        setVisible(true);
    }
    const handleModalClose = () => {
        setVisible(false);
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
        } else {
            navigate('/login');
        }
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", editTitle: "", editDescription: "", editTag: "" })

    const updateNotes = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, editTitle: currentNote.title, editDescription: currentNote.description, editTag: currentNote.tag })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        refClose.current.click();
        updateNote(note.id, note.editTitle, note.editDescription, note.editTag);
        toast.success("Note updated successfully", {
            duration: 1500
        })
    }
    return (
        <>
            {/* Edit Modal  */}
            <React.Fragment>
                <Button className='hidden' onClick={handleModalOpen} ref={ref}>
                    Toggle modal
                </Button>
                <Modal show={visible} onClose={() => setVisible(false)} size="md" popup={true}>
                    <Modal.Header />
                    <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                        <h3 className="text-xl text-gray-900 dark:text-white text-center font-bold">Update Note</h3>
                        <hr />
                        <form onSubmit={handleSubmit} className="flex flex-col">
                            <Modal.Body className='space-y-5'>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="editTitle" value="Enter title" />
                                    </div>
                                    <TextInput
                                        type='text'
                                        id="editTitle"
                                        name="editTitle"
                                        value={note.editTitle}
                                        autoComplete='title'
                                        onChange={(e) => {
                                            setNote({ ...note, editTitle: e.target.value })
                                        }}
                                        minLength={3}
                                        required
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="editDescription" value="Enter description" />
                                    </div>
                                    <TextInput
                                        id="editDescription"
                                        name="editDescription"
                                        type="text"
                                        value={note.editDescription}
                                        autoComplete='description'
                                        onChange={(e) => {
                                            setNote({ ...note, editDescription: e.target.value })
                                        }}
                                        minLength={7}
                                        required
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="editTag" value="Enter tag" />
                                    </div>
                                    <TextInput
                                        id="editTag"
                                        name="editTag"
                                        type="text"
                                        value={note.editTag}
                                        autoComplete='tag'
                                        onChange={(e) => {
                                            setNote({ ...note, editTag: e.target.value })
                                        }}
                                        required
                                    />
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button type='submit'>Update Note</Button>
                                <Button ref={refClose} onClick={handleModalClose}>Close</Button>
                            </Modal.Footer>
                        </form>
                    </div>
                </Modal>
            </React.Fragment>

            <h1 className='text-2xl text-center font-black mt-2'>Add Notes</h1>
            <AddNote />

            {/* Notes Table */}
            <h2 className='text-2xl text-center font-black mt-6'>Your notes</h2>
            <div className='md:w-10/12 md:m-auto my-3'>
                <Table>
                    <Table.Head>
                        <Table.HeadCell className='text-black text-base'>
                            Title
                        </Table.HeadCell>
                        <Table.HeadCell className='text-black text-base'>
                            Description
                        </Table.HeadCell>
                        <Table.HeadCell className='text-black text-base'>
                            Tag
                        </Table.HeadCell>
                        <Table.HeadCell className='w-40'>
                            <span className="sr-only">
                                Edit
                            </span>
                            <span className="sr-only">
                                Delete
                            </span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y text-black">

                        <Table.Row className='text-xl absolute left-[42%] font-bold my-5'>
                            <Table.Cell>
                                {notes.length === 0 && "No Notes to Display"}
                            </Table.Cell>
                        </Table.Row>

                        {notes.map((note) => (
                            <NotesTable key={note._id} note={note} updateNotes={updateNotes} />
                        ))}

                    </Table.Body>
                </Table>
            </div>
        </>
    )
}

export default Home