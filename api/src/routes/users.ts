import { Router, Request, Response, NextFunction } from 'express';
import { scrypt, randomBytes } from 'crypto';
import { ObjectId } from 'mongodb';

import { collections } from '../db';
import User from '../models/user';

export const usersFilter = { projection: { password: 0, salt: 0 }};
const users = Router();

users.get("/", async (_req: Request, res: Response) => {
    try {
        res.status(200).json(await collections.users.find({}, usersFilter).toArray());
    } catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});

users.get("/:id", async (req: Request, res: Response) => {
    try {
        const user = await collections.users.findOne({ _id: new ObjectId(req.params.id) }, usersFilter);
        user 
            ? res.status(200).json(user)
            : res.status(404).json({ error: "not found" });
    } catch (error) {
        res.status(400).json({ error: "bad request" });
    }
});

users.post("/create", async (req: Request, res: Response) => {
    try {
        const salt = randomBytes(16).toString("hex");
        scrypt(req.body.password, salt, 64, async (_error: Error, buffer: Buffer) => {    
            const user = new User(req.body.username, buffer.toString("hex"), salt);
            try {
				await collections.users.insertOne(user)
                	? res.status(200).json("ok")
                	: res.status(500).json({ error: "internal server error" });
			} catch (error) {
				res.status(400).json({ error: "username already exists" })
			}
        });
    } catch (error) {
        res.status(400).json({ error: "bad request" });
    }
});

// Authenticate user so users cannot delete others
function authenticate(req: Request, res: Response, next: NextFunction) {
	
	const currentUserId = new ObjectId(req.session._id);
	const userIdToDelete = new ObjectId(req.params.id);

	if (!currentUserId.equals(userIdToDelete)) {
    	res.status(403).json({ error: "forbidden" });
	} else {
		next();
	}
}

// Delete user
users.delete("/:id", authenticate, async (req: Request, res: Response) => {
	try {
		const deleteResult = await collections.users.deleteOne({ _id: new ObjectId(req.params.id) });
		if (deleteResult.deletedCount === 0) {
			res.status(404).json({ error: "not found" });
    	} else {
			res.status(200).json({ ok: "deleted user" });
    	}
	} catch (error) {
		res.status(500).json({ error: "internal server error" });
  	}
});

export default users;
