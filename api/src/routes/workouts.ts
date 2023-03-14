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

// TODO:
//   we need a way to save custom workouts for
//   an authenticated user
//   the details of how this will work might require some
//   aditional conversation amongst everyone
workouts.post("/create", async (req: Request, res: Response) => {
	res.status(501).send('"TODO"')
});

export default workouts;
