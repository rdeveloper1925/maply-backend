import app from './app.js';
import config from './config/index.js';
// import logger from './utils/logger';

const PORT = config.port || 8080;

const server = app.listen(PORT, () => {
    //   logger.info(`Server running on port ${PORT}`);
    //   logger.info(`Environment: ${config.nodeEnv}`);
});

const gracefulShutdown = () => {
    //logger.info('Received shutdown signal, closing server gracefully...');
    server.close(() => {
        //logger.info('Server closed');
        process.exit(0);
    });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);