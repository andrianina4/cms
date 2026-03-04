import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import { config } from './config';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Taram API',
            version: '1.0.0',
            description: 'API documentation for the Taram CMS project',
        },
        servers: [
            {
                url: '/api',
                description: 'Production (via Nginx Proxy)',
            },
            {
                url: `http://localhost:${config.port}`,
                description: 'Direct Backend (Local Dev)',
            },
        ],
        components: {
            securitySchemes: {
                roleAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'x-user-role',
                    description: 'Rôle de l\'utilisateur pour simuler les permissions (admin ou editor)',
                },
            },
        },
        security: [
            {
                roleAuth: [],
            },
        ],
    },
    apis: [
        path.join(__dirname, './routes/*.ts'),
        path.join(__dirname, './routes/*.js'),
        path.join(__dirname, './controllers/*.ts'),
        path.join(__dirname, './controllers/*.js'),
    ],
};

export const swaggerSpec = swaggerJsdoc(options);
