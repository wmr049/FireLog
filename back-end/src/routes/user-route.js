
'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/user-controller');
const authService = require('../services/auth-service');

router.put('/:id', controller.put);

router.post('/', controller.post);
router.post('/authenticate', controller.authenticate);
router.post('/refresh-token', authService.authorize, controller.refreshToken);

router.get('/', controller.get);
router.get('/:id', controller.getById);
router.get('/:page/:per_page', controller.getByPage);

module.exports = router;