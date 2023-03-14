import { Router, Request, Response } from 'express';
import { collections } from '../db';
import { log } from '../utils';

const workouts = Router();

workouts.get("/", async (_req: Request, res: Response) => {
    try {
        res.status(200).json(await collections.workouts.find({}).toArray());
    } catch (error) {
        log.error(error);
        res.status(500).json("internal server error");
    }
});

/// TODO: make a way for users to create custom workouts

export default workouts;