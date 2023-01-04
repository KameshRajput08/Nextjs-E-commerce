import React from 'react'
import { BsFillClockFill, BsFillEnvelopeFill, BsMapFill, BsFillTelephoneFill } from 'react-icons/bs'
import Layout from '../components/Layout'

const Contact = () => {
    return (
        <Layout title="contact">
            <div className=''>
                <section className="w-full h-[40vh] flex flex-col text-white items-center justify-center p-4 bg-contact-header bg-cover bg-center">
                    <h2 className='text-white font-semibold'>#let&apos;_talk</h2>
                    <p>LEAVE A MESSEGE. We love to hear from you!</p>
                </section>
                <section className="flex flex-col lg:flex-row justify-between px-5 lg:px-[100px] py-10">
                    <div className="w-full lg:w-2/5">
                        <span>GET IN TOUCH</span>
                        <h2 className='mt-3'>Visit one of our agency location or conatct us today</h2>
                        <h3 className='mt-3'>Head Office</h3>
                        <div className='flex flex-col gap-4 mt-5 text-sm'>
                            <li className='flex items-center gap-3'>
                                <BsMapFill size={25} />
                                <p>450 Serra Mall, Stanford, CA 94305, United States</p>
                            </li>
                            <li className='flex items-center gap-3'>
                                <BsFillEnvelopeFill size={25} />
                                <p>Contact@example.com</p>
                            </li>
                            <li className='flex items-center gap-3'>
                                <BsFillTelephoneFill size={25} />
                                <p>Contact@example.com</p>
                            </li>
                            <li className='flex items-center gap-3'>
                                <BsFillClockFill size={25} />
                                <p>Monday to Sunday 9 am to 16 pm</p>
                            </li>
                        </div>
                    </div>
                    <div className="w-full lgw-1/2 h-[400px]">
                        <iframe className='w-full h-full' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.4076122296024!2d-122.17190768421054!3d37.42747447982423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fbb2a678bea9d%3A0x29cdf01a44fc687f!2sStanford%20University!5e0!3m2!1sen!2sin!4v1672330064764!5m2!1sen!2sin" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </section>
                <section className="flex items-start justify-between m-5 p-2 lg:p-[80px] border-2 border-[#e1e1e1]">
                    <div className="w-full lg:w-4/5 m-auto">
                        <h6 className='mb-4'>LEAVE A MESSEGE</h6>
                        <h3 className='mb-4'>We love to hear from you</h3>
                        <form action='https://formspree.io/f/xpzeaggj' method='POST' className="contact">
                            <input type="text" name='name' placeholder="Your Name" />
                            <input type="email" name='email' placeholder="Email" />
                            <input type="text" name='subject' placeholder="Subject" />
                            <textarea rows="15" name='message' placeholder="Your Messege"></textarea>
                            <button type='submit' className="btn-x mt-5 text-white bg-[#088178]">Submit</button>
                        </form>
                    </div>
                </section>
            </div>
        </Layout>

    )
}

export default Contact