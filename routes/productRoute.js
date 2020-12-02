const express = require('express');
const { protect } = require('../controllers/authController');
const {
  getProducts,
  getProduct,
  addProuct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const router = express.Router();

// @route GET /api/products
// Desc  gets list of available Products

router.use(protect); // protect all routes

/**
 * @swagger
 * /api/products:
 *  get:
 *    description: Gets all products
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.route('/').get(getProducts);

/**
 * @swagger
 * /api/products:
 *  post:
 *    description: Adds a product
 *    responses:
 *      '201':
 *        description: A successful response
 */

router.post('/', addProuct);

/**
 * @swagger
 * /api/products/:id:
 *  get:
 *    description: Returns a single product with the given ID
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      description: "a product that needs to be updated"
 *      required: true
 *    responses:
 *      '200':
 *        description: A successful response
 */

router.route('/:id').get(getProduct);

/**
 * @swagger
 * /api/products/:id:
 *  patch:
 *    description: Updates a specific product
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      description: "a product that needs to be updated"
 *      required: true
 *      schema:
 *        $ref: "../models/product.js#/productSchema"
 *    responses:
 *      '200':
 *        description: A successful response
 */

router.patch('/:id', updateProduct);

/**
 * @swagger
 * /api/products/:id:
 *  delete:
 *    description: Delete's a specific product
 *    responses:
 *      '204':
 *        description: No response
 */

router.delete('/:id', deleteProduct);

module.exports = router;
