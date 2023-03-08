import { NextFunction, Request, Response } from 'express';

const methods =new Map([
    ["GET", "\x1b[32mGET \x1b[0m",],
    ["POST", "\x1b[35mPOST\x1b[0m",],
    ["DELETE", "\x1b[31mDEL \x1b[0m"]
]);

export const log = {
    ok: (message: string) => console.log(`+ ok: ${message}`),
    error: (error: Error) => console.log(`- error: ${error.message}`)
};

export const httpLog = async (req: Request, res: Response, next: NextFunction) => {
    res.on("finish", () => { 
        const status = res.statusCode;
        const date = `\x1b[34m${new Date().toLocaleString()}\x1b[0m`;
        const code = `\x1b[3${Math.floor(status / 100)}m${status}\x1b[0m`;
        console.log(`[${date}]: ${methods.get(req.method)} - ${code}: ${res.statusMessage} - ${req.originalUrl}`);
    });
    next();
};

export const authRequired = async (req: Request, res: Response, next: NextFunction) => {
    if (req.session.userID === undefined) {
        res.status(401).send('"unauthorized"');
    } else {
        next();
    }
};