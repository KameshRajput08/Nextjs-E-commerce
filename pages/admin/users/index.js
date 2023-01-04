import React, { useEffect, useReducer, useState } from 'react'
import Layout from '../../../components/Layout'
import Link from 'next/link';
import { getError } from '../../../utils/error';
import axios from 'axios';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import User from '../../../models/User';
import connectMongo from '../../../utils/conn';


const UsersList = ({ users }) => {
    const [data, setData] = useState(users);

    const handleDelete = async (id) => {
        const res = await axios.delete(`/api/admin/users/${id}`);
        setData(res.data.users)
    };

    return (
        <Layout>
            {!data ? (
                <div>Loading...</div>
            ) : (
                <div className="mx-5">
                    <div className="flex items-center justify-between p-4">
                        <h3 className='font-semibold text-lg'>ADMIN/USERS({data.length})</h3>
                        <Link href="/admin/users/new"><button className='btn-x bg-[#088178] text-white'>ADD NEW</button></Link>
                    </div>
                    <div className='overflow-x-auto'>
                        {
                            data.length === 0 ? <div className='w-full h-[40vh] flex items-center justify-center'>No Users yet</div>
                                : <table className="min-w-full mb-10">
                                    <thead className="border-b">
                                        <tr className="">
                                            <th className="px-5 font-semibold text-left">ID</th>
                                            <th className="p-5 font-semibold text-left">NAME</th>
                                            <th className="p-5 font-semibold text-left">EMAIL</th>
                                            <th className="p-5 font-semibold text-left">ADMIN</th>
                                            <th className="p-5 font-semibold text-left">CREATED_AT</th>
                                            <th className="p-5 font-semibold text-left">ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((user) => (
                                            <tr key={user._id} className="border-b hover:bg-[#e8f6ea]">
                                                <td className=" p-5 ">{user._id}</td>
                                                <td className=" p-5 ">{user.name}</td>
                                                <td className=" p-5 ">{user.email}</td>
                                                <td className=" p-5 ">{user.isAdmin ? 'True' : 'False'}</td>
                                                <td className=" p-5 ">{user.createdAt}</td>
                                                <td className=" p-5 flex items-center gap-5 ">
                                                    <Link href={`/admin/users/${user._id}`} passHref>
                                                        <BiEdit color="blue" size={30} />
                                                    </Link>
                                                    <MdDelete color='red' onClick={() => handleDelete(user._id)} size={30} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                        }
                    </div>


                </div>
            )}
        </Layout>
    )
}

export default UsersList

UsersList.auth = { adminOnly: true }

export const getServerSideProps = async () => {
    connectMongo().catch(err => console.log(err.message))
    const res = await User.find();
    return {
        props: {
            users: JSON.parse(JSON.stringify(res))
        }
    }
}