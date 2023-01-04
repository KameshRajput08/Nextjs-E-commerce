import axios from 'axios'
import { getSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Layout from '../components/Layout'
import ProductComp from '../components/Product'
import connectMongo from '../utils/conn'
import { SET_STATE } from '../utils/redux/cartSlice'
import Product from "../models/Product.js";
import Link from 'next/link'

export default function Home({ session, data }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCart = async () => {
      if (session) {
        const res = await axios.get(`https://nextjsfashx.vercel.app/api/cart`)
        dispatch(SET_STATE({ type: 'cartItems', data: res.data?.cartItems ? res.data.cartItems : [] }))
      }
    }
    fetchCart();
  }, [])

  return (
    <Layout>
      <>
        <section className="h-[50vh] lg:h-[90vh] w-[100%] bg-showcase bg-top-[25%] bg-right-[0] bg-cover px-[20px] lg:px-[80px] flex flex-col items-start justify-center">
          <h4 className='lg:pb-[15px]' >Trade-in-offers</h4>
          <h2 className=''>Super value deals</h2>
          <h1 className='lg:pb-4 text-[#088178]'>On all products</h1>
          <p className='pb-4'>Save more with coupons & up to 70% off</p>
          <Link href="/shop">
            <button className='text-[15px] font-medium cursor-pointer border-0 bg-btn text-[#088178] py-[14px] pr-[80px] pl-[65px]' >Shop now</button>
          </Link>
        </section>
        <section className='text-center my-5 lg:my-[40px] px-[80px] py-[40px]'>
          <h2 className='font-medium'>Featured Products</h2>
          <p>Summer Collection New Modern Design</p>
          <div className='flex gap-8 flex-wrap justify-center  my-10 auto'>
            {
              data?.map(p => {
                return <ProductComp key={p.slug} product={p} />
              })
            }
          </div>
        </section>
      </>
    </Layout>
  )
}

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  connectMongo()

  const res = await Product.find().lean()

  return {
    props: {
      session,
      data: JSON.parse(JSON.stringify(res))
    }
  }
}

