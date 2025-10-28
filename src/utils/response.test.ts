import { describe, expect, it } from 'vitest';
import { sendResponse } from './response.js';
import { createMockRequest, createMockResponse } from './test-helpers.js';

describe('sendResponse', () => {
    it('should send a successful response with default status code 200', () => {
        const req = createMockRequest();
        const res = createMockResponse();
        const data = [{ id: 1, name: 'Test' }];

        sendResponse(req, res, data, true);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data,
            requestid: 'test-request-id',
        });
    });

    it('should send a failed response with default status code 400', () => {
        const req = createMockRequest();
        const res = createMockResponse();
        const data = [{ error: 'Something went wrong' }];

        sendResponse(req, res, data, false);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            data,
            requestid: 'test-request-id',
        });
    });

    it('should use custom status code when provided', () => {
        const req = createMockRequest();
        const res = createMockResponse();
        const data = [{ id: 1 }];

        sendResponse(req, res, data, true, 201);

        expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should handle requests without request id', () => {
        const req = createMockRequest({ id: undefined });
        const res = createMockResponse();
        const data = [];

        sendResponse(req, res, data, true, 204);

        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: [],
            requestid: undefined,
        });
    });
});
