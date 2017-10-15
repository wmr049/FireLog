'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/user_system_notification-controller');
const authService = require('../services/auth-service');

router.get('/', authService.isAdmin, controller.get);
router.post('/', authService.isAdmin, controller.post);
router.get('/:id',authService.isAdmin, controller.getById);

module.exports = router;