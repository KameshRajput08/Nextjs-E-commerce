import { getSession } from 'next-auth/react';
import Order from '../../../models/Order.js';
import connectMongo from '../../../utils/conn.js';

const handler = async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).send('signin required');
    }

    const { user } = session;
    connectMongo().catch(err => res.status(500).json({ message: 'Error in conecting to database...' }))
    const newOrder = new Order({
        ...req.body,
        user: user._id,
    });

    const order = await newOrder.save();
    res.status(201).send(order);
};
export default handler;

