import { Request, Response } from 'express';
import session from "express-session";

declare module "express-session" {
    interface Session {
        userId?: string;
    }
}

export const sessionParser = session({
    secret: 'very $eCrET captive circle ',
    name: 'captive-circle-sid',
    resave: false,
    saveUninitialized: false,
    // we set the cookie to secure:false as we don't serve an HTTPS connection
    cookie: { secure: false, httpOnly: false } // session ID cookie
});

export async function checkAuthorization(req: Request): Promise<boolean> {
    return new Promise((resolve) => {
        sessionParser(req, {} as Response, () => {
            const isAuthorized = req.session.userId != null;
            resolve(isAuthorized);
        });
    });
}
