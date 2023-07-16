import { Table } from 'flowbite-react'
import React, { useContext } from 'react'
import noteContext from '../../context/notes/noteContext'
import { toast } from 'react-hot-toast';

const NotesTable = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    return (
        <>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                    {props.note.title}
                </Table.Cell>
                <Table.Cell>
                    {props.note.description}
                </Table.Cell>
                <Table.Cell>
                    {props.note.tag}
                </Table.Cell>
                <Table.Cell className='flex md:block'>
                    <i className="fa-solid fa-pen-to-square fa-xl md:mr-7 mr-3 cursor-pointer" onClick={() => {
                        props.updateNotes(props.note)
                    }}>
                    </i>
                    <i className="fa-solid fa-trash fa-xl md:ml-7 ml-3 cursor-pointer" onClick={() => {
                        deleteNote(props.note._id);
                        toast.success("Notes deleted successfully");
                    }}>
                    </i>
                </Table.Cell>
            </Table.Row>
        </>
    )
}

export default NotesTable