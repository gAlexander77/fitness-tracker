import { Router, Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import { Workout, WorkoutGroup } from '../models/workout';
import { log, auth } from '../utils';
import { collections } from '../db';
import users from './users';

const splits = Router();
const userWorkoutGroups = async (id: ObjectId) => (await collections.users.findOne({ _id: id })).workoutGroups;

splits.use(auth);

// create a new split workout group
splits.post("/create", async (req: Request, res: Response) => {
    try {
        const id = new ObjectId(req.session._id);
        const workoutGroups = await userWorkoutGroups(id);

        workoutGroups.forEach((workoutGroup: WorkoutGroup) => {
            if (workoutGroup.groupName === req.body.groupName)
                throw new Error("group already exists");
        });

        const workoutGroup = new WorkoutGroup(req.body.groupName);
        const updated = await collections.users.updateOne({ _id: id }, { $push: { workoutGroups: workoutGroup } });
        updated.modifiedCount > 0
            ? res.status(200).json("ok")
            : res.status(500).json("internal server error");
      
    } catch (error) {
        res.status(400).json(error.message.endsWith("exists") ? error.message : "bad request");
    }
});

splits.post("/:id", async (req: Request, res: Response) => {
    try {
        const [uid, gid, wid] = [
            req.session._id, // user ID
            req.params.id,   // group ID
            req.body.workout // workout ID
        ].map(id => new ObjectId(id));

        const workout = await collections.workouts.findOne({ _id: wid });
        const workoutGroups = await userWorkoutGroups(uid);
    
        const workoutGroup = workoutGroups.find((workoutGroup: WorkoutGroup) => workoutGroup._id.equals(gid));

        if (workout && workoutGroup) {
            workoutGroup.workouts.forEach((workout: Workout) => {
                if (workout._id.equals(wid))
                    throw new Error("workout already exists");
            });

            workoutGroup.workouts.push(workout as Workout);
            await collections.users.updateOne({ _id: uid }, { $set: { workoutGroups: workoutGroups } })
                ? res.status(200).json("ok")
                : res.status(500).json("internal server error");
        } else {
            res.status(404).json(`${workout ? "workout group" : "workout"} not found`);
        }
    } catch (error) {
        res.status(400).json(error.message.endsWith("exists") ? error.message : "bad request");
    }
});

export default splits;
