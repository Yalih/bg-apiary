import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BG Apiary API',
      version: '3.4.0',
      description: 'Backend API for BG Apiary with PostgreSQL and Prisma.'
    },
    servers: [{ url: '/api/v1' }],
    paths: {
      '/health': {
        get: {
          summary: 'Health check',
          responses: { '200': { description: 'Backend and database are available' }, '503': { description: 'Backend is running but database is unavailable' } }
        }
      },
      '/apiaries': {
        get: { summary: 'List apiaries', responses: { '200': { description: 'List of apiaries' } } },
        post: { summary: 'Create apiary', responses: { '201': { description: 'Apiary created' }, '400': { description: 'Validation error' } } }
      },
      '/hives': {
        get: { summary: 'List hives', responses: { '200': { description: 'List of hives' } } },
        post: { summary: 'Create hive', responses: { '201': { description: 'Hive created' }, '400': { description: 'Validation error' } } }
      }
    }
  },
  apis: ['src/routes/*.ts']
});
