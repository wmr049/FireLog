'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/log-controller');
const authService = require('../services/auth-service');

router.post('/', authService.isAdmin, controller.post);
router.delete('/',authService.isAdmin, controller.deletarlog);
router.get('/buscarlogs', authService.isAdmin, controller.buscarlogs);
router.get('/buscarlog/:id', authService.isAdmin, controller.buscarlog);
router.get('/esconderlog/:id', controller.esconderlog);

module.exports = router;
