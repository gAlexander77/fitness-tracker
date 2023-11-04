import { Request, Response, Router } from 'express';
import { scrypt } from 'crypto';

import { collections } from '../config';
import { authorized } from '../middleware';

const route = Router();

route.get("/", authorized, async (request: Request, response: Response) => {
    try {
        const weekdays: { [index:string]: number } = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
        const weekday: string = new Date().toLocaleString('default', { weekday: 'short' });
        const today: number = weekdays[weekday];
        const { _id, username, workoutSplit } = request.user;
        response.status(200).json({ id: _id, username, currentSplit: workoutSplit[today] });
    } catch (error) {
        response.status(500).json({ error: error || "internal server error" })
        console.log(error);
    }
});

route.get("/calendar", authorized, async (request: Request, response: Response) => {
    try {
        const { workoutSplit, workoutGroups, journalEntries } = request.user;
        response.status(200).json({ 
            calendar: { workoutSplit, workoutGroups }, 
            journal: journalEntries
        });
    } catch (error) {
        response.status(500).json({ error: error || "internal server error" });
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
        response.status(500).json({ error: error || "internal server error" });
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