import { getSession } from 'next-auth/react';
import Product from '../../../../models/Product';
import connectMongo from "../../../../utils/conn";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(401).send('admin signin required');
  }
  if (req.method === 'GET') {
    return getHandler(req, res);
  } else if (req.method === 'POST') {
    return postHandler(req, res);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};

const postHandler = async (req, res) => {
  connectMongo().catch(error => { error: "Connection Failed...!" })
  const newProduct = new Product(req.body);
  const product = await newProduct.save();
  res.send({ message: 'Product created successfully', product });
};

const getHandler = async (req, res) => {
  connectMongo().catch(error => { error: "Connection Failed...!" })
  const products = await Product.find({});
  res.send(products);
};
export default handler;
