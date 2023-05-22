import { Table } from 'flowbite-react'
import React, { useContext } from 'react'
import noteContext from '../../context/notes/noteContext'

const NotesTable = () => {
    const context = useContext(noteContext);
    const { notes } = context;
    return (
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
                        <Table.Row key={note._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell>
                                {note.title}
                            </Table.Cell>
                            <Table.Cell>
                                {note.description}
                            </Table.Cell>
                            <Table.Cell>
                                {note.tag}
                            </Table.Cell>
                            <Table.Cell className='flex md:block'>
                                <a href="/tables">
                                    <i className="fa-solid fa-pen-to-square fa-xl md:mr-7 mr-3"></i>
                                </a>
                                <a href="/tables">
                                    <i className="fa-solid fa-trash fa-xl md:ml-7 ml-3"></i>
                                </a>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table></div>
    )
}

export default NotesTable