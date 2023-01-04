import { getSession } from 'next-auth/react';
import Order from '../../../../models/Order.js';
import Product from '../../../../models/Product.js';
import connectMongo from '../../../../utils/conn.js';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('Error: signin required');
  }

  connectMongo().catch(err => res.status(500).json({ message: 'Error in conecting to database...' }))
  const order = await Order.findById(req.query.id);
  if (order) {
    if (order.isPaid) {
      return res.status(400).send({ message: 'Error: order is already paid' });
    }
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.email_address,
    };
    order.orderItems?.map(async (item) => {
      const product = await Product.findById(item._id);
      console.log(product)
      product.sales = product.sales + item.quantity;
      await product.save();
    })
    const paidOrder = await order.save();
    res.send({ message: 'order paid successfully', order: paidOrder });
  } else {
    res.status(404).send({ message: 'Error: order not found' });
  }
};

export default handler;