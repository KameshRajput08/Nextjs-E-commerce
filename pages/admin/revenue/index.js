import axios from 'axios';
import React, { useEffect, useReducer } from 'react'
import Chart from '../../../components/Chart';
import Featured from '../../../components/Featured';
import Layout from '../../../components/Layout';
import { getError } from "../../../utils/error";
import connectMongo from "../../../utils/conn";
import Order from "../../../models/Order"
import Link from 'next/link';
import { BsPaypal } from 'react-icons/bs';

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, summary: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

const Revenue = ({ orders }) => {
    console.log(orders)
    const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
        loading: true,
        summary: {},
        error: '',
    });

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/admin/summary`);
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        };
        fetchSummary();
    }, []);
    return (
        <Layout>
            {
                loading ? <div>Loading...</div> :
                    <>
                        <h2 className='ml-4 lg:ml-8 my-6 text-sm text-gray-500 font-medium'>Admin/Revenue</h2>
                        <div className="flex p-5 gap-5">
                            <Chart title="Last 10 Months (Revenue)" aspect={3 / 1} data={summary.salesData} />
                        </div>
                        <div className="flex flex-col lg:flex-row p-5 gap-5">
                            <Featured salesData={summary.salesData} />
                            <div className="card w-full overflow-x-auto">
                                <h3 className='text-lg font-medium m-4'>Transactions</h3>
                                <div className='overflow-x-auto'>
                                    {
                                        orders?.length === 0 ? <div className='w-full h-[40vh] flex items-center justify-center'>No Users yet</div>
                                            : <table className="min-w-full mb-10">
                                                <thead className="border-b">
                                                    <tr className="">
                                                        <th className="px-5 font-semibold text-left">PAYMENT ID</th>
                                                        <th className="p-5 font-semibold text-left">NAME</th>
                                                        <th className="p-5 font-semibold text-left">AMOUNT</th>
                                                        <th className="p-5 font-semibold text-left">PAYMENT</th>
                                                        <th className="p-5 font-semibold text-left">STATUS</th>
                                                        <th className="p-5 font-semibold text-left">PAID_AT</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {orders.map((order) => (
                                                        <tr key={order._id} className="border-b hover:bg-[#e8f6ea]">
                                                            <td className=" p-5 ">{order.paymentResult.id}</td>
                                                            <Link href={`/admin/users/${order.user._id}`}><td className=" p-5 ">{order.shippingAddress.fullName}</td></Link>
                                                            <td className=" p-5 ">${order.totalPrice}</td>
                                                            <td className="flex items-center gap-3 p-5 ">{order.paymentMethod === 'PayPal' && <BsPaypal color='#088178' size={30} />}</td>
                                                            <td className=" p-5 ">{order.paymentResult.status}</td>
                                                            <td className=" p-5 ">{order.paidAt}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                    }
                                </div>
                            </div>
                        </div>
                    </>
            }
        </Layout>
    )
}

export default Revenue;

Revenue.auth = { adminOnly: true }

export const getServerSideProps = async () => {
    connectMongo().catch(err => console.log(err.message))
    const orders = await Order.find();
    return {
        props: {
            orders: JSON.parse(JSON.stringify(orders))
        }
    }
}