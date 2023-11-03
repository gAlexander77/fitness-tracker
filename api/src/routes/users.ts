import { Router, Request, Response } from 'express';
import { scrypt, randomBytes } from 'crypto';

import { collections } from '../config';
import User from '../models/user';

const route = Router();

route.post("/create", async (request: Request, response: Response) => {
    try {
        const { username, password } = request.body;
        const salt = randomBytes(16).toString("hex");
        scrypt(password, salt, 64, async (_error: Error, buffer: Buffer) => {    
            try {
                const user = new User(username, buffer.toString("hex"), salt);
				await collections.users.insertOne(user)
                	? response.status(200).json({ ok: "user created" })
                	: response.status(500).json({ error: "unable to create user" });
			} catch (error) {
				response.status(400).json({ error: "username already exists" });
			}
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({ error: "internal server error" });
    }
});

export default route;