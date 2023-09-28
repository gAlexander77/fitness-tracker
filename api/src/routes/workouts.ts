import { Router, Request, Response } from 'express';
import { Workout } from '../models/workout';
import { collections } from '../db';
import { ObjectId } from 'mongodb';

const workouts = Router();
const userWorkouts = async (id: ObjectId) => (await collections.users.findOne({ _id: id})).customWorkouts;

workouts.get("/", async (_req: Request, res: Response) => {
    try {
        res.status(200).json(await collections.workouts.find({}).toArray());
    } catch (error) {
        res.status(500).json({error: "internal server error"});
    }
});

workouts.get("/:name", async (req: Request, res: Response) => {
	try {
		const title = req.params?.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
		const workout = await collections.workouts.findOne({ workoutName: title });
		
		workout
			? res.status(200).json(workout)
			: res.status(404).json({ error: "workout not found" });
	} catch (error) {
		res.status(400).json({ error: "invalid request" });
	}
});

workouts.post("/create", async (req: Request, res: Response) => {
    try{
        //get user session ID
        const id = new ObjectId(req.session._id);

        // cast the request body (passed in JSON) to a new workout to be added
        const customWorkout = req.body as Workout;

        const workouts = await userWorkouts(id);
		for (let workout in workouts) {
			if (workouts[workout].workoutName === customWorkout.workoutName)
				throw new Error('custom workout with that name already exists');
		}

        const updated = await collections.users.updateOne({ _id: id}, { $push: { customWorkouts: customWorkout }});
        updated.modifiedCount > 0
            ? res.status(200).json({ ok: "added workout"})
            : res.status(500).json({ error: "internal server error"});
    } catch(error) {
        res.status(400).json({ error });
    }
});

export default workouts;
