'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/apikey-controller');
const authService = require('../services/auth-service');

router.get('/', authService.isAdmin, controller.get);
router.get('/:id',authService.isAdmin, controller.getById);

module.exports = router;