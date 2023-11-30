import { NextFunction, Request, Response } from 'express';
import { collections } from './config';
import { ObjectId } from 'mongodb';
import User from './models/user';

declare module "express" {
    interface Request {
        user?: User
    }
};

export const authorized = async (request: Request, response: Response, next: NextFunction) => {
    console.log(request.session);
	if (request.session._id === undefined) {
        response.status(401).json({ error: "unauthorized" });
    } else {
        const id = new ObjectId(request.session._id);
        request.user = await collections.users.findOne({ _id: id }) as User;
        next();
    }
};

declare module "express-session" {
    interface SessionData {
        _id?: ObjectId
    }
};

export const requestLog = async (request: Request, response: Response, next: NextFunction) => {
    const methods: { [key: string]: string } = { 
        GET: "\x1b[32m GET\x1b[0m",
        POST: "\x1b[35mPOST\x1b[0m", 
        DELETE: "\x1b[31m DEL\x1b[0m",
        OPTIONS: "\x1b[33mCORS\x1b[0m" // we only use options in here for CORS
    };
    response.on("finish", () => { 
        const { statusCode, statusMessage } = response;
        const { method, originalUrl } = request;
        const date = `\x1b[34m${new Date().toLocaleString()}\x1b[0m`;
        const code = `\x1b[3${Math.floor(statusCode / 100)}m${statusCode}\x1b[0m`;
        console.log(`[${date}]: ${methods[method] || method} - ${code}: ${statusMessage} - ${originalUrl}`);
    });
    next();
};