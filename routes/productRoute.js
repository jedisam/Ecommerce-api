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

// router.get('/myp', (req, res) => {
//   console.log('The User: ', req.user);
//   return res.json({ message: 'Sup' });
// });

/**
 * @swagger
 * /api/products:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Get the list of all products
 *    description: Gets all products
 *    responses:
 *      '200':
 *        description: Successful Response
 *        content:
 *          application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    description: Status of the response
 *                    example: "Success"
 *                  results:
 *                    type: number
 *                    description: Number of Product Items
 *                    example: 5
 *                  data:
 *                    type: object
 *                    properties:
 *                      data:
 *                        type: array
 *                        items:
 *                          type: object
 *                          properties:
 *                            _id:
 *                              type: string
 *                              description: Id of the product Item
 *                              example: "5fce8d709828ce518dbf47c9"
 *                            name:
 *                              type: string
 *                              description: Name of the product
 *                              example: "Gorgeous Water Mug"
 *                            price:
 *                              type: number
 *                              description: Price of the product
 *                              example: 9.99
 *                            description:
 *                              type: string
 *                              description: Description of the product
 *                              example: "perspiciatis in qui et nemo nisi ad quam consequatur et dignissimos"
 *                            slug:
 *                              type: string
 *                              description: Slug of the product
 *                              example: "Gorgeous-Water-Mug"
 *                            vendor:
 *                              type: string
 *                              description: Vendor of the product
 *                              example: "Boyle-LLC"
 *                            itemType:
 *                              type: string
 *                              description: Type of the product
 *                              example: "mug"
 *                            productImg:
 *                              type: string
 *                              description: Image of the product
 *                              example: "mug-400_0425cc46e03b.jpg"
 */
router.route('/').get(getProducts);

/**
 * @swagger
 *
 * /api/products:
 *   post:
 *     summary: Add a product to the product list
 *     description: Adds a product
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Product's name.
 *                 example: "Raspberry Pi 4 Model B 2019 Quad Core 64 Bit WiFi Bluetooth (4GB)"
 *               price:
 *                  type: string
 *                  description: Product's price
 *                  example: 48.99
 *               description:
 *                 type: string
 *                 description: Product's Description.
 *                 example: "2-lane MIPI DSI/CSI ports for camera and display--4-pole stereo audio and composite video port--Micro SD card slot for loading operating system and data storage"
 *               slug:
 *                  type: string
 *                  description: Slug of the Product
 *                  example: "Raspberry"
 *               vendor:
 *                 type: string
 *                 description: Vendor's name
 *                 example: "Star "
 *               itemType:
 *                  type: string
 *                  description: Type of the product
 *                  example: "Raspberry"
 *               productImg:
 *                 type: string
 *                 description: Product's Image
 *     responses:
 *      '201':
 *        description: A successful response
 */
router.post('/', addProuct);

/**
 * @swagger
 * /api/products/:id:
 *  get:
 *    description: Returns a single product with the given ID
 *    summary: Get a specific product using product's ID
 *    security:
 *       - bearerAuth: []
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
 *    summary: Update a single Product
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Product's name.
 *                 example: "Rasperry"
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
 *    summary: Delete a specific Product using its ID
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      '204':
 *        description: No response
 */

router.delete('/:id', deleteProduct);

module.exports = router;
