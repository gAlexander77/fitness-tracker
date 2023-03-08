import e, { Router, Request, Response } from 'express';
import { scrypt, randomBytes } from 'crypto';
import { ObjectId } from 'mongodb';

import { authRequired } from '../utils';
import { collections } from '../db';
import User from '../models/user';

// use this options list to filter out the password and salt
// from all database queries
export const usersFilter = { projection: { password: 0, salt: 0 }};

// users router
const users = Router();

// API v1: /users/create
//      method: POST
// description: Create a new user
//      params: *username: string, *password: string, email: string, firstName: string, lastName: string, birthday: number
//      output: 200 + userID on success, 500 on mongo error, 400 on exception
users.post("/create", async (req: Request, res: Response) => {
    if (! (req.body.username && req.body.password)) {
        res.status(400).send('"missing username or password"')
    } else if (req.headers['content-type'].toLowerCase() !== "application/json") {
        res.status(400).send('"must be a JSON request"');
    } else {
        const salt = randomBytes(16).toString("hex");
        scrypt(req.body.password, salt, 64, async (scryptError: Error, password: Buffer) => {
            try {
                if (scryptError) throw scryptError;

                const user = new User(req.body.username, password.toString("hex"), salt);
                const document = await collections.users.insertOne(user as User);
                
                document 
                    ? res.status(201).send(document.insertedId)
                    : res.status(500).send("creation failed");
            } catch (error) {
                res.status(400).send(error.message);
            }
        });
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
        const user = await collections.users.findOne({ _id: id }, usersFilter);
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
users.delete("/:id", authRequired, async (req: Request, res: Response) => { 
    try {
        const ruid = new ObjectId(req?.params?.id);
        const suid = new ObjectId(req.session.userID);
        if (ruid == suid) {
            const result = await collections.users.deleteOne({ _id: ruid });
            if (result && result.deletedCount) res.status(200).send(suid);
            else if (!result) res.status(400).send("error");
            else if (!result.deletedCount) res.status(404).send("user does not exist");
        } else {
            res.status(401).send('"not the same user"')
        }
    } catch(error) { 
        res.status(500).send(error.message); 
    }
});

export default users;
