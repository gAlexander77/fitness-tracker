import { Router, Request, Response } from 'express';
import { collections } from '../db';
import { log } from '../utils';

const workouts = Router();

workouts.get("/", async (_req: Request, res: Response) => {
    try {
        const workouts = await collections.workouts.find({}).toArray();
        workouts
            ? res.status(200).send(workouts)
            : res.status(404).send('"no workouts exist"');
    } catch (error) {
        res.status(500).send('"server error"')
    }
});

export default workouts;