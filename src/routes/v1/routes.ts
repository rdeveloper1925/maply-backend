import { sendResponse } from '@/utils/response.js';
import { Router, type Request, type Response } from 'express';

const router: Router = Router();

router.get('/items', (req: Request, res: Response) => {
    return sendResponse(req, res, [{ id: 1, name: 'Alpha' }], true);
});

router.post('/items', (req: Request, res: Response) => {
    return sendResponse(req, res, [req.body], true, 201);
});

router.put('/items/:id', (req: Request, res: Response) => {
    return sendResponse(req, res, [{ id: req.params.id, ...req.body }], true);
});

router.delete('/items/:id', (req: Request, res: Response) => {
    return sendResponse(req, res, [], true, 204);
});

export default router;


