export * from './cloudinary'

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Shopyle API',
      version: '0.1.0',
      description:
        'Shopyle api is made with Express and documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Abhijt',
        url: 'https://devabhijit.in',
        email: 'prajnastra.dev@.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:8000',
      },
    ],
  },
  apis: ['./dist/routes/*.js'],
}
