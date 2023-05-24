import React, { useContext, useState, useRef } from 'react'
import {
    Button,
    Label,
    TextInput,
    Textarea,
    Modal
} from "flowbite-react";
import noteContext from '../../context/notes/noteContext'
import NotesTable from './NotesTable';

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNotes } = context;

    const [note, addNote] = useState({ title: "", description: "", tag: "" })
    const handleOnClick = (e) => {
        e.preventDefault();
        addNotes(note.title[0], note.description[0], note.tag[0]);
    }
    const onChange = (e) => {
        addNote({ ...note, [e.target.name]: [e.target.value] })
    }

    const [visible, setVisible] = useState(false);
    const handleModalOpen = () => {
        setVisible(true);
    }

    const ref = useRef(null);
    const updateNote = (currentNote) => {
        ref.current.click();
        addNote(currentNote);
    }

    return (
        <>
            <React.Fragment>
                <Button className='hidden' onClick={handleModalOpen} ref={ref}>
                    Toggle modal
                </Button>
                <Modal show={visible} onClose={() => setVisible(false)} size="md" popup={true}>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                            <h3 className="text-xl text-gray-900 dark:text-white text-center font-bold">Update Note</h3>
                            <hr />
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="etitle" value="Enter title" />
                                </div>
                                <TextInput type='text' id="etitle" name="etitle" required={true} />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="edescription" value="Enter description" />
                                </div>
                                <TextInput id="edescription" name="edescription" type="text" required={true} />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="etag" value="Enter tag" />
                                </div>
                                <TextInput id="etag" name="etag" type="text" required={true} />
                            </div>
                            <div className="w-full">
                                <Button>Update Note</Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </React.Fragment>

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
                <Button color="dark" className='md:w-full w-[30%] mx-auto' type="submit" onClick={handleOnClick}>Submit</Button>
            </form>

            <NotesTable updateNote={updateNote} />
        </>
    )
}

export default AddNote