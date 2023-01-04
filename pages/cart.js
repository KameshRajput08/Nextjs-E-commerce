import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import Layout from "../components/Layout";
import { CHANGE_QUANTITY, REMOVE_ITEM } from '../utils/redux/cartSlice';

const Cart = () => {
    const [total, setTotal] = useState()
    const dispatch = useDispatch()
    const router = useRouter()
    const cartItems = useSelector(state => state.cart.cartItems)
    const quanRef = useRef()

    const removeItem = (item) => {
        dispatch(REMOVE_ITEM(item))
    }

    useEffect(() => {
        const t = cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
        setTotal(t)
    }, [quanRef, removeItem])

    const handleQuantity = async (e, index, item) => {
        const res = await axios.get(`/api/product/${item._id}`)

        res.data.countInStock > 0 ? dispatch(CHANGE_QUANTITY({ index, value: e.target.value })) : toast.error('Product is out of Stock.')
    }

    return (
        <Layout title="cart" >
            <div className='py-10'>  <div className='text-center font-semibold text-4xl mb-8'>{`Cart(${cartItems.length})`}</div>
                <section className="py-[20px] px-1 md:px-[50px] lg:px-[80px]">
                    <table className='w-[100%] border-collapse table-fixed whitespace-nowrap'>
                        <thead className='border-2 border-[#e2e9e1] border-x-0'>
                            <tr>
                                <td>REMOVE</td>
                                <td>IMAGE</td>
                                <td>PRODUCT</td>
                                <td>PRICE</td>
                                <td>QUANTITY</td>
                                <td>SUBTOTAL</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cartItems.map((item, index) => {
                                    return <tr key={item._id} >
                                        <td className='td webkit'><Link href="#"><AiOutlineCloseCircle onClick={() => removeItem(item)} size={30} /></Link></td>
                                        <td className='td webkit'><img src={item.image} className='w-[70px]' alt="" /></td>
                                        <td className='td'>{`${item.brand} ${item.name}`}</td>
                                        <td className='td'>${item.price}</td>
                                        <td className='td'>
                                            <input
                                                type="number"
                                                className='quantity'
                                                defaultValue={item.quantity}
                                                min={1}
                                                ref={quanRef}
                                                max={item.countInStock}
                                                onChange={e => handleQuantity(e, index, item)} /></td>
                                        <td className='td'>${item.price}</td>
                                    </tr>
                                })
                            }

                        </tbody>
                    </table>
                    {
                        cartItems.length === 0 && <div className='w-full flex flex-col items-center justify-center gap-2 mt-10'>
                            <h3>No Items in Cart</h3>
                            <Link href="/shop"><button className="btn-x bg-[#088178] text-white">Go Shop now</button></Link> 
                        </div>
                    }

                </section>
                <div className='flex flex-col lg:flex-row px-[40px] lg:px-[80px]'>
                    <div className="w-full lg:w-1/2 mb-5 py-10">
                        <h3 className='pb-[2px]'>Apply Coupon</h3>
                        <div>
                            <input type="text" className='py-[8px] px-5 w-3/5 mr-3 outline-none border-2 border-[#e2e9e1]' placeholder="Apply your coupon" />
                            <button className="btn-x bg-[#088178] text-white mt-5 py-3 px-5">Apply</button>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 p-[30px] mt-[20px] lg:mt-[100px] border-2 border-[#e2e9e1]">
                        <h3 className='text-lg font-semibold mb-5'>Cart Total</h3>
                        <table className='w-[100%] mb-5 border-collapse gap-2'>
                            <tbody>
                                <tr>
                                    <td>Cart Subtotal</td>
                                    <td>${total}</td>
                                </tr>
                                <tr>
                                    <td>Shipping</td>
                                    <td>{total > 200 ? 'Free' : '$20'}</td>
                                </tr>
                                <tr>
                                    <td><strong>Cart Subtotal</strong></td>
                                    <td><strong>${total > 200 ? total : total + 20}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                        <button onClick={() => { total > 0 && router.push('/shipping') }} className="btn-x bg-[#088178] text-white">Proceed to Checkout</button>
                    </div>
                </div>
            </div>

        </Layout>

    )
}

export default Cart

Cart.auth = true