// this script is intended to be standalone from the rest of the project
// it's sole purpose is to provide provisioning and utilities for setting
// up the mongo database. nothing in here should be imported to the rest
// of the project
import { connectToDatabase, createCollections, deleteCollections } from './db';
import { Db } from 'mongodb'

import { DB, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD } from './index';

// I keep handling errors the same way so let's abstract into a function
const handleError = (error: Error) => console.log(`- error: ${error.message}`);

// map of possible arguments, and their intended functions
const args: Map<string, (db: Db) => Promise<void>> = new Map([
    ["initdb", createCollections], // initializes all the collections we need and their schemas
    ["nukedb", deleteCollections] // removes all collections we need from the database
]);

// firstly, connect to the mongo database
connectToDatabase(DB, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD)
    .then((db: Db) => {
        // get the last argument
        const arg = process.argv[process.argv.length - 1];

        // if it's not a valid argument, probably not calling from
        // npm, but still output this error anyway
        if (!args.has(arg)) {
            console.log("- error: argument must be one of these");
            args.forEach((_, option) => console.log(`-> ${option}`));
            process.exit(0);
        }  
        
        // call the requested function promise
        args.get(arg)(db)
            .then(() => console.log("+ success"))
            .catch(handleError)
            .finally(() => process.exit(0));
    })
    .catch(handleError);