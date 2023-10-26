import { Router, Request, Response } from 'express';
import { collections } from '../config';

const route = Router();

route.get("/", async (req: Request, res: Response) => {
    try {
        const [ skip, limit ] = [ 'skip', 'limit' ].map(key => parseInt(req.query[key] as string));
        const result = collections.workouts.aggregate([{ $skip: skip || 0 }, { $limit: limit || 10 }]);
        result
            ? res.status(200).json(await result.toArray())
            : res.status(404).json({ error: "no workouts found" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" });
    }
});

export default route;