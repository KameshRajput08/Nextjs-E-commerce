import React from 'react';

export default function CheckoutWizard({ activeStep = 0 }) {
  return (
    <div className="my-3 flex flex-wrap">
      {['User Login', 'Shipping Address', 'Payment Method', 'Place Order'].map(
        (step, index) => (
          <div
            key={step}
            className={`flex-1 border-b-2  text-center text-xs lg:text-sm
       ${index <= activeStep
                ? 'border-[#088178]   text-[#088178] '
                : 'border-gray-400 text-gray-400'
              }
          
       `}
          >
            {step}
          </div>
        )
      )}
    </div>
  );
}
