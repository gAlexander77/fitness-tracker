import { Router, Request, Response } from 'express';
import { scrypt, randomBytes } from 'crypto';

import { collections } from '../config';
import User from '../models/user';

const route = Router();

route.post("/create", async (req: Request, res: Response) => {
    try {
        const salt = randomBytes(16).toString("hex");
        scrypt(req.body.password, salt, 64, async (_error: Error, buffer: Buffer) => {    
            const user = new User(req.body.username, buffer.toString("hex"), salt);
            try {
				await collections.users.insertOne(user)
                	? res.status(200).json({ ok: "user created" })
                	: res.status(500).json({ error: "internal server error" });
			} catch (error) {
				res.status(400).json({ error: "username already exists" })
			}
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" });
    }
});

export default route;