import { Router, Request, Response } from 'express';
import { authorized } from '../middleware';
import { Settings } from '../models/user';
import { collections } from '../config';

const route = Router();

route.get('/', authorized, async (request: Request, response: Response) => {
    try {
        response.status(200).json(request.user.settings);
    } catch (error) {
        response.status(500).json({ error: "internal server error" });
        console.log(error);
    }
});

route.post('/', authorized, async (request: Request, response: Response) => {
    try {
        const settings = request.body as Settings;
        const updated = await collections.users.updateOne({ _id: request.user._id }, { $set: { settings: settings } });
        updated.modifiedCount > 0
            ? response.status(200).json(settings)
            : response.status(500).json({ error: "unable to update database" });
    } catch (error) {
        response.status(500).json({ error: "internal server error" });
        console.log(error);
    }
});

export default route;