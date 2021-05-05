const express = require('express');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const errorHandling = require('./controllers/errorController');
const { connectDB } = require('./config/db');

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Ecommerce API',
      description: 'Ecommerce API Information',
      contact: {
        name: 'Yididya Samuel',
      },
      servers: [
        {
          url: 'http:localhost:5000',
          description: 'Development Server',
        },
      ],
    },
    securityDefinition: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        scheme: 'bearer',
        in: 'header',
      },
    },
  },
  apis: ['app.js'],
  apis: ['app.js', './routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// DB connection

connectDB();

// body parser
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/userRoute'));
app.use('/api/products', require('./routes/productRoute'));
app.use('/api/cart', require('./routes/cartRoute'));

// ERROR HANDLER
app.use(errorHandling);

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}...`);
});
