import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from 'react';
import { getSession, signIn } from "next-auth/react"
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import login_validate from '../utils/validate';
import { toast } from 'react-toastify';
import { getError } from '../utils/error';

export default function Login() {
    const [show, setShow] = useState(false)
    const router = useRouter()
    // formik hook
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate: login_validate,
        onSubmit
    })

    async function onSubmit(values) {
        try {
            const status = await signIn('credentials', {
                redirect: true,
                email: values.email,
                password: values.password,
                callbackUrl: "https://nextjsfashx.vercel.app/"
            })
            toast.success('logged IN')
            status.ok ? router.push(status.callbackUrl) :  toast.error(status.err)
        } catch (err) {
            toast.error(getError(err))
        }
    }

    // Google Handler function
    async function handleGoogleSignin() {
        try {
            await signIn('google', { callbackUrl: "https://nextjsfashx.vercel.app" })
        } catch (err) {
            toast.error(getError(err))
        }
    }

    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <div className="flex w-[100vw] h-screen bg-slate-50">
                <div className="m-auto bg-white rounded-md w-[90%] lg:w-3/5 h-4/5 grid lg:grid-cols-2 border border-slate-300">
                    <img className='hidden lg:inline-block w-full h-[98.2%] object-cover' src="/assets/register.avif" />
                    <div className="right flex flex-col justify-evenly">
                        <div className="text-center pt-10">
                            <section className='w-[90%] lg:w-3/4 mx-auto flex flex-col gap-10'>
                                <div className="title">
                                    <h1 className='text-gray-800 text-4xl font-bold py-4'>Explore</h1>
                                    <p className='w-3/4 mx-auto text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
                                </div>

                                <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
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

                                    <div className={`input_group ${formik.errors.password && formik.touched.password ? 'border-rose-600' : ''}`}>
                                        <input
                                            type={`${show ? "text" : "password"}`}
                                            name='password'
                                            placeholder='password'
                                            className={"input_text"}
                                            {...formik.getFieldProps('password')}
                                        />
                                        <span className='icon flex items-center px-4' onClick={() => setShow(!show)}>
                                            <HiFingerPrint size={25} />
                                        </span>

                                    </div>

                                    <div className="input-button">
                                        <button type='submit' className={"button"}>
                                            Login
                                        </button>
                                    </div>
                                    <div className="input-button">
                                        <button type='button' onClick={handleGoogleSignin} className={"button_custom"}>
                                            Sign In with Google <Image src={'/assets/google.svg'} width="20" height={20} ></Image>
                                        </button>
                                    </div>
                                </form>
                                <p className='text-center text-gray-400 '>
                                    don&apos;t have an account yet? <Link href={'/register'} className='text-blue-700'>Sign Up</Link>
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