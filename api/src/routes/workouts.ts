import { Router, Request, Response } from 'express';
import { collections } from '../db';

const workouts = Router();
// const userWorkouts = async (id: ObjectId) => (await collections.users.fineOne({ _id: id})).workoutName

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

/*
workouts.post("/create", async (req: Request, res: Response) => {
    try{
        //get user session ID
        const id = new ObjectID(req.session._id);
        const workoutName = await userWorkouts(id);

        workoutName.forEach((Workout: Workout) => {
            if (Workout.workoutName === req.body.workoutName)
                throw new Error("group already exists");
        });
        //create a new class for a new workout to be added
        const workoutName = new Workout(req.body.workoutName);
        const updated = await collections.users.updateOne({ _id: id}, { $push: { workoutName: Workout}});
        updated.modifiedCount > 0
            ? res.status(200).json({ ok: "added workout"})
            : res.status(500).json({ error: "internal server error"});
    } catch(error) {
        res.status(400).json({error: error});
    }
    });
*/

export default workouts;
