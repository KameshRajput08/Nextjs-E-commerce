import Product from "../../../models/Product";
import connectMongo from "../../../utils/conn";


export default async function handler(req, res) {
    connectMongo().catch(err => console.log(err.message))

    if (req.method === 'GET') {
        try {
            const product = await Product.findById(req.query.id)
            res.status(200).json(product)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }
}