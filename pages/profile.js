import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { VscAccount } from 'react-icons/vsc';
import Layout from '../components/Layout'
import axios from 'axios';
import Link from 'next/link';

const Profile = () => {
  const { data: session } = useSession();
  const [orderHIstory, setOrderHIstory] = useState([])

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`/api/orders/history`);
      setOrderHIstory(data)
    }
    fetchData();
  }, [])

  return (
    <Layout title={session?.user.name} >
      <div className='w-full lg:w-3/5 m-auto py-10'>
        <div className='flex items-center justify-center gap-4 mb-10'>
          {session?.user.image ? <img src={session?.user.image} className="rounded-full w-[40px] h-[40px] lg:w-[100px] lg:h-[100px]" /> : <VscAccount size={35} />}
          <div className="flex flex-col">
            <h3 className='text-md lg:text-lg font-medium'>{session?.user.email}</h3>
            <span>{session?.user.name}</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          {
            orderHIstory.length === 0 ? <div className='w-full h-[40vh] flex items-center justify-center'>No Orders yet</div>
              : <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">ID</th>
                    <th className="p-5 text-left">DATE</th>
                    <th className="p-5 text-left">TOTAL</th>
                    <th className="p-5 text-left">PAID</th>
                    <th className="p-5 text-left">DELIVERED</th>
                    <th className="p-5 text-left">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {orderHIstory.map((order) => (
                    <tr key={order._id} className="border-b">
                      <td className=" p-5 ">{order._id.substring(20, 24)}</td>
                      <td className=" p-5 ">{order.createdAt.substring(0, 10)}</td>
                      <td className=" p-5 ">${order.totalPrice}</td>
                      <td className=" p-5 ">
                        {order.isPaid
                          ? `${order.paidAt.substring(0, 10)}`
                          : 'not paid'}
                      </td>
                      <td className=" p-5 ">
                        {order.isDelivered
                          ? `${order.deliveredAt.substring(0, 10)}`
                          : 'not delivered'}
                      </td>
                      <td className=" p-5 ">
                        <Link href={`/order/${order._id}`} passHref>
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          }

        </div>
      </div>
    </Layout>
  )
}

export default Profile