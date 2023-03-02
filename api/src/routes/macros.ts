import { Router, Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import { collections } from '../db';
import Macro from '../models/macro';

const macros = Router();

macros.post("/create", async (req: Request, res: Response) => {
    if (req.session.userID === undefined) {
        res.status(401).send('"unauthorized"');
    } else {
        try {
            const macro = req.body as Macro;
            macro.date = new Date();
    
            const id = new ObjectId(req.session.userID);
            await collections.users.updateOne({ _id: id }, { $push: {"macros": macro} })
                ? res.status(200).send('"added macro to database"')
                : res.status(400).send('"error adding macro"')
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
});

export default macros;