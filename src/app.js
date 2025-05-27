import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import matchRouter from './routes/match.js';
import 'express-async-errors';

const app = express();
app.use(express.json());

// Swagger/OpenAPI setup
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'AI-Enhanced Real-Time Occupancy Planning System API',
            version: '1.0.0',
            description: 'API documentation for Workspace Matcher service',
        },
    },
    apis: ['./src/routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Main match endpoint
app.use('/api/match', matchRouter);

// global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res
        .status(err.statusCode || 500)
        .json({ success: false, error: err.message || 'Internal server error' });
});

// catch any promise rejections or exceptions that slip past Express
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection at:', reason);
});
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception thrown:', err);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/docs`);
});