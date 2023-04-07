import { Router, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { collections } from '../db';
import { log } from '../utils';

const workouts = Router();

workouts.get("/", async (_req: Request, res: Response) => {
    try {
        res.status(200).json(await collections.workouts.find({}).toArray());
    } catch (error) {
        log.error(error);
        res.status(500).json({error: "internal server error"});
    }
});

workouts.get("/:name", async (req: Request, res: Response) => {
	try {
		const title = req.params?.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
		console.log(title);
		const workout = await collections.workouts.findOne({ workoutName: title });
		workout
			? res.status(200).json(workout)
			: res.status(404).json({error: "workout not found"});
	} catch (error) {
		res.status(400).json({error: "invalid request"});
	}
});

export default workouts;