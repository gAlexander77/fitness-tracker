import { Router, Request, Response } from 'express';

import { JournalEntry } from '../models/journal';
import { authorized } from '../middleware';
import { collections } from '../config';

const route = Router();

route.get('/', authorized, async (req: Request, res: Response) => {
    try {
        res.status(200).json(req.user.journalEntries.slice(-30));
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" });
    }
});

route.post('/', authorized, async (req: Request, res: Response) => {
    try {
        const { measurements, personalRecords, calculatorResult, macros, notes } = req.body;

        const journalEntries = req.user.journalEntries;
        const journalEntry = new JournalEntry(measurements, personalRecords, calculatorResult, macros, notes);

        if (journalEntries.length > 0) {
            journalEntries[0].date === journalEntry.date
                ? journalEntries[0] = journalEntry
                : journalEntries.unshift(journalEntry);
        } else {
            journalEntries.unshift(journalEntry); // unshift pushes an element to the front of a list
        }
    
        const updated = await collections.users.updateOne({ _id: req.user._id }, { $set: { journalEntries: journalEntries }});
        updated.modifiedCount > 0
            ? res.status(200).json({ ok: "updated today's journal entry" })
            : res.status(400).json({ error: "could not update journal" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" });
    }
});

export default route;