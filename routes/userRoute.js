const express = require('express');

const { signup, login } = require('../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * /api/users/signup:
 *  post:
 *    description: registers a user
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      description: "User signup"
 *      required: true
 *      schema:
 *        $ref: "../models/user.js#/userSchema"
 *    responses:
 *      '201':
 *        description: A successful response
 */
router.post('/signup', signup);

/**
 * @swagger
 * /api/users/login:
 *  post:
 *    description: logs in a user
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      description: "User Login"
 *      required: true
 *      schema:
 *        $ref: "../models/user.js#/userSchema"
 *    responses:
 *      '200':
 *        description: A successful response
 */

router.post('/login', login);

module.exports = router;
