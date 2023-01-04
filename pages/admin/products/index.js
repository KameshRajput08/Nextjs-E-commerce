import React, { useState } from 'react'
import Layout from '../../../components/Layout'
import Product from "../../../models/Product";
import connectMongo from '../../../utils/conn';
import axios from 'axios';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import Link from 'next/link';
import Image from 'next/image';
import Order from '../../../models/Order';
import { AiTwotoneStar } from 'react-icons/ai';

const AdminProducts = ({ products }) => {
    const [data, setData] = useState(products);

    const handleDelete = async (id) => {
        const res = await axios.delete(`/api/admin/products/${id}`);
        setData(res.data.products)
    };
    return (
        <Layout>
            {!data ? (
                <div>Loading...</div>
            ) : (
                <div className="overflow-x-auto mx-5">
                    <div className="flex items-center justify-between p-4">
                        <h3 className='font-semibold text-lg'>ADMIN/PRODUCTS({data.length})</h3>
                        <Link href="/admin/products/new"><button className='btn-x bg-[#088178] text-white'>ADD NEW</button></Link>
                    </div>
                    <div className='overflow-x-auto'>
                        {
                            data.length === 0 ? <div className='w-full h-[40vh] flex items-center justify-center'>No Users yet</div>
                                : <table className="min-w-full mb-10">
                                    <thead className="border-b">
                                        <tr className="">
                                            <th className="px-5 font-semibold text-left">ID</th>
                                            <th className="p-5 font-semibold text-left">IMAGE</th>
                                            <th className="p-5 font-semibold text-left">TITLE</th>
                                            <th className="p-5 font-semibold text-left">CATEGORY</th>
                                            <th className="p-5 font-semibold text-left">RATING</th>
                                            <th className="p-5 font-semibold text-left">SALES</th>
                                            <th className="p-5 font-semibold text-left">REVENUE</th>
                                            <th className="p-5 font-semibold text-left">IN_STOCK</th>
                                            <th className="p-5 font-semibold text-left">ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((product) => (
                                            <tr key={product._id} className="border-b hover:bg-[#e8f6ea]">
                                                <td className=" p-5 ">{product._id}</td>
                                                <td className=" p-2 "><Image src={product.image} width={80} height={80} /></td>
                                                <td className=" p-5 ">{product.name}</td>
                                                <td className=" p-5 ">{product.category}</td>
                                                <td className=" flex items-center gap-2 p-5 ">{product.rating}<AiTwotoneStar size={25} color="#FFD700" /></td>
                                                <td className=" p-5 ">{product.sales}</td>
                                                <td className=" p-5 ">${product.sales * product.price}</td>
                                                <td className=" p-5 ">{product.countInStock}</td>
                                                <td className=" p-5 flex items-center gap-5 ">
                                                    <Link href={`/admin/products/${product._id}`} passHref>
                                                        <BiEdit color="blue" size={30} />
                                                    </Link>
                                                    <MdDelete color='red' onClick={() => handleDelete(product._id)} size={30} />
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

export default AdminProducts;

AdminProducts.auth = { adminOnly: true }

export const getServerSideProps = async () => {
    connectMongo().catch(err => console.log(err.message))
    const products = await Product.find();
    const order = await Order.find();

    products.map(product => {
        product.sales = 0;
        order.map(o => {
            o.orderItems.map(oi => {
                if (oi._id.toHexString() === product._id.toHexString()) product.sales = product.sales + oi.quantity
            })
        })
        product.save();
    })

    return {
        props: {
            products: JSON.parse(JSON.stringify(products))
        }
    }
}