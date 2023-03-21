import { Router, Request, Response } from 'express';
import { scrypt, randomBytes } from 'crypto';
import { ObjectId } from 'mongodb';

import { collections } from '../db';

import { log } from '../utils';
import User from '../models/user';

export const usersFilter = { projection: { password: 0, salt: 0 }};

const users = Router();

users.get("/", async (_req: Request, res: Response) => {
    try {
        res.status(200).json(await collections.users.find({}, usersFilter).toArray());
    } catch (error) {
        log.error(error);
        res.status(500).json("internal server error");
    }
});

users.get("/:id", async (req: Request, res: Response) => {
    try {
        const user = await collections.users.findOne({ _id: new ObjectId(req.params.id) }, usersFilter);
        user 
            ? res.status(200).json(user)
            : res.status(404).json("not found");
    } catch (error) {
        res.status(400).json("bad request");
    }
});

users.post("/create", async (req: Request, res: Response) => {
    try {
        const salt = randomBytes(16).toString("hex");
        scrypt(req.body.password, salt, 64, async (_error: Error, buffer: Buffer) => {    
            const user = new User(req.body.username, buffer.toString("hex"), salt);
            await collections.users.insertOne(user)
                ? res.status(200).send("ok")
                : res.status(500).json("internal server error");
        });
    } catch (error) {
        res.status(400).json("bad request");
    }
});

// Delete user
users.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deleteResult = await collections.users.deleteOne({ _id: new ObjectId(req.params.id) });
    if (deleteResult.deletedCount === 0) {
      res.status(404).json("not found");
    } else {
      res.status(200).send("ok");
    }
  } catch (error) {
    res.status(500).json("internal server error");
  }
});

export default users;
