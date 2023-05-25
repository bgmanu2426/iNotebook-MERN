/* eslint-disable react-hooks/exhaustive-deps */

import AddNote from './AddNote';
import Alert from './Alerts';
import Expire from './Expire';
import NotesTable from './NotesTable';
import { Table } from 'flowbite-react'
import React, { useContext, useState, useRef, useEffect } from 'react'
import { Modal, Button, Label, TextInput } from "flowbite-react";
import noteContext from '../../context/notes/noteContext'
import { ModalFooter } from 'flowbite-react/lib/esm/components/Modal/ModalFooter';

const Home = () => {
    const AlertProps = {
        info: "This is info",
        message: "And this is a message"
    }

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
        if (!visible) {
            getNotes()
        }
    }, [visible])

    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const updateNotes = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const handleClick = () => {
        refClose.current.click();
        updateNote(note.id, note.etitle, note.edescription, note.etag);
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
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
                        <form className="flex flex-col">
                            <Modal.Body className='space-y-5'>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="etitle" value="Enter title" />
                                    </div>
                                    <TextInput type='text' id="etitle" name="etitle" value={note.etitle} onChange={onChange} required={true} />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="edescription" value="Enter description" />
                                    </div>
                                    <TextInput id="edescription" name="edescription" type="text" value={note.edescription} onChange={onChange} required={true} />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="etag" value="Enter tag" />
                                    </div>
                                    <TextInput id="etag" name="etag" type="text" value={note.etag} onChange={onChange} required={true} />
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={handleClick} disabled={note.etitle.length < 3 || note.edescription.length < 7}>Update Note</Button>
                                <Button ref={refClose} onClick={handleModalClose}>Close</Button>
                            </Modal.Footer>
                        </form>
                    </div>
                </Modal>
            </React.Fragment>

            <Expire delay="1000"> <Alert info={AlertProps.info} message={AlertProps.message} /> </Expire>
            <h1 className='text-2xl text-center font-black my-2'>Add Notes</h1>
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