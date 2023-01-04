import mongoose from 'mongoose';
import { getSession } from 'next-auth/react';
import Order from '../../../../models/Order.js';
import connectMongo from '../../../../utils/conn.js';

const handler = async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).send('signin required');
    }

    connectMongo().catch(err => res.status(500).json({ message: 'Error in conecting to database...' }))
    const order = await Order.findById(req.query.id);
    res.status(200).json(order);
};

export default handler;
