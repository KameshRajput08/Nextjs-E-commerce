import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutWizard from '../components/CheckoutWizard'
import Layout from '../components/Layout'
import { SET_STATE } from '../utils/redux/cartSlice'
import { shippingValidate } from '../utils/validate'

const Shipping = () => {
    const router = useRouter()
    const dispatch = useDispatch();

    const shippingData = useSelector(state => state.cart.shippingAddress)
    const formik = useFormik({
        initialValues: {
            fullName: shippingData.fullName,
            address: shippingData.address,
            city: shippingData.city,
            postalCode: shippingData.postalCode,
            country: shippingData.country
        },
        validate: shippingValidate,
        onSubmit
    })

    async function onSubmit(values) {
        try {
            dispatch(SET_STATE({ type: 'shippingAdd', data: values }))
            router.push('/payment')
            router
        } catch (err) {
            toast.error(getError(err))
        }
    }
    return (
        <Layout title="Shipping Address">
            <CheckoutWizard className="" activeStep={1} />
            <form className='flex flex-col gap-4 mx-auto max-w-screen-md my-8 ' onSubmit={formik.handleSubmit}>
                <h1 className="mb-4 text-3xl font-semibold">Shipping Address</h1>
                <div className='mb-3'>
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        className={`shippingInput ${formik.errors.fullName && formik.touched.fullName ? 'border-rose-600' : ''}`}
                        id="fullName"
                        {...formik.getFieldProps('fullName')}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor="fullName">Address</label>
                    <input
                        className={`shippingInput ${formik.errors.address ? 'border-rose-600' : ''}`}
                        id="fullName"
                        {...formik.getFieldProps('address')}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor="fullName">City</label>
                    <input
                        className={`shippingInput ${formik.errors.city ? 'border-rose-600' : ''}`}
                        id="city"
                        {...formik.getFieldProps('city')}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor="fullName">Postal Code</label>
                    <input
                        className={`shippingInput ${formik.errors.postalCode ? 'border-rose-600' : ''}`}
                        id="postalCode"
                        {...formik.getFieldProps('postalCode')}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor="fullName">Country</label>
                    <input
                        className={`shippingInput ${formik.errors.country ? 'border-rose-600' : ''}`}
                        id="country"
                        {...formik.getFieldProps('country')}
                    />
                </div>
                <button type='submit' className={"btn-x self-start flex items-center bg-[#088178] text-white text-base px-4 py-2"}>
                    Next <BsArrowRight size={25} className="ml-1" />
                </button>
            </form>
        </Layout>
    )
}

export default Shipping

Shipping.auth = true

