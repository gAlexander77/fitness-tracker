import { NextFunction, Request, Response } from 'express';
import { collections } from './config';
import { ObjectId } from 'mongodb';
import User from './models/user';

declare module "express" {
    interface Request {
        user?: User
    }
};

export const authorized = async (req: Request, res: Response, next: NextFunction) => {
	if (req.session._id === undefined) {
        res.status(401).json({ error: "unauthorized" });
    } else {
        const id = new ObjectId(req.session._id);
        req.user = await collections.users.findOne({ _id: id }) as User;
        next();
    }
};

declare module "express-session" {
    interface SessionData {
        _id?: ObjectId
    }
};

export const requestLog = async (req: Request, res: Response, next: NextFunction) => {
    const methods: { [key: string]: string } = { GET: "\x1b[32m GET\x1b[0m", POST: "\x1b[35mPOST\x1b[0m", DELETE: "\x1b[31m DEL\x1b[0m" };
    res.on("finish", () => { 
        const status = res.statusCode;
        const date = `\x1b[34m${new Date().toLocaleString()}\x1b[0m`;
        const code = `\x1b[3${Math.floor(status / 100)}m${status}\x1b[0m`;
        console.log(`[${date}]: ${methods[req.method]} - ${code}: ${res.statusMessage} - ${req.originalUrl}`);
    });
    next();
};