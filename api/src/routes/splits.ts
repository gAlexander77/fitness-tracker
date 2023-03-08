import { Router, Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import { WorkoutGroup } from '../models/workout';
import { authRequired } from '../utils';
import { collections } from '../db';

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
        res.status(400).send('"invalid request"')
    }
});

// add a workout to a group
splits.post("/:id", async (req: Request, res: Response) => {});

export default splits;