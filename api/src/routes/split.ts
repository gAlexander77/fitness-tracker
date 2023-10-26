import { Router, Request, Response } from 'express';
import { authorized } from '../middleware';

const route = Router();

route.get('/', authorized, async (req: Request, res: Response) => {
    try {
        res.status(200).json(req.user.workoutSplit);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" });
    }
});

export default route;