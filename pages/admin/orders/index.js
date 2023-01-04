import React, { useState } from 'react'
import Layout from '../../../components/Layout'
import Link from 'next/link';
import axios from 'axios';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import connectMongo from '../../../utils/conn';
import Order from "../../../models/Order.js";
import { BsPaypal } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';


const OrdersList = ({ orders }) => {
    const router = useRouter()
    const [data, setData] = useState(orders);

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`/api/admin/orders/${id}/delete`);
            setData(res.data.orders)
            toast.error(res.data.message)
        } catch (err) {
            toast.error(err)
        }
    };

    const handleDelivery = async (id) => {
        try {
            await axios.put(`/api/admin/orders/${id}/deliver`)
            router.push(`/orders/${id}`)
        } catch (err) {
            toast.error(err)
        }
    }
    return (
        <Layout>
            {!data ? (
                <div>Loading...</div>
            ) : (
                <div className="mx-2 lg:mx-5">
                    <h3 className='font-semibold text-lg p-5'>ADMIN/ORDERS({data.length})</h3>
                    {<div className='overflow-x-auto'>
                        {
                            data.length === 0 ? <div className='w-full h-[40vh] flex items-center justify-center'>No Users yet</div>
                                : <table className="min-w-full mb-10">
                                    <thead className="border-b">
                                        <tr className="">
                                            <th className="px-5 font-semibold text-left">ID</th>
                                            <th className="p-5 font-semibold text-left">USERNAME</th>
                                            <th className="p-5 font-semibold text-left">SUBTOTAL</th>
                                            <th className="p-5 font-semibold text-left">PAID</th>
                                            <th className="p-5 font-semibold text-left">DELIVERED</th>
                                            <th className="p-5 font-semibold text-left">ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((order) => (
                                            <tr key={order._id} className="border-b hover:bg-[#e8f6ea]">
                                                <td className=" p-5 ">{order._id}</td>
                                                <Link href={`/admin/users/${order.user._id}`}><td className=" p-5 ">{order.user.name}</td></Link>
                                                <td className=" p-5 ">${order.totalPrice}</td>
                                                <td className="flex items-center gap-3 p-5 ">{order.isPaid ? 'True' : 'False'}{order.paymentMethod === 'PayPal' && <BsPaypal color='#088178' size={30} />}</td>
                                                <td className="p-5 ">{order.isDelivered ? 'True' : 'False'}{!order.isDelivered && <button className='btn-x ml-4 bg-[#088178] text-white' onClick={() => handleDelivery(order._id)} >Deliver</button>}</td>
                                                <td className=" p-5 flex items-center gap-5 ">
                                                    <Link href={`/orders/${order._id}`} passHref>
                                                        <BiEdit color='blue' size={30} />
                                                    </Link>
                                                    <MdDelete color='red' onClick={() => handleDelete(order._id)} size={30} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                        }
                    </div>

                    }

                </div>
            )}
        </Layout>
    )
}

export default OrdersList;

OrdersList.auth = { adminOnly: true }

export const getServerSideProps = async () => {
    connectMongo().catch(err => console.log(err.message))
    const res = await Order.find({}).populate('user', 'name');
    return {
        props: {
            orders: JSON.parse(JSON.stringify(res))
        }
    }
}
