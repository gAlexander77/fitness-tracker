import { Router, Request, Response } from 'express';
import { scrypt, randomBytes } from 'crypto';
import { ObjectId } from 'mongodb';

import { collections } from '../db';
import { User } from '../models/user';

const users = Router();
const filter = { projection: { password: 0, salt: 0 }}; // make sure not to show these

// API v1: /users/create
//      method: POST
// description: Create a new user
//      params: *username: string, *password: string, email: string, firstName: string, lastName: string, birthday: number
//      output: 200 + userID on success, 500 on mongo error, 400 on exception
users.post("/create", async (req: Request, res: Response) => {
    try {
        const salt = randomBytes(16).toString("hex");

        scrypt(req.body.password, salt, 64, async (error: Error, password: Buffer) => {
            if (error) throw error;
            
            const user: User = {
                username: req.body.username,
                email: req.body.email || '', // optional field 
                firstName: req.body.firstName || '', // optional
                lastName: req.body.lastName || '', // optional
                birthday: req.body.birthday || 0, // optional
                password: password.toString("hex"),
                salt: salt
            };

            const doc = await collections.users.insertOne(user as User);
            doc ? res.status(201).send(doc.insertedId)
                : res.status(500).send("creation failed");
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// API v1: /users/<id>
//      method: GET
// description: View user details based on ID
//      params: none
//      output: public information retaining to user with id=<id>
users.get("/:id", async (req: Request, res: Response) => {
    try {
        const id = new ObjectId(req?.params?.id);
        const user = await collections.users.findOne({ _id: id }, filter);
        user ? res.status(200).send(user)
             : res.status(404).send("user not found");
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message); 
    }
});

// API v1: /users/<id>
//      method: DELETE
// description: Remove user based on ID
//      params: none
//      output: 200 if successful, 400 if mongo error, 404 if invalid ID, 500 for exception
users.delete("/:id", async (req: Request, res: Response) => { 
    try {
        const id = new ObjectId(req?.params?.id);
        const result = await collections.users.deleteOne({ _id: id});
        if (result && result.deletedCount) res.status(200);
        else if (!result) res.status(400);
        else if (!result.deletedCount) res.status(404);
    } catch(error) { 
        res.status(500).send(error.message); 
    }
});

export default users;