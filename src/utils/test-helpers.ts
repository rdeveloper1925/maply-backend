import type { Request, Response } from 'express';
import { vi } from 'vitest';

export interface MockRequest extends Partial<Request> {
    id?: string;
}

export interface MockResponse extends Partial<Response> {
    _getStatusCode?: () => number;
    _getJSONData?: () => unknown;
}

export function createMockRequest(overrides?: Partial<MockRequest>): MockRequest {
    return {
        id: 'test-request-id',
        method: 'GET',
        url: '/',
        headers: {},
        params: {},
        query: {},
        body: {},
        ...overrides,
    };
}

export function createMockResponse(): MockResponse {
    let statusCode = 200;
    let jsonData: unknown;

    const mockRes: MockResponse = {
        status: vi.fn(function (code: number) {
            statusCode = code;
            return mockRes;
        }),
        json: vi.fn(function (data: unknown) {
            jsonData = data;
            return mockRes;
        }),
        setHeader: vi.fn().mockReturnThis(),
        _getStatusCode: () => statusCode,
        _getJSONData: () => jsonData,
    };

    return mockRes;
}
