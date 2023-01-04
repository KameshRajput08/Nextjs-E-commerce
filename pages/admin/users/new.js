import { useFormik } from "formik"
import { useRouter } from "next/router"
import { useState } from "react"
import { registerValidate } from "../../../utils/validate"
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import Layout from "../../../components/Layout";
import { toast } from "react-toastify";
import axios from "axios";

export default function NewUser() {
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
            const res = await axios.post('/api/admin/users', values)
            router.push('/admin/users')
        } catch (err) {
            toast.error(err.response.data.error)
        }
    }

    return (
        <Layout>
            <div className="w-full lg:w-1/2 mx-auto px-10 my-10">
                <h1 className="text-3xl font-semibold mb-7">New User</h1>
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
                    <button className="btn-x bg-[#088178] text-white">Create</button>
                </form>
            </div>
        </Layout>

    );
}

NewUser.auth = { adminOnly: true }