import Head from 'next/head'
import Link from 'next/link'
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { useState } from 'react';
import { getSession } from "next-auth/react"
import { useFormik } from 'formik';
import { registerValidate } from '../utils/validate';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import axios from 'axios';
import { HashLoader } from 'react-spinners';

export default function Register() {
    const [loading, setLoading] = useState(false)
    toast.error('hello')

    const [show, setShow] = useState({ password: false, cpassword: false })
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            cpassword: ''
        },
        validate: registerValidate,
        onSubmit
    })

    async function onSubmit(values) {
        setLoading(true)
        try {
            const res = await axios.post('https://nextjsfashx.vercel.app/', values)
            router.push('/login')
        } catch (err) {
            toast(err.response.data.error)
            console.log(err.response.data.error)
        }
        setLoading(false)
    }

    return (
        <>
            <Head>
                <title>Register</title>
            </Head>
            {
                loading && (
                    <div className='absolute top-0 bg-black opacity-50 right-0 h-full w-full flex items-center justify-center'>
                        <HashLoader
                            color='#088178'
                            className='z-10'
                        />
                    </div>
                )
            }
            <div className="flex w-[100vw] h-screen">
                <div className="m-auto bg-white rounded-md w-[90%] lg:w-3/5 h-4/5 grid lg:grid-cols-2 border border-slate-300">
                    <img className='w-[100%] h-[100%] object-cover' src="/assets/login.png" />
                    <div className="right flex flex-col justify-evenly w-full h-full">
                        <div className="text-center pt-10">
                            <section className='w-3/4 mx-auto flex flex-col gap-10'>
                                <div className="title">
                                    <h1 className='text-gray-800 text-4xl font-bold py-4'>Register</h1>
                                    <p className='w-[90%] lg:w-3/4 mx-auto text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
                                </div>

                                <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
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

                                    <div className="input-button">
                                        <button type='submit' className={"button"}>
                                            Sign Up
                                        </button>
                                    </div>
                                </form>

                                <p className='text-center text-gray-400 '>
                                    Already have an account? <Link href={'/login'} className='text-blue-700'>Sign In</Link>
                                </p>
                            </section>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export async function getServerSideProps({ req }) {
    const session = await getSession({ req })

    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: { session }
    }
}