import { getSession } from 'next-auth/react';
import connectMongo from "../../../utils/conn";

const handler = async (req, res) => {
    const session = await getSession({ req });
    if (!session || !session.user.isAdmin) {
        return res.status(401).send('admin signin required');
    }
    connectMongo().catch(error => { error: "Connection Failed...!" })
    if (req.method === 'PUT') {
        const date = new Date();
        const lastMonth = new Date(new Date().setMonth(date.getMonth() - 1));
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
        try {
            let a = 0;
            let b = 0;
            req.body?.summary.map(item => {
                if (item._id === `${lastMonth.getFullYear()}-${lastMonth.getMonth() + 1}`) a = item.data;
                if (item._id === `${previousMonth.getFullYear() - 1}-${previousMonth.getMonth() + 1}`) b = item.data;
            })
            const growth = (a - b) / b * 100;
            res.status(200).json( Math.round(growth * 100) / 100);
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

};

export default handler;