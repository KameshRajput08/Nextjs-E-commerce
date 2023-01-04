import User from '../../../models/User.js'
import { hash } from 'bcryptjs';
import connectMongo from '../../../utils/conn.js';

export default async function handler(req, res) {
    connectMongo().catch(error => res.json({ error: "Connection Failed...!" }))

    // only post method is accepted
    if (req.method === 'POST') {

        if (!req.body) return res.status(404).json({ error: "Don't have form data...!" });
        const { name, email, password } = req.body;

        // check duplicate users
        const checkexisting = await User.findOne({ email });
        if (checkexisting) return res.status(403).json({ error: "User Already Exists...!" });

        // hash password
        User.create({ name, email, password: await hash(password, 12) }, function (error, data) {
            if (error) return res.status(404).json({ error });
            res.status(201).json({ status: true, user: data })
        })

    } else {
        res.status(500).json({ message: "HTTP method not valid only POST Accepted" })
    }

}