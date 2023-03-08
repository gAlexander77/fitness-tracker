// NPM
import { Router, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { scrypt } from 'crypto';

// local
import { usersFilter } from './users';
import { collections } from '../db';
import { authRequired, log } from '../utils';

// create the auth route
const index = Router();

// hacky way to add userIDs to sessions in TypeScript
declare module "express-session" {
    interface SessionData {
        userID?: ObjectId,
    }
}

// API v1: /
//      method: GET
// description: Get user for current session
//      params: none
//      output: Details for signed in user
index.get("/", authRequired, async (req: Request, res: Response) => {
    try {
        const id = new ObjectId(req.session.userID);
        const user = await collections.users.findOne({ _id: id }, usersFilter);
        user
            ? res.status(200).send(user)
            : res.status(404).send('"user not found"');
    } catch (error) {
        log.error(error);
        res.status(500).send('"internal server error"');
    }
});

// API v1: /sign-in
//      method: POST
// description: Authenticate a user and update their session
//      params: *username string, *password: string
//      output: 200 response on successful authentication, 400 on exception, 404 on email not found
index.post("/sign-in", async (req: Request, res: Response) => {
    try {
        const user = await collections.users.findOne({username: req.body.username});
        user ? scrypt(req.body.password, user.salt, 64, (error: Error, password: Buffer) => {
            if (error) throw error;
            if (user.password === password.toString("hex")) {
                req.session.userID = user._id;
                res.status(200).send('"signed in successfully"');
            } else {
                res.status(401).send('"invalid password"')
            }
        }) : res.status(404).send('"user not found"');
    } catch (error) {
        log.error(error);
        res.status(400).send(`"${error.message}"`);
    }
});

// API v1: /sign-out
//      method: POST
// description: Drop an authenticated session
//      params: none
//      output: 200 on successful log out, 500 + error message on error
index.post("/sign-out", authRequired, async (req: Request, res: Response) => {
    let error: any = null;
    req.session.destroy((err: any) => error = err);
    if (error) {
        log.error(new Error(error));
        res.status(500).send(`"${error.toString()}"`);
    } else {
        res.status(200).send('"signed out successfully"');
    }
});

export default index;