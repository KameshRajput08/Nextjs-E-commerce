import { hash } from 'bcryptjs';
import { getSession } from 'next-auth/react';
import User from '../../../../models/User';
import connectMongo from "../../../../utils/conn";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(401).send('admin signin required');
  }
  connectMongo().catch(error => { error: "Connection Failed...!" })

  if (req.method === 'GET') {
    const users = await User.find();
    res.send(users);
  } else if (req.method === 'POST') {
    const { name, email, password, isAdmin } = req.body;
    if (
      !name ||
      !email ||
      !email.includes('@')) {
      res.status(422).json({
        message: 'Validation error',
      });
      return;
    }

    connectMongo().catch(error => res.json({ error: "Connection Failed...!" }))
    const checkexisting = await User.findOne({ email });
    if (checkexisting) return res.status(403).json({ error: "User Already Exists...!" });
    try {
      const user = await User.create({ name, email, password: await hash(password, 12), isAdmin })
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }

  }

};

export default handler;
