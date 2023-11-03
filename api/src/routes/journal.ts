import { Router, Request, Response } from 'express';

import { JournalEntry } from '../models/journal';
import { authorized } from '../middleware';
import { collections } from '../config';

const route = Router();

route.get('/', authorized, async (request: Request, response: Response) => {
    try {
        response.status(200).json(request.user.journalEntries.slice(-30));
    } catch (error) {
        response.status(500).json({ error: "internal server error" });
        console.log(error);
    }
});

route.post('/', authorized, async (request: Request, response: Response) => {
    try {
        const { measurements, personalRecords, calculatorResult, macros, notes } = request.body;

        const journalEntries = request.user.journalEntries;
        const journalEntry = new JournalEntry(measurements, personalRecords, calculatorResult, macros, notes);

        if (journalEntries.length > 0) {
            journalEntries[0].date === journalEntry.date
                ? journalEntries[0] = journalEntry
                : journalEntries.unshift(journalEntry);
        } else {
            journalEntries.unshift(journalEntry); // unshift pushes an element to the front of a list
        }
    
        const updated = await collections.users.updateOne({ _id: request.user._id }, { $set: { journalEntries: journalEntries }});
        updated.modifiedCount > 0
            ? response.status(200).json({ ok: "updated today's journal entry" })
            : response.status(400).json({ error: "could not update journal" });
    } catch (error) {
        response.status(500).json({ error: "internal server error" });
        console.log(error);
    }
});

export default route;