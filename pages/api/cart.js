import { getSession } from "next-auth/react";
import Cart from "../../models/Cart";
import connectMongo from "../../utils/conn";

export default async function handler(req, res) {
    connectMongo().catch(error => res.json({ error: "Connection Failed...!" }))

    const session = await getSession({ req })

    if (req.method === 'POST') {
        try {
            const cart = await Cart.findOne({ userId: session.user._id })
            if (cart) {
                const updatedCart = await Cart.findOneAndUpdate({ userId: session.user._id }, {
                    $set: req.body.data
                }, {
                    new: true
                })
                res.status(200).json(updatedCart)
            } else {
                const cart = await Cart.create({
                    userId: session.user._id,
                    cartItems: req.body.data.cartItems
                });
                res.status(200).json(cart)
            }

        } catch (err) {
            res.status(500).json(err.message)
        }
    } else if (req.method === 'GET') {
        try {
            const cart = await Cart.findOne({ userId: session.user._id })
            res.status(200).json(cart)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }
}