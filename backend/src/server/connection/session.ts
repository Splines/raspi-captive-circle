import { NextFunction, Request, Response } from 'express';
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

function isAuthenticatedCheck(req: Request) {
    return req.session.userId != null;
}

export async function isAuthenticated(req: Request): Promise<boolean> {
    return new Promise((resolve) => {
        sessionParser(req, {} as Response, () => {
            resolve(isAuthenticatedCheck(req));
        });
    });
}

export async function isAuthenticatedMiddleware(req: Request, res: Response, next: NextFunction) {
    sessionParser(req, {} as Response, () => {
        if (!isAuthenticatedCheck(req)) {
            return res.status(401).send('Not authenticated');
        }
        next();
    })
}
