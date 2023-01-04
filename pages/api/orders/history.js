import { getSession } from 'next-auth/react';
import Order from '../../../models/Order.js';
import connectMongo from '../../../utils/conn.js';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: 'signin required' });
  }
  const { user } = session;
  connectMongo()
  const orders = await Order.find({ user: user._id });
  res.status(200).json(orders);
};

export default handler;
