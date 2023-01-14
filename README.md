# NEXT E-commerce website
## DEMO: [https://nextjsfashx.vercel.app/](https://nextjsfashx.vercel.app/)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Environment variables
- MANGO_URL
- GOOGLE_SECRET
- PAYPAL_CLIENT_ID
- SECRET
- JWT_SECRET
- GOOGLE_ID

## Technologies used:
### Backend 
- Nextjs
- next-auth
- Reactjs
- Mongodb/mongoose
- JWT / jsonwentoken
- Bcryptjs
- Paypal
- @paypal/react-paypal-js
- react-spinners
- Redux/reduxjs-toolkit
- Redux-persist
- recharts
- Formik (forms)
- Headlessui
- Formspree
- React-Hooks
- react-toastify 

### Features
- Interaction with the backend through Rest API. 
- Secured Authentication system with signup/email/login/signout using [next-auth](https://next-auth.js.org/)
- awesome fully mobile responsive design.
- State management using redux-toolkit/redux.
- pagination.
- view product info/ add to cart/ choose color and size.
- sort products according to size, color, price, new.
- order products/ view orders.
- order products / pay using paypal / view orders status and history.
- Payment using Paypal
- Menu using headlessui
- Admin panel(only admin)
- view sales, earnings, products, users and progress.
- Last 10 months sales on graph(recharts).
- Create or edit user, product and change delivery status.

