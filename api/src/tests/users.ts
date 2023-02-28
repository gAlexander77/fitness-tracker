// NPM
import request, { Response } from 'supertest';
import { Express } from 'express';
import { expect } from 'chai';

// local
import { connectToDatabase } from '../db';
import { initApp } from '../setup';
import { log } from '../utils';

import users from '../routes/users';

describe("Testing 'users' route", () => {

    var app: Express;
    var userID: string;

    before((done) => {
        connectToDatabase("testing")
            .then(() => {
                app = initApp([{ path: "/", router: users }]);
                app.listen(3001, "localhost", () => done());
            })
            .catch(log.error);
    });

    it("Creates a user", (done) => {
        request(app)
            .post("/api/create")
            .set("Content-Type", "application/json")
            .send({username: "hello", password: "world"})
            .expect("Content-Type", /json/)
            .end((error: Error, res: Response) => {
                userID = res.body;
                done(error);
            });
    });

    it("Queries a user", (done) => {
        request(app)
            .get(`/api/${userID}`)
            .expect("Content-Type", /json/)
            .end((error: Error, res: Response) => {
                expect(res.body._id).to.equal(userID);
                expect(res.body.username).to.equal("hello");
                done(error);
            })
    });

    it("Deletes a user", (done) => {
        request(app)
            .delete(`/api/${userID}`)
            .expect("Content-Type", /json/)
            .end((error: Error, res: Response) => {
                expect(res.body).to.be.a("string");
                done(error);
            });
    });

    // for some reason, Express doesn't close by itself
    after(() => {
        setTimeout(() => {
            process.exit(0);
        }, 500);
    });
});
