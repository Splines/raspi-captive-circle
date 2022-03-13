import { Request, Response } from 'express';

export async function myTest(req: Request, res: Response) {
    res.status(200).send('Working fine here');
}
