import { Router, Request, Response } from 'express';

import { collections } from '../config';
import { authorized } from '../middleware';
import { JournalEntry, Macro, Measurement, PersonalRecord, Note } from '../models/journal';

const route = Router();

const loadJournalEntries = (request: Request) => {
    const journalEntries = request.user.journalEntries;

    const todaysDate = (new Date().toLocaleDateString('en-us', {timeZone: request.user.settings.tz})).replaceAll('/', '-');
    const todaysEntry = new JournalEntry(todaysDate);

    if (journalEntries.length === 0 || journalEntries[0]?.date !== todaysDate)
        journalEntries.unshift(todaysEntry); // add today if it's not the most recent

    return journalEntries;
};

const updateJournalEntries = async (request: Request, journalEntries: Array<JournalEntry>) => {
    const updated = await collections.users.updateMany({ _id: request.user._id }, { $set: { journalEntries: journalEntries }});
    return updated.modifiedCount > 0;
};

route.get('/', authorized, async (request: Request, response: Response) => {
    try {
        response.status(200).json(request.user.journalEntries.slice(-30));
    } catch (error) {
        response.status(500).json({ error: error || "internal server error" });
        console.log(error);
    }
});

route.post('/macro', authorized, async (request: Request, response: Response) => {
    try {
        const journalEntries = loadJournalEntries(request);
        const calories = request.body.macros[0] as Macro;
        const macros = request.body.macros.slice(1) as Array<Macro>;

        // calculate new total
        const totalCals = parseFloat(journalEntries[0].macros[0].amount) + (parseFloat(calories.amount) || 0);
        
        journalEntries[0].macros[0].amount = totalCals.toString(); // update total amount
        journalEntries[0].macros = journalEntries[0].macros.concat(macros); // concatenate macro list
        updateJournalEntries(request, journalEntries)
            ? response.status(200).json({ ok: "updated today's macros" })
            : response.status(500).json({ error: "database error" });
    } catch (error) {
        response.status(500).json({ error: "internal server error" });
        console.log(error);
    }
});

route.post('/measurement', authorized, async (request: Request, response: Response) => {
    try {
        const journalEntries = loadJournalEntries(request);
        journalEntries[0].measurements.push(request.body.measurement as Measurement);
        updateJournalEntries(request, journalEntries)
            ? response.status(200).json({ ok: "updated today's measurements" })
            : response.status(500).json({ error: "database error" });
    } catch (error) {
        response.status(500).json({ error: "internal server error" });
        console.log(error);
    }
});

route.post('/personal-record', authorized, async (request: Request, response: Response) => {
    try {
        const journalEntries = loadJournalEntries(request);
        journalEntries[0].personalRecords.push(request.body.personalRecord as PersonalRecord);
        updateJournalEntries(request, journalEntries)
            ? response.status(200).json({ ok: "updated today's measurements" })
            : response.status(500).json({ error: "database error" });
    } catch (error) {
        response.status(500).json({ error: "internal server error" });
        console.log(error);
    }
});

route.post('/calculator-result', authorized, async (_request: Request, response: Response) => {
    response.status(200).json({ ok: "nothing happens" });
});

route.post('/note', authorized, async (request: Request, response: Response) => {
    try {
        const journalEntries = loadJournalEntries(request);
        journalEntries[0].notes.push(request.body.note as Note);
        updateJournalEntries(request, journalEntries)
            ? response.status(200).json({ ok: "updated today's notes" })
            : response.status(500).json({ error: "database error" });
    } catch (error) {
        response.status(500).json({ error: "internal server error" });
        console.log(error);
    }
});

export default route;