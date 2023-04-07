// NPM
import { Router, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { scrypt } from 'crypto';

// local
import { usersFilter } from '../routes/users';
import { collections } from '../db';
import { auth, log } from '../utils';


// create the auth route
const index = Router();

// hacky way to add userIDs to sessions in TypeScript
declare module "express-session" {
    interface SessionData {
        _id?: ObjectId
    }
}

index.get("/", auth, async (req: Request, res: Response) => {
    try {
        const id = new ObjectId(req.session._id);
        const user = await collections.users.findOne({ _id: id }, usersFilter);
        
        user
            ? res.status(200).json(user)
            : res.status(404).json("not found");
    } catch (error) {
        log.error(error);
        res.status(400).json("bad request");
    }
});

index.post("/sign-in", async (req: Request, res: Response) => {
	console.log(req.method, req.body);
    try {
        const user = await collections.users.findOne({username: req.body.username});
        user ? scrypt(req.body.password, user.salt, 64, (_error: Error, buffer: Buffer) => {
            
            const authenticated = user.password === buffer.toString("hex");
            
            req.session._id = authenticated ? user._id : undefined;
            authenticated
                ? res.status(200).json("ok")
                : res.status(401).json("unauthorized");

        }) : res.status(401).json("unauthorized");
    } catch (error) {
        res.status(400).json("bad request");
    }
});

index.post("/sign-out", auth, async (req: Request, res: Response) => {
    try {
        req.session.destroy((error: Error) => log.error(error));
        res.status(200).json("ok");
    } catch (error) {
        log.error(error);
        res.status(500).json("internal server error");
    }
});

export default index;