import { sendResponse } from '@/utils/response.js';
import { type NextFunction, type Request, type Response } from 'express';

export const notFoundMiddleware = (
    req: Request,
    res: Response,
    _next: NextFunction,
) => {
    return sendResponse(req, res, [
        { path: req.originalUrl, message: 'Not Found' },
    ], false, 404);
}