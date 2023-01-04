import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { SET_STATE } from '../utils/redux/cartSlice';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

export default function PaymentScreen() {
  const cart = useSelector(state => state.cart)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(cart.paymentMethod);

  const dispatch = useDispatch();

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error('Payment method is required');
    }
    dispatch(SET_STATE({ type: 'payment', data: selectedPaymentMethod }));
    router.push('/placeorder');
  };
  useEffect(() => {
    if (!cart.shippingAddress) {
      return router.push('/shipping');
    }
    setSelectedPaymentMethod(cart.paymentMethod || '');
  }, [cart.paymentMethod, router, cart.shippingAddress]);

  return (
    <Layout title="Payment Method">
      <CheckoutWizard activeStep={2} />
      <form className="mx-5 lg:mx-auto max-w-screen-md h-[70vh] flex flex-col items-start gap-4 justify-center" onSubmit={submitHandler}>
        <h1 className="mb-5 text-2xl">Payment Method</h1>
        {['PayPal', 'Stripe', 'CashOnDelivery'].map((payment) => (
          <div key={payment} className="mb-4">
            <input
              name="paymentMethod"
              className="p-2 outline-none focus:ring-0"
              id={payment}
              type="radio"
              checked={selectedPaymentMethod === payment}
              onChange={() => setSelectedPaymentMethod(payment)}
            />

            <label className="p-2" htmlFor={payment}>
              {payment}
            </label>
          </div>
        ))}
        <div className="mb-4 w-full flex justify-between">
          <button
            onClick={() => router.push('/shipping')}
            type="button"
            className="flex items-center gap-1 btn-x bg-[#088178] text-white"
          >
            <BsArrowLeft size={25} /> Back 
          </button>
          <button onClick={() => router.push('/placeorder')} className="flex items-center gap-1 btn-x bg-[#088178] text-white"
          >Next <BsArrowRight size={25} /></button>
        </div>
      </form>
    </Layout>
  );
}

PaymentScreen.auth = true;
