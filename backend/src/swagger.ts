import swaggerJsdoc from 'swagger-jsdoc';
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
                url: `http://localhost:${config.port}`,
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts', './src/models/*.ts'], // Path to the API docs
};

export const swaggerSpec = swaggerJsdoc(options);
