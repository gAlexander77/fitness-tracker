// NPM
import request from 'supertest';
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
        connectToDatabase()
            .then(() => {
                app = initApp([{ path: "/users", router: users }]);
                app.listen(3001, "localhost", () => done());
            })
            .catch(log.error);
    });

    it("Creates a user", (done) => {
        request(app)
            .post("/api/users/create")
            .set("Content-Type", "application/json")
            .send({username: "hello", password: "world"})
            .expect("Content-Type", /json/)
            .end((error: Error, res: request.Response) => {
                userID = res.body;
                done(error);
            });
    });


    it("Queries a user", (done) => {
        request(app)
            .get(`/api/users/${userID}`)
            .expect("Content-Type", /json/)
            .end((error: Error, res: request.Response) => {
                expect(res.body._id).to.equal(userID);
                expect(res.body.username).to.equal("hello");
                done(error);
            })
    });

    it("Deletes a user", (done) => {
        request(app)
            .delete(`/api/users/${userID}`)
            .expect("Content-Type", /json/)
            .end((error: Error, res: request.Response) => {
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
