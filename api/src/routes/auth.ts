// NPM
import { Router, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { scrypt } from 'crypto';

// local
import { collections } from '../db';

// create the auth route
const auth = Router();

// hacky way to add userIDs to sessions in TypeScript
declare module "express-session" {
    interface SessionData {
        userID?: ObjectId,
    }
}

// API v1: /auth/
//      method: GET
// description: Authentication index, simple status view
//      params: none
//      output: current session ID and logged in status
auth.get("/", async (req: Request, res: Response) => {
    res.status(200).send({
        sessionID: req.sessionID,
        loggedIn: "userID" in req.session,
    });
});

// API v1: /auth/sign-in
//      method: POST
// description: Authenticate a user and update their session
//      params: *email: string, *password: string
//      output: 200 response on successful authentication, 400 on exception, 404 on email not found
auth.post("/sign-in", async (req: Request, res: Response) => {
    try {
        const user = await collections.users.findOne({username: req.body.username});
        user ? scrypt(req.body.password, user.salt, 64, (error: Error, password: Buffer) => {
            if (error) throw error;
            if (user.password == password.toString("hex")) {
                req.session.userID = user._id;
                res.status(200).send("signed in successfully");
            }
        }) : res.status(404).send("user not found");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// API v1: /auth/sign-out
//      method: POST
// description: Drop an authenticated session
//      params: none
//      output: 200 on successful log out, 500 + error message on error
auth.post("/sign-out", async (req: Request, res: Response) => {
    req.session.userID = undefined;
    req.session.destroy((error: Error) => res.status(500).send(error.message));
    res.status(200).send("signed out successfully");
});

export default auth;
