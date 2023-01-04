import { getSession } from 'next-auth/react';
import Order from '../../../../../models/Order';
import connectMongo from '../../../../../utils/conn';

const handler = async (req, res) => {
    const session = await getSession({ req });
    if (!session || (session && !session.user.isAdmin)) {
        return res.status(401).send('Error: signin required');
    }
    connectMongo();
    if (req.method === 'DELETE') {
        try {
            await Order.findByIdAndDelete(req.query.id)
            const orders = await Order.find({}).populate('user', 'name');
            res.status(200).json({ message: 'Order deleted', orders })
        } catch (err) {
            res.status(404).send({ error: err.message });
        }
    } else {
        res.status(404).send({ error: 'Method not allowed' });
    }
};

export default handler;
