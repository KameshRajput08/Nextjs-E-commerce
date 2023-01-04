import Product from "../../../models/Product";
import connectMongo from "../../../utils/conn";


export default async function handler(req, res) {
    connectMongo().catch(err => console.log(err.message))

    if (req.method === 'GET') {
        try {
            const products = await Product.find({
                name: { "$regex": req.query.term, $options: "i" },
            });
            res.status(200).json(products)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }
}