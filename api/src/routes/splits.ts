import e, { Router, Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import { WorkoutGroup } from '../models/workout';
import { log, authRequired } from '../utils';
import { collections } from '../db';
import { Workout } from '../models/workout';

const splits = Router();

splits.use(authRequired);

// create a new split workout group
splits.post("/create", async (req: Request, res: Response) => {
    if (req.body.groupName !== undefined) {
        const id = new ObjectId(req.session.userID);
        const workoutGroup = new WorkoutGroup(req.body.groupName);
        await collections.users.updateOne({ _id: id }, { $push: { workoutGroups: workoutGroup } })
            ? res.status(200).send('"added a workout group"')
            : res.status(500).send('"error adding workour group"');
    } else {
        res.status(400).send('"invalid request"');
    }
});

// add workout to split
splits.post("/:id", async (req: Request, res: Response) => {
    try {
        const uid = new ObjectId(req.session.userID);
        const gid = new ObjectId(req?.params?.id);
        const user = await collections.users.findOne({ _id: uid }, { projection: { workoutGroups: 1 }});
        const workoutGroups = user.workoutGroups;
        const workoutGroup = workoutGroups.find((workoutGroup: WorkoutGroup) => workoutGroup._id.equals(gid));
        if (workoutGroup == undefined) {
            res.status(404).send('"workout group not found"');
        } else if (req.body.workout) {
            const wid = new ObjectId(req.body.workout);
            const workout = await collections.workouts.findOne({ _id: wid });
            if (workout == undefined) {
                res.status(404).send('"workout not found"');
            } else {
                const exists = workoutGroup.workouts.find((workout: Workout) => workout._id.equals(wid));
                if (exists) {
                    res.status(400).send('"workout already added"');
                } else {
                    workoutGroup.workouts.push(workout as Workout);
                    await collections.users.updateOne({ _id: uid }, { $set: { workoutGroups: workoutGroups }})
                        ? res.status(200).send(`"workout added to ${workoutGroup.groupName}"`)
                        : res.status(500).send('"database error"');
                }
            }
        } else {
            res.status(400).send('"invalid request"');
        }
    } catch (error) {
        log.error(error);
        res.status(400).send('"invalid request"');
    }
});

export default splits;