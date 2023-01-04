import axios from 'axios'
import { useFormik } from 'formik'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Layout from '../../../components/Layout'

const NewProduct = () => {
  const [image, setImage] = useState()
  const [url, setUrl] = useState()
  const router = useRouter();

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
      name: "",
      brand: "",
      slug: "",
      category: "",
      price: Number,
      countInStock: Number,
      description: ""
    },
    onSubmit
  })

  async function onSubmit(values) {
    try {
      await axios.post(`/api/admin/products`, {...values, image: url})
      toast.success('Product added successfully.')
      router.push('/admin/products')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Layout>
      <h2 className='ml-4 lg:ml-8 my-6 text-sm text-gray-500 font-medium'>Admin/Products/new</h2>
      <div className='card w-[95%] lg:w-1/2 mx-auto my-12 p-4 lg:p-10'>
        <h2 className='mb-10 text-2xl font-medium'>Add New Product</h2>
        <form onSubmit={formik.handleSubmit}>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 mb-6 w-full group">
              <input type="text" className="floating_input" required  {...formik.getFieldProps('name')} />
              <label className="floating_label">Title</label>
            </div>
            <div class="relative z-0 mb-6 w-full group">
              <input type="text" className="floating_input" required  {...formik.getFieldProps('brand')} />
              <label className="floating_label">Brand</label>
            </div>
          </div>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 mb-8 w-full group">
              <input type="text" className="floating_input" required  {...formik.getFieldProps('slug')} />
              <label className="floating_label">Slug</label>
            </div>
            <div class="relative z-0 mb-8 w-full group">
              <input type="text" className="floating_input" required   {...formik.getFieldProps('category')} />
              <label className="floating_label">Category</label>
            </div>
          </div>
          {
            !url ? <div class="relative z-0 mb-8 w-full group">
              <input type="file" onChange={(e) => setImage(e.target.files[0])} required className="floating_input" placeholder="Image" />
              <label className="floating_label">Image</label>
            </div> : <div class="relative z-0 mb-8 w-full group">
              <label className="mb-2 text-xs font-thin text-gray-500">Image Preview</label>
              <Image src={url} width={220} height={200} alt="" />

            </div>
          }
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 mb-6 w-full group">
              <input type="number" className="floating_input" required  {...formik.getFieldProps('price')} />
              <label className="floating_label">Price</label>
            </div>
            <div class="relative z-0 mb-6 w-full group">
              <input type="number" className="floating_input" required  {...formik.getFieldProps('countInStock')} />
              <label className="floating_label">In Stock</label>
            </div>
          </div>
          <div class="relative z-0 mb-10 w-full group">
            <input type="text" className="floating_input" required  {...formik.getFieldProps('description')} />
            <label className="floating_label">Description</label>
          </div>
          <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700">Submit</button>
        </form>

      </div>
    </Layout>
  )
}

export default NewProduct

NewProduct.auth = { adminOnly: true }