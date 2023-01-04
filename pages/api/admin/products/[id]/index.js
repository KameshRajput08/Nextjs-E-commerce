import { getSession } from 'next-auth/react';
import Product from '../../../../../models/Product';
import connectMongo from '../../../../../utils/conn';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send('signin required');
  }

  const { user } = session;
  if (req.method === 'GET') {
    return getHandler(req, res, user);
  } else if (req.method === 'PUT') {
    return putHandler(req, res, user);
  } else if (req.method === 'DELETE') {
    return deleteHandler(req, res, user);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};
const getHandler = async (req, res) => {
  connectMongo().catch(error => { error: "Connection Failed...!" })
  const product = await Product.findById(req.query.id);
  res.send(product);
};
const putHandler = async (req, res) => {
  connectMongo().catch(error => { error: "Connection Failed...!" })
  try {
    const product  = await Product.findByIdAndUpdate(req.query.id, req.body, {new: true});
    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const deleteHandler = async (req, res) => {
  connectMongo().catch(error => { error: "Connection Failed...!" })
  const product = await Product.findById(req.query.id);
  if (product) {
    await product.remove();
    const products = await Product.find();
    res.send({ message: 'Product deleted successfully', products });
  } else {
    res.status(404).send({ error: 'Product not found' });
  }
};
export default handler;
