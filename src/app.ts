import config from '@/config/index.js';
import { sendResponse } from '@/utils/response.js';
import { notFoundMiddleware } from './middleware/middleware.js';
import v1Routes from './routes/v1/routes.js';
//import { errorMiddleware } from '@/middlewares/error.middleware';
//import { notFoundMiddleware } from '@/middlewares/notFound.middleware';
//import routes from '@/routes';
//import { ApiResponse } from '@/utils/apiResponse';
//import logger from '@/utils/logger';
import compression from 'compression';
import cors from 'cors';
import express, { type Application, type NextFunction, type Request, type Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

const app: Application = express();

// ============================================================================
// Security Middleware
// ============================================================================
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
        },
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
    },
}));

// ============================================================================
// CORS Configuration
// ============================================================================
app.use(cors({
    origin: config.cors.origin,
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ============================================================================
// Body Parser Middleware
// ============================================================================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ============================================================================
// Compression Middleware
// ============================================================================
app.use(compression());

// ============================================================================
// Logging Middleware
// ============================================================================
if (config.nodeEnv === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined', {
        stream: {
            write: (message: string) => console.log(message.trim()),
        },
    }));
}

// ============================================================================
// Request ID Middleware (for tracing)
// ============================================================================
type RequestWithId = Request & { id?: string };

app.use((req: RequestWithId, res: Response, next: NextFunction) => {
    const headerId = req.headers['x-request-id'];
    const incomingId = Array.isArray(headerId) ? headerId[0] : headerId;
    req.id = typeof incomingId === 'string' && incomingId.length > 0
        ? incomingId
        : `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    res.setHeader('X-Request-ID', req.id);
    next();
});

// ============================================================================
// Health Check Endpoint
// ============================================================================
app.get('/health', (req: Request, res: Response) => {
    return sendResponse(req, res, [
        {
            status: 'ok',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: config.nodeEnv,
        },
    ], true);
});

// ============================================================================
// API Routes
// ============================================================================
app.use('/api/v1', v1Routes);

// ============================================================================
// Root Endpoint
// ============================================================================
app.get('/', (req: Request, res: Response) => {
    return sendResponse(req, res, [
        {
            message: 'Welcome to the API',
            version: config.apiVersion,
            documentation: '/api/docs',
        },
    ], true);
});

// ============================================================================
// 404 Handler
// ============================================================================
app.use(notFoundMiddleware);

// ============================================================================
// Global Error Handler (Must be last)
// ============================================================================
//app.use(errorMiddleware);

// ============================================================================
// Unhandled Promise Rejections
// ============================================================================
process.on('unhandledRejection', (reason: Error) => {
    //logger.error('Unhandled Rejection:', reason);
    console.error('Unhandled Rejection:', reason);
    throw reason;
});

// ============================================================================
// Uncaught Exceptions
// ============================================================================
process.on('uncaughtException', (error: Error) => {
    //logger.error('Uncaught Exception:', error);
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

export default app;