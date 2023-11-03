import { Router, Request, Response } from 'express';
import { authorized } from '../middleware';
import { collections } from '../config';

const route = Router();

route.get('/', authorized, async (request: Request, response: Response) => {
    try {
        response.status(200).json(request.user.workoutSplit);
    } catch (error) {
        response.status(500).json({ error: "internal server error" });
        console.log(error);
    }
});

route.get('/workouts', authorized, async (request: Request, response: Response) => {
    try {
        response.status(200).json(request.user.workoutGroups);
    } catch (error) {
        response.status(500).json({ error: "internal server error" });
        console.log(error);
    }
});

route.post('/', authorized, async (request: Request, response: Response) => {
    try {
        let workoutSplit = request.body.workoutSplit.slice(0, 7);
        if (workoutSplit.length < 7) {
            workoutSplit = workoutSplit.concat(new Array(7 - workoutSplit.length).fill("rest"));
        }
        const updated = await collections.users.updateOne({ _id: request.user._id }, { $set: { workoutSplit: workoutSplit }});
        updated.modifiedCount > 0
            ? response.status(200).json({ ok: "updated weekly split" })
            : response.status(400).json({ error: "unable to update weekly split" })
    } catch (error) {
        response.status(500).json({ error: "internal server error" });
        console.log(error);
    }
});

route.post('/workouts', authorized, async (request: Request, response: Response) => {
    response.status(200).json({ ok: "not implemented yet" });
});

export default route;