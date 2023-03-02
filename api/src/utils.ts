import { NextFunction, Request, Response } from 'express';


export const log = {
    ok: (message: string) => console.log(`+ ok: ${message}`),
    error: (error: Error) => console.log(`- error: ${error.message}`)
};

export const httpLog = async (req: Request, res: Response, next: NextFunction) => {
    res.on("finish", () => {
        let status = res.statusCode;
        let date = new Date().toLocaleString();
        let code = Math.floor(status / 100) == 2 
            ? `\x1b[32m${status}\x1b[0m`
            : "\x1b[31m"+status+"\x1b[0m";
        console.log(`[${date}]: ${req.method} - ${code}, ${res.statusMessage} - ${req.originalUrl}`);
    });
    next();
}