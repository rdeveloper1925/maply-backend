import dotenv from 'dotenv';

dotenv.config();

const config = {
    nodeEnv: 'development',
    port: 8080,
    apiVersion: 'v1',

    cors: {
        origin: process.env.CORS_ORIGIN ?? '*',
    },
    // nodeEnv: process.env.NODE_ENV || 'development',
    // port: parseInt(process.env.PORT || '3000', 10),
    // apiVersion: process.env.API_VERSION || 'v1',

    // cors: {
    //   origin: process.env.CORS_ORIGIN || '*',
    // },

    //   jwt: {
    //     secret: process.env.JWT_SECRET || 'your-secret-key',
    //     expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    //   },

    //   database: {
    //     url: process.env.DATABASE_URL,
    //   },

    //   redis: {
    //     host: process.env.REDIS_HOST || 'localhost',
    //     port: parseInt(process.env.REDIS_PORT || '6379', 10),
    //   },
};

export default config;