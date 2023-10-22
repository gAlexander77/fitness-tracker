import { Router, Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import { Journal } from '../models/journal';

import { collections } from '../db';
import { auth } from '../utils';

const journals = Router();

journals.use(auth);

journals.post('/', async (req: Request, res: Response) => {
    const uid = new ObjectId(req.session._id);
    const journalEntry = req.body as Journal;
    try {
        const updated = await collections.users.updateOne({ $id: uid }, { $push: { journalEntries: journalEntry }});
        updated.modifiedCount > 0
            ? res.status(200).json({ ok: "added journal entry" })
            : res.status(500).json({ error: "internal server error" });
    } catch(error) {
        res.status(500).json({ error: error });
    }
});

// Route accessing last 30 journal entries
journals.get('/', async (req: Request, res: Response) => {
    const uid = new ObjectId(req.session._id);
    try {
        const user = await collections.users.findOne({ _id: uid });

        // get last 30 records from an authenticated user, otherwise return 404
        if (user) {
            const journalEntries = user.journalEntries.slice(-30);
            res.status(200).json(journalEntries);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

export default journals;