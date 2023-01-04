import Link from 'next/link'
import React, { useRef } from 'react'
import { BsInstagram } from "react-icons/bs";
import { BiMenuAltLeft, BiMenuAltRight } from "react-icons/bi";
import { TiSocialFacebook } from "react-icons/ti";
import Head from 'next/head';
import Image from 'next/image';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillYoutube, AiOutlineClose, AiOutlineTwitter } from 'react-icons/ai';
import { Menu } from '@headlessui/react';
import { VscAccount } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaHistory, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import { signOut, useSession } from 'next-auth/react';

const Layout = ({ children, title }) => {
    const { data: session } = useSession();
    const navRef = useRef();
    return (
        <>
            <Head>
                <title>{title ? title + ' - FashX' : 'FashX'}</title>
                <meta name="description" content="Ecommerce Website" />
            </Head>
            <ToastContainer position="bottom-center" limit={1} />
            <div className='flex min-h-screen flex-col'>
                <header className='sticky top-0 z-50'>
                    <nav className="relative flex items-center justify-between px-[20px] lg:px-[80px] py-[20px] bg-[#e3e6f3] shadow-md shadow-[#0000000f]">
                        <div className="flex lg:hidden items-center gap-6">
                            <BiMenuAltLeft onClick={() => navRef.current.style.left = '0px'} size={35} />
                        </div>
                        <Link href=""><Image src="/assets/logo.png" width={200} height={200} alt="" /></Link>
                        <div className='flex items-center gap-0 lg:gap-4'>
                            <div className='flex items-center justify-between gap-6 nav-right' ref={navRef}>
                                <Link className="nav-link" href="/">Home</Link>
                                <Link className="nav-link" href="/shop">Shop</Link>
                                <Link className="nav-link" href="/blog">Blog</Link>
                                <Link className="nav-link" href="/about">About</Link>
                                <Link className="nav-link" href="/contact">Contact</Link>
                                {
                                    !session && <Link href='/login'><button className='btn-x  bg-[#088178] text-white'>Sign In</button></Link>
                                }
                                <AiOutlineClose size={35} className="absolute top-5 right-5 lg:hidden" onClick={() => navRef.current.style.left = '-300px'} />
                            </div>
                            {
                                session && <Menu>
                                    <Menu.Button>
                                        {session.user.image ? <img src={session.user.image} className="rounded-full w-7 lg:w-[50px]" /> : <VscAccount size={35} />}
                                    </Menu.Button>
                                    <Menu.Items className="flex flex-col absolute top-[80px] right-[20px] lg:right-[85px] text-sm bg-white rounded-md">
                                        <Menu.Item className="flex gap-2 items-center px-5 py-3 border-b-[1px] border-b-[#DCE0DF] hover:bg-[#e8f6ea]">
                                            <Link href="/profile"><CgProfile size={30} /> Profile</Link>
                                        </Menu.Item>
                                        <Menu.Item className="flex gap-2 items-center px-5 py-3 border-b-[1px] border-b-[#DCE0DF] hover:bg-[#e8f6ea]">
                                            <Link href="/cart"><FaShoppingCart size={30} />Your Cart</Link>
                                        </Menu.Item>
                                        <Menu.Item className="flex gap-2 items-center px-5 py-3 border-b-[1px] border-b-[#DCE0DF] hover:bg-[#e8f6ea]">
                                            <Link href="/order-history"><FaHistory size={22} /> Orders History</Link>
                                        </Menu.Item>
                                        <Menu.Item className="flex gap-2 items-center px-5 py-3 border-b-[1px] border-b-[#DCE0DF] hover:bg-[#e8f6ea]">
                                            <Link href="/admin"><MdAdminPanelSettings size={30} /> Admin Panel</Link>
                                        </Menu.Item>
                                        {session && <Menu.Item className="flex gap-2 items-center px-5 py-3 border-b-[1px] border-b-[#DCE0DF] hover:bg-[#e8f6ea]">
                                            <div onClick={() => signOut()}><FaSignOutAlt size={30} /> Sign Out</div>
                                        </Menu.Item>}
                                    </Menu.Items>
                                </Menu>
                            }
                        </div>


                    </nav>
                </header>
                <main className='max-w-[100vw]'>{children}</main>
                <section className="newsletter flex items-center justify-between flex-wrap py-[50px] px-4 lg:px-[80px]">
                    <div className="news-text mb-3">
                        <h4 className='text-white font-bold text-xl'>Sign Up For Newsletter</h4>
                        <p className='text-[#818ea0] font-semibold text-xs lg:text-sm'>Get E-mail updates about our latest shops and <span className='text-[#ffbd27]'>special offers</span></p>
                    </div>
                    <div className="w-full lg:w-2/5 flex items-center">
                        <input type="text" placeholder="Your email address" className='px-5 w-[100%]  h-[2.5rem] lg:h-[3.124rem] border-2 border-transparent outline-none rounded-md rounded-tr-none rounded-br-none' />
                        <button className="btn-x text-white h-[2.5rem] lg:h-[3.125rem] whitespace-nowrap rounded-tl-none rounded-bl-none bg-[#088178]">Sign Up</button>
                    </div>
                </section>
                <footer className="py-[40px] px-5 lg:px-[80px] flex justify-between flex-wrap">
                    <div className="flex flex-col items-start mb-10">
                        <img className="mb-[30px]" src="/assets/logo.png" alt="" />
                        <h4>Contact</h4>
                        <p><strong>Address:</strong> 265, Greater Noida, New Dehli, India</p>
                        <p><strong>Phone:</strong> (+91) 01 2345 6789 /+01 2222 365</p>
                        <p><strong>Hours:</strong> 10:00 - 18:00, Mon - Sat</p>
                        <div className="follow">
                            <h4 className='mt-6'>Follow us</h4>
                            <div className="flex items-center gap-2">
                                <TiSocialFacebook size={30} color="#ccc" className='cursor-pointer' />
                                <AiOutlineTwitter size={30} color="#ccc" className='cursor-pointer' />
                                <BsInstagram size={20} color="#ccc" className='cursor-pointer' />
                                <AiFillYoutube size={30} color="#ccc" className='cursor-pointer' />
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:flex flex-col items-start mb-10">
                        <h4>About</h4>
                        <Link href="/">About Us</Link>
                        <Link href="/order-history">Delivery Imformation</Link>
                        <Link href="/">Privacy Policy</Link>
                        <Link href="/">Terms & Conditions</Link>
                        <Link href="/contact">Contact Us</Link>
                    </div>
                    <div className="flex flex-col items-start mb-10">
                        <h4>My Account</h4>
                        <Link href="/login">Sign In</Link>
                        <Link href="/cart">View Cart</Link>
                        <Link href="/">My Wishlist</Link>
                        <Link href="/order-history">Track My Order</Link>
                        <Link href="/">Help</Link>
                    </div>
                    <div className="flex flex-col items-start mb-10">
                        <h4>Install App</h4>
                        <p>From Play Store or Google Play</p>
                        <div className="pay">
                            <img src="assets/pay/app.jpg" alt="" />
                            <img src="assets/pay/play.jpg" alt="" />
                        </div>
                        <p>Secured Payment Gateways</p>
                        <img src="assets/pay/pay.png" alt="" />
                    </div>
                    <div className="w-[100%] text-center">
                        <p> Ⓒ 2021, FashionX etc - Fashion Ecommerce Store</p>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Layout