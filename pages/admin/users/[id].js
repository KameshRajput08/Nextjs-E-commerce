import { useSession } from 'next-auth/react';
import React from 'react'
import { VscAccount } from 'react-icons/vsc';
import Layout from '../../../components/Layout'
import User from '../../../models/User';
import connectMongo from '../../../utils/conn';
import { useFormik } from "formik"
import { useRouter } from "next/router"
import { useState } from "react"
import { registerValidate } from "../../../utils/validate"
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { toast } from "react-toastify";
import axios from "axios";

const SingleUser = ({ user }) => {
    const { data: session } = useSession();
    const [show, setShow] = useState({ password: false, cpassword: false })
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            cpassword: '',
            isAdmin: false
        },
        validate: registerValidate,
        onSubmit
    })

    async function onSubmit(values) {
        try {
            const res = await axios.put(`/api/admin/users/${router.query.id}`, values)
            router.push('/admin/users')
        } catch (err) {
            toast.error(err.response.data.error)
        }
    }

    return (
        <Layout>
            <div className='flex flex-col lg:flex-row rounded-lg border border-gray-200 shadow-md px2 lg:px-10 py-8'>
                <div className='flex flex-col items-center gap-4 mx-2 lg:mx-auto px-4 lg:px-[100px] py-2 lg:py-8 my-2 lg:my-10 rounded-lg border border-gray-200 shadow-md'>
                    <div>
                        {session?.user.image ? <img src={session?.user.image} className="rounded-full w-[40px] h-[40px] lg:w-[100px] lg:h-[100px]" /> : <VscAccount size={100} />}
                    </div>
                    <div className="flex flex-col gap-5">
                        <span className='text-lg font-medium'><b>Email:</b> {user.email}</span>
                        <span className='text-lg font-medium'><b>Username:</b> {user.name}</span>
                        <span className='text-lg font-medium'><b>Admin:</b> {user.isAdmin ? 'True' : 'False'}</span>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 mx-auto px-10 my-10">
                    <h1 className="text-3xl font-semibold mb-7">Edit User</h1>
                    <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
                        <div className={`input_group ${formik.errors.name && formik.touched.name ? 'border-rose-600' : ''}`}>
                            <input
                                type="text"
                                name='Username'
                                placeholder='Username'
                                className={"input_text"}
                                {...formik.getFieldProps('name')}
                            />
                            <span className='icon flex items-center px-4'>
                                <HiOutlineUser size={25} />
                            </span>
                        </div>
                        {/* {formik.errors.name && formik.touched.name ? <span className='text-rose-500'>{formik.errors.name}</span> : <></>} */}
                        <div className={`input_group ${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''}`}>
                            <input
                                type="email"
                                name='email'
                                placeholder='Email'
                                className={"input_text"}
                                {...formik.getFieldProps('email')}
                            />
                            <span className='icon flex items-center px-4'>
                                <HiAtSymbol size={25} />
                            </span>
                        </div>
                        {/* {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span> : <></>} */}
                        <div className={`${"input_group"} ${formik.errors.password && formik.touched.password ? 'border-rose-600' : ''}`}>
                            <input
                                type={`${show.password ? "text" : "password"}`}
                                name='password'
                                placeholder='password'
                                className={"input_text"}
                                {...formik.getFieldProps('password')}
                            />
                            <span className='icon flex items-center px-4' onClick={() => setShow({ ...show, password: !show.password })}>
                                <HiFingerPrint size={25} />
                            </span>
                        </div>

                        <div className={`${"input_group"} ${formik.errors.cpassword && formik.touched.cpassword ? 'border-rose-600' : ''}`}>
                            <input
                                type={`${show.cpassword ? "text" : "password"}`}
                                name='cpassword'
                                placeholder='Confirm Password'
                                className={"input_text"}
                                {...formik.getFieldProps('cpassword')}
                            />
                            <span className='icon flex items-center px-4' onClick={() => setShow({ ...show, cpassword: !show.cpassword })}>
                                <HiFingerPrint size={25} />
                            </span>
                        </div>
                        <div className="flex items-center gap-5 my-4">
                            <input type="checkbox" name="isAdmin" {...formik.getFieldProps('isAdmin')} />
                            <label for="vehicle1">Make admin</label>
                        </div>
                        <button className="btn-x bg-[#088178] text-white">Edit</button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default SingleUser;

SingleUser.auth = { adminOnly: true }

export const getServerSideProps = async ({ params }) => {
    connectMongo().catch(err => console.log(err.message))
    console.log(params.id)

    const res = await User.findById(params.id)
    return {
        props: {
            user: JSON.parse(JSON.stringify(res))
        }
    }
}