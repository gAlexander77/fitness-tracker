import { Router, Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import { Workout, WorkoutGroup } from '../models/workout';
import { log, auth } from '../utils';
import { collections } from '../db';
import users from './users';

const splits = Router();
const userWorkoutGroups = async (id: ObjectId) => (await collections.users.findOne({ _id: id })).workoutGroups;

splits.use(auth);

// create a new split workout group
splits.post("/create", async (req: Request, res: Response) => {
    try {
        const id = new ObjectId(req.session._id);
        const workoutGroups = await userWorkoutGroups(id);

        workoutGroups.forEach((workoutGroup: WorkoutGroup) => {
            if (workoutGroup.groupName === req.body.groupName)
                throw new Error("group already exists");
        });

        const workoutGroup = new WorkoutGroup(req.body.groupName);
        const updated = await collections.users.updateOne({ _id: id }, { $push: { workoutGroups: workoutGroup } });
        updated.modifiedCount > 0
            ? res.status(200).json("ok")
            : res.status(500).json("internal server error");
      
    } catch (error) {
        res.status(400).json(error.message.endsWith("exists") ? error.message : "bad request");
    }
});

splits.post("/:id", async (req: Request, res: Response) => {
    try {
        const [uid, gid, wid] = [
            req.session._id, // user ID
            req.params.id,   // group ID
            req.body.workout // workout ID
        ].map(id => new ObjectId(id));

        const workout = await collections.workouts.findOne({ _id: wid });
        const workoutGroups = await userWorkoutGroups(uid);
    
        const workoutGroup = workoutGroups.find((workoutGroup: WorkoutGroup) => workoutGroup._id.equals(gid));

        if (workout && workoutGroup) {
            workoutGroup.workouts.forEach((workout: Workout) => {
                if (workout._id.equals(wid))
                    throw new Error("workout already exists");
            });

            workoutGroup.workouts.push(workout as Workout);
            await collections.users.updateOne({ _id: uid }, { $set: { workoutGroups: workoutGroups } })
                ? res.status(200).json("ok")
                : res.status(500).json("internal server error");
        } else {
            res.status(404).json(`${workout ? "workout group" : "workout"} not found`);
        }
    } catch (error) {
        res.status(400).json(error.message.endsWith("exists") ? error.message : "bad request");
    }
});


// TODO:
//   we need a way to update the 'workoutSplit'
//   field in the current user's document
//   1. accept a JSON post that contains a string array of size 7; size check at line 89
//   2. loop through user-supplied array and make sure
//      all strings are valid names of a workoutGroup
splits.post("/days", async (req: Request, res: Response) => { // /update instead of /days? unless this is front end POST

    try{
        // we will receive the weekly split as an array of WorkoutGroup object types. We will set the groupName and use these 
        const [uid, gid] = [
            req.session._id, // user ID
            req.params.id,   // group ID
        ].map(id => new ObjectId(id));

        // we need to retrieve the users' splits. Create a workoutGroup
        const weeklySplit = new Array<string>(req.body.groupName);

        const workoutGroups = await userWorkoutGroups(uid);

        const databaseWOGroups = workoutGroups.find((workoutGroup: WorkoutGroup) => workoutGroup._id.equals(gid));

        if(weeklySplit.length == 7) {

            weeklySplit.forEach((dailySplitGroupName : String) =>  {
            // we just need to validate that each entry is a valid group name
                if(dailySplitGroupName !== databaseWOGroups.groupName){
                    throw new Error("Invalid Group Exercise Name")
                }
           });
            
            } else{
            throw new Error("Weekly Workout Split incomplete");
        }
    }
    catch (error) {
        res.status(400).json(error.message.endsWith("exists") ? error.message : "bad request");
    }
});



export default splits;
