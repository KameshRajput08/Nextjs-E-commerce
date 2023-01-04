import { getSession } from 'next-auth/react';
import Order from '../../../../models/Order';
import connectMongo from '../../../../utils/conn';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send('signin required');
  }
  if (req.method === 'GET') {
    connectMongo();
    const orders = await Order.find({}).populate('user', 'name');
    res.send(orders);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};

export default handler;
