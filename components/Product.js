import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { AiTwotoneStar } from "react-icons/ai";
import axios from 'axios';
import { ADD_ITEM } from '../utils/redux/cartSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const Product = ({ product }) => {
    const dispatch = useDispatch()

    const handleAddToCart = async () => {
        const res = await axios.get(`http://localhost:3000/api/product/${product._id}`)
        res.data.countInStock > 0 ? dispatch(ADD_ITEM({ product })) : toast.error('Product is out of Stock.')
    }

    return (

        <div className="max-w-[400px] min-w-[320px] p-3 border-[1px] border-[#cce780] shadow-sm hover:shadow-md shadow-[#00000033] rounded-3xl cursor-pointer ease-[0.5s] relative">
            <Link href={`/product/${product.slug}`} >
                <img src={product.image} className="w-[100%] rounded-2xl" alt="" />
                <div className="py-3 text-start relative">
                    <span className='text-[#606603] text-base'>{product.brand}</span>
                    <h6 className='text-lg font-semibold'>{product.name}</h6>
                    <div className="absolute top-2 right-1 w-[min-content] flex items-center divide-dotted divide-x-2 divide-[#d7f4db] border-[#cce7d0] border-2 rounded-lg">
                        <span className='px-2 bg-[#e8f6ea] text-[#088178] flex items-center gap-1'>{product.rating}<AiTwotoneStar size={25} color="#FFD700" /></span>
                        <span className='px-2'>{product.numReviews}</span>
                    </div>
                    <h4 className='text-[#088178] font-semibold text-lg'>${product.price}</h4>
                </div>
            </Link>
            <div onClick={handleAddToCart} className='cartIcon'><FaShoppingCart size={25} color="#088178" /></div>
        </div>


    )
}

export default Product