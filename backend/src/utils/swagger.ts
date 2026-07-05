import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BG Apiary API',
      version: '3.3.0',
      description: 'Backend API foundation for BG Apiary.'
    },
    servers: [{ url: '/api/v1' }]
  },
  apis: ['src/routes/*.ts']
});
