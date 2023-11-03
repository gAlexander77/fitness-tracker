import { Request, Response, Router } from 'express';
import { scrypt } from 'crypto';

import { collections } from '../config';
import { authorized } from '../middleware';

const route = Router();

route.get("/", authorized, async (request: Request, response: Response) => {
    try {
        const { _id, username } = request.user;
        response.status(200).json({ id: _id, username });
    } catch (error) {
        response.status(500).json({ error: "internal server error" })
        console.log(error);
    }
});

route.post("/sign-in", async (request: Request, response: Response) => {
    try {
        const { username, password } = request.body;
        const user = await collections.users.findOne({ username });
        if (user) {
            scrypt(password, user.salt, 64, (_error: Error, buffer: Buffer) => {
                if (user.password === buffer.toString("hex")) {
                    request.session._id = user._id;
                    response.status(200).json({ ok: "signed in successfully" })
                } else {
                    response.status(401).json({ error: "unauthorized" });
                }
            });
        } else {
            response.status(401).json({ error: "unauthorized" });
        }
    } catch (error) {
        response.status(500).json({ error: "internal server error" });
        console.log(error);
    }
});

route.post("/sign-out", authorized, async (req: Request, res: Response) => {
    try {
        req.session.destroy((error: Error) => console.log(error));
        res.status(200).json({ ok: "signed out successfully" });
    } catch (error) {
        res.status(500).json({ error: "internal server error" });
        console.log(error);
    }
});

export default route;