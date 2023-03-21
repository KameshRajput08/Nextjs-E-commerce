import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Layout from '../../components/Layout'
import Product from '../../models/Product'
import connectMongo from '../../utils/conn'
import { ADD_ITEM } from '../../utils/redux/cartSlice'
import { useSession } from "next-auth/react"

const ProductPage = ({ product }) => {
    const { data: session } = useSession()
    const dispatch = useDispatch();
    const router = useRouter;
    const query = router.query;

    const handleAddToCart = () => {
        if(!data){
            router.push('/login')
        }
        product.countInStock > 0 ? dispatch(ADD_ITEM({ product })) : toast.error('Product is out of Stock.')
    }
    return (
        <Layout title={product.name}>
            <div className='px-[20px] lg:px-[80px] py-[40px] flex flex-col lg:flex-row mt-4'>
                <div className="w-full lg:w-2/5 mr-[50px]">
                    <img src={product.image} width="100%" id="main-img" alt="" />
                </div>
                <div class="pt-5 w-full lg:w-1/2">
                    <h6 className='pt-[40px] pb-2 lg:pb-5'>Home / {query.slug}</h6>
                    <h4 className='text-xl font-semibold mb-2'>{`${product.brand} ${product.name}`}</h4>
                    <h2 className='text-xl font-bold py-3'>${product.price}</h2>
                    <select className='py-2 mr-5 px-3 mb-4 outline-none'>
                        <option>Select Size</option>
                        <option>XL</option>
                        <option>XXL</option>
                        <option>Small</option>
                        <option>Large</option>
                    </select>
                    {/* <input className='w-[55px] h-[45px] py-2 px-3 mr-6 border-2 border-[#00000080] ' type="number" defaultValue={1} /> */}
                    <button onClick={handleAddToCart} className='btn-x text-white bg-[#088178]'>Add to Cart</button>
                    <h4 className='text-lg font-semibold mt-6'>Product Details</h4>
                    <span className='leading-3'>{product.description}</span>
                </div>
            </div>
        </Layout>

    )
}

export default ProductPage

export const getServerSideProps = async ({ params }) => {
    connectMongo().catch(err => console.log(err.message))

    const res = await Product.findOne({ slug: params.slug }).lean()

    return {
        props: {
            product: JSON.parse(JSON.stringify(res))
        }
    }
}

