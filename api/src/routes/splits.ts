import { Router, Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import { WorkoutGroup } from '../models/workout';
import { authRequired } from '../utils';
import { collections } from '../db';
import { Workout } from '../models/workout';

const splits = Router();

const testData = [
    new Workout(
        "Pull ups",
        ["1", "2"],
        "/public/pullups/image.png",
        "they will get you pussy",
        "/public/pullups/video.mp4"
    )
];

splits.use(authRequired);

// create a new split workout group
splits.post("/create", async (req: Request, res: Response) => {
    if (req.body.groupName !== undefined) {
        const id = new ObjectId(req.session.userID);
        const workoutGroup = new WorkoutGroup(req.body.groupName, testData);
        await collections.users.updateOne({ _id: id }, { $push: { workoutGroups: workoutGroup } })
            ? res.status(200).send('"added a workout group"')
            : res.status(500).send('"error adding workour group"');
    } else {
        res.status(400).send('"invalid request"');
    }
});

export default splits;