const express = require('express');
const { authCore } = require('../../../../middleware/auth.middleware');
const validate = require('../../../../middleware/validation.middleware');
const queryParser = require('../../../../middleware/query-parser.middleware');
const querySerch = require('../../../../middleware/query-search.middleware');

const menuName = '__name__';

/**
 * @swagger
 * tags:
 *   name: __Name__
 *   description: __Name__
 */
const router = express.Router();

module.exports = router;
