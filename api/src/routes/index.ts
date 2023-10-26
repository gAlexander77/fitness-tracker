import { Request, Response, Router } from 'express';
import { scrypt } from 'crypto';

import { collections } from '../config';
import { authorized } from '../middleware';

const route = Router();

route.post("/sign-in", async (req: Request, res: Response) => {
    try {
        const user = await collections.users.findOne({username: req.body.username});
        user ? scrypt(req.body.password, user.salt, 64, (_error: Error, buffer: Buffer) => {
            
            const authenticated = user.password === buffer.toString("hex");
            req.session._id = authenticated ? user._id : undefined;
            authenticated
                ? res.status(200).json({ ok: "signed in successfully" })
                : res.status(401).json({ error: "unauthorized" });

        }) : res.status(401).json({ error: "unauthorized" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" });
    }
});

route.post("/sign-out", authorized, async (req: Request, res: Response) => {
    try {
        req.session.destroy((error: Error) => console.log(error));
        res.status(200).json({ ok: "signed out successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" });
    }
});

export default route;