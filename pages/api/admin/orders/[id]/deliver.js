import { getSession } from 'next-auth/react';
import Order from '../../../../../models/Order';
import connectMongo from '../../../../../utils/conn';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send('Error: signin required');
  }
  connectMongo();
  const order = await Order.findById(req.query.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const deliveredOrder = await order.save();
    res.send({
      message: 'order delivered successfully',
      order: deliveredOrder,
    });
  } else {
    res.status(404).send({ error: 'Error: order not found' });
  }
};

export default handler;
