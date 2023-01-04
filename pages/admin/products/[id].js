import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import Product from '../../../models/Product';
import connectMongo from '../../../utils/conn';
import axios from 'axios';
import Image from 'next/image';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

const SingleProduct = ({ data }) => {
    const [product, setProduct] = useState(data)
    const [image, setImage] = useState(product.image)
    const [url, setUrl] = useState()

    useEffect(() => {
        const uploadImage = async () => {
            const formData = new FormData();
            formData.append('file', image);
            formData.append('upload_preset', 'eatdkv7c');

            fetch('https://api.Cloudinary.com/v1_1/ddqbqk7rp/image/upload', {
                method: 'post',
                body: formData,
            }).then(res => res.json())
                .then(res => setUrl(res.url))
                .catch(err => console.log(err));
        }
        uploadImage();
    }, [image])

    const formik = useFormik({
        initialValues: {
            name: product.name,
            brand: product.brand,
            category: product.category,
            price: product.price,
            countInStock: product.countInStock,
            image: url,
            description: product.description
        },
        onSubmit
    })

    async function onSubmit(values) {
        try {
            console.log(values)
            const res = await axios.put(`/api/admin/products/${product._id}`, values)
            setProduct(res.data.product)
            toast.success('Product updated successfully.')
            console.log(product)

        } catch (err) {
            res.status(200).json(err.message)
        }
    }

    return (
        <Layout>
            <h2 className='ml-4 lg:ml-8 my-6 text-sm text-gray-500 font-medium'>Admin/Products/{product.slug}</h2>
            <div className='flex justify-start items-start flex-col gap-5 lg:flex-row'>
                <div className="w-[95%] lg:w-2/5 m-auto p-4 lg:p-10 card">
                    <div className="flex items-center mb-5">
                        <img src={product.image} alt="" className="w-[150px] h-[150px] rounded-full object-cover mr-5" />
                        <span className="text-2xl font-semibold">{product.name}</span>
                    </div>
                    <table className="min-w-full mb-10 pl-6 flex flex-col gap-3">
                        <tr className=''>
                            <th className='w-[150px] text-left'>ID:</th>
                            <td>{product._id}</td>
                        </tr>
                        <tr className=''>
                            <th className='w-[150px] text-left'>Category:</th>
                            <td>{product.category}</td>
                        </tr>
                        <tr className=''>
                            <th className='w-[150px] text-left'>Rating:</th>
                            <td>{product.rating}</td>
                        </tr>
                        <tr className=''>
                            <th className='w-[150px] text-left'>Reviews:</th>
                            <td>{product.numReviews}</td>
                        </tr>
                        <tr className=''>
                            <th className='w-[150px] text-left'>Price:</th>
                            <td>${product.price}</td>
                        </tr>
                        <tr className=''>
                            <th className='w-[150px] text-left'>Sales:</th>
                            <td>{product.sales}</td>
                        </tr>
                        <tr className=''>
                            <th className='w-[150px] text-left'>Revenue:</th>
                            <td>${product.sales * product.price}</td>
                        </tr>
                        <tr className=''>
                            <th className='w-[150px] text-left'>In Stock:</th>
                            <td>{product.countInStock}</td>
                        </tr>
                    </table>
                </div>
                <div className='card w-[95%] lg:w-1/2 m-auto p-4 lg:p-10'>
                    <h2 className='mb-10 text-2xl font-medium'>Edit Product</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 mb-6 w-full group">
                                <input type="text" className="floating_input"  {...formik.getFieldProps('name')} />
                                <label for="floating_email" className="floating_label">Title</label>
                            </div>
                            <div class="relative z-0 mb-6 w-full group">
                                <input type="text" className="floating_input"  {...formik.getFieldProps('brand')} />
                                <label for="floating_email" className="floating_label">Brand</label>
                            </div>
                        </div>
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 mb-8 w-full group">
                                <input type="text" className="floating_input"   {...formik.getFieldProps('category')} />
                                <label for="floating_email" className="floating_label">Category</label>
                            </div>
                            <div class="relative z-0 mb-8 w-full group">
                                <input type="number" className="floating_input"  {...formik.getFieldProps('price')} />
                                <label for="floating_email" className="floating_label">Price($)</label>
                            </div>
                        </div>
                        {
                            !url ? <div class="relative z-0 mb-8 w-full group">
                                <input type="file" onChange={(e) => setImage(e.target.files[0])} className="floating_input" placeholder="Image" />
                                <label for="floating_email" className="floating_label">Image</label>
                            </div> : <div class="relative z-0 mb-8 w-full group">
                                <label className="mb-2 text-xs font-thin text-gray-500">Image Preview</label>
                                <Image src={url} width={150} height={150} alt="" />

                            </div>
                        }

                        <div class="relative z-0 mb-10 w-full group">
                            <input type="number" className="floating_input"  {...formik.getFieldProps('countInStock')} />
                            <label for="floating_email" className="floating_label">In Stock</label>
                        </div>
                        <div class="relative z-0 mb-10 w-full group">
                            <input type="text" className="floating_input"  {...formik.getFieldProps('description')} />
                            <label for="floating_email" className="floating_label">Description</label>
                        </div>
                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700">Submit</button>
                    </form>

                </div>
            </div>

        </Layout>
    )
}

export default SingleProduct;

SingleProduct.auth = { adminOnly: true }


export const getServerSideProps = async ({ params }) => {
    connectMongo().catch(err => console.log(err.message))
    const product = await Product.findById(params.id);

    return {
        props: {
            data: JSON.parse(JSON.stringify(product))
        }
    }
}