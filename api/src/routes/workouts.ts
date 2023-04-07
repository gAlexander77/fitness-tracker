import { Router, Request, Response } from 'express';
import { collections } from '../db';
import { log } from '../utils';

const workouts = Router();

workouts.post("/create", async (req: Request, res: Response) => {
    res.status(200).json("TODO");
});

workouts.get("/", async (_req: Request, res: Response) => {
    try {
        res.status(200).json(await collections.workouts.find({}).toArray());
    } catch (error) {
        log.error(error);
        res.status(500).json("internal server error");
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
