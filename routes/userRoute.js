const express = require('express');

const User = require('../models/user');

const { signup, login } = require('../controllers/authController');

const router = express.Router();

/**
 * @swagger
 *
 * /api/users/signup:
 *   post:
 *     description: Signup route for a user and get back a token
 *     summary: Register a User
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
 *                 description: The user's Name.
 *                 example: Yididya
 *               email:
 *                  type: string
 *                  description: User's email address
 *                  example: "jn@jn.com"
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: "password"
 *               confirmPassword:
 *                  type: string
 *                  description: User's Password confirmation
 *                  example: "password"
 *     responses:
 *      '201':
 *         description: Created response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       status:
 *                         type: string
 *                         description: Status of the request.
 *                         example: "Success"
 *                       token:
 *                         type: string
 *                         description: "JWT token returned from successful registration"
 *                         example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZWYzZWQxYWUzMzE4MzRhM2RiZGMxOCIsImlhdCI6MTYwOTUxNDcwNTc4MywiZXhwIjoxNjEwNTE0NzA1NzgzfQ.uZCH3p8UhSe3cuk-f5flSCd6-_EM6zND5G4PbV-2Ww8"
 *                       data:
 *                          type: object
 *                          properties:
 *                              user:
 *                                  type: object
 *                                  properties:
 *                                      Photo:
 *                                          type: string
 *                                          description: user picture.
 *                                          example: "default.jpg"
 *                                      name:
 *                                          type: string
 *                                          description: "Name of the registered User"
 *                                          example: "Yididya"
 *                                      email:
 *                                          type: string
 *                                          description: "email of the registered user"
 *                                          example: "jn@jn.com"
 */
router.post('/signup', signup);

/**
 * @swagger
 *
 * /api/users/login:
 *   post:
 *     summary: Log route for a user
 *     description: Logs in a user and returns a token
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *                 example: jn@jn.com
 *               password:
 *                  type: string
 *                  description: User's Password
 *                  example: "1234678"
 *     responses:
 *      '200':
 *         description: Successful Response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       status:
 *                         type: string
 *                         description: Status of the request.
 *                         example: "Success"
 *                       token:
 *                         type: string
 *                         description: "JWT token returned from successful registration"
 *                         example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZWYzZWQxYWUzMzE4MzRhM2RiZGMxOCIsImlhdCI6MTYwOTUxNDcwNTc4MywiZXhwIjoxNjEwNTE0NzA1NzgzfQ.uZCH3p8UhSe3cuk-f5flSCd6-_EM6zND5G4PbV-2Ww8"
 *                       data:
 *                          type: object
 *                          properties:
 *                              user:
 *                                  type: object
 *                                  properties:
 *                                      Photo:
 *                                          type: string
 *                                          description: user picture.
 *                                          example: "default.jpg"
 *                                      name:
 *                                          type: string
 *                                          description: "Name of the registered User"
 *                                          example: "Yididya"
 *                                      email:
 *                                          type: string
 *                                          description: "email of the registered user"
 *                                          example: "jn@jn.com"
 */
router.post('/login', login);

module.exports = router;
