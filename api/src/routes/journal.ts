import { Router, Request, Response } from 'express';

import { JournalEntry, Macro, Note } from '../models/journal';
import { authorized } from '../middleware';
import { collections } from '../config';

const route = Router();

route.get('/', authorized, async (request: Request, response: Response) => {
    try {
        response.status(200).json(request.user.journalEntries.slice(-30));
    } catch (error) {
        response.status(500).json({ error: error || "internal server error" });
        console.log(error);
    }
});

const loadJournalEntries = (request: Request) => {
    const journalEntries = request.user.journalEntries;
    const todaysEntry = new JournalEntry();

    if (journalEntries.length === 0 || journalEntries[0]?.date !== todaysEntry.date)
        journalEntries.unshift(todaysEntry); // add today if it's not the most recent

    return journalEntries;
};

route.post('/macro', authorized, async (request: Request, response: Response) => {
    try {
        const journalEntries = loadJournalEntries(request);
        const macros = request.body.macros as Array<Macro>;

        const totalCals = parseFloat(journalEntries[0].macros[0].amount) + (parseFloat(macros[0].amount) || 0);
        journalEntries[0].macros[0].amount = totalCals.toString();

        journalEntries[0].macros = journalEntries[0].macros.concat(request.body.macros.slice(1) as Array<Macro>);

        const updated = await collections.users.updateMany({ _id: request.user._id }, { $set: { journalEntries: journalEntries }});
        updated.modifiedCount > 0
            ? response.status(200).json({ ok: "updated today's journal entry" })
            : response.status(400).json({ error: "could not update journal" });
        console.log(updated);
    } catch (error) {
        response.status(500).json({ error: "internal server error" });
        console.log(error);
    }
});

route.post('/measurement', authorized, async (request: Request, response: Response) => {
    response.status(200).json({ ok: "nothing happens" });
});

route.post('/personal-record', authorized, async (request: Request, response: Response) => {
    response.status(200).json({ ok: "nothing happens" });
});

route.post('/calculator-result', authorized, async (request: Request, response: Response) => {
    response.status(200).json({ ok: "nothing happens" });
});

route.post('/note', authorized, async (request: Request, response: Response) => {
    try {
        const journalEntries = loadJournalEntries(request);

        journalEntries[0].notes.push(request.body.note as Note);

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