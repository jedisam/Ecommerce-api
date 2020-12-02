const express = require('express');
const session = require('express-session');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const errorHandling = require('./controllers/errorController');
const { connectDB } = require('./config/db');

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Ecommerce API',
      description: 'Ecommerce API Information',
      contact: {
        name: 'Yididya Samuel',
      },
      servers: ['http:localhost:5000'],
    },
  },
  apis: ['app.js'],
  apis: ['app.js', './routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// DB connection

connectDB();

// Session

// body parser
app.use(express.json());

// Routes
/**
 * @swagger
 * /:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get('/', (req, res) => {
  res.send('<h1>Ecommerce API!</h1>');
});

app.use('/api/products', require('./routes/productRoute'));
app.use('/api/users', require('./routes/userRoute'));
app.use('/api/cart', require('./routes/cartRoute'));

// app.get('/api/cart/', (req, res) => {
//   console.log('zak');
// });

// ERROR HANDLER
app.use(errorHandling);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}...`);
});
