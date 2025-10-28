import { type Request, type Response } from 'express';

type RequestWithId = Request & { id?: string };

export function sendResponse<T>(
    req: RequestWithId,
    res: Response,
    data: T[],
    success: boolean,
    statusCode?: number
) {
    const code = typeof statusCode === 'number' ? statusCode : (success ? 200 : 400);
    return res.status(code).json({
        success,
        data,
        requestid: req.id ?? undefined,
    });
}


