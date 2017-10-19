'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('./config')

const app = express();
const router = express.Router();

// Conectar ao banco de dados
mongoose.Promise = require('bluebird');

mongoose.connect(process.env.NODE_ENV == 'dev' ?
        config.connectionString_dev : config.connectionString, {
            useMongoClient: true
        })
    .then(() => {

        mongoose.connection.on('connected', function () {
            console.log('conectado ao banco');
        });

        mongoose.connection.on('disconnected', function () {
            console.log('Desconectado do banco');
        });

        mongoose.connection.on('reconnected', function () {
            console.log('Reconectando ao banco');
        });

        mongoose.connection.on('error', function (err) {
            console.log('erro de conexão de mongoose: ' + err);
        });

        console.log('conectado ao banco');

    })
    .catch(err => {
        console.log('rejected promise: ' + err);
        mongoose.disconnect();
    })



//Carregar os Models
const ApiKey = require('./models/apikey');
const Log = require('./models/log');
const Organization = require('./models/organization');
const System = require('./models/system');
const UserOrganization = require('./models/user_organization');
const User = require('./models/user');
const UserSystemNotification = require('./models/user_system_notification');

//Carrega as Rotas
const indexRoute = require('./routes/index-route');
const logRoute = require('./routes/log-route');
const userRoute = require('./routes/user-route');
const organizationRoute = require('./routes/organization-route');
const systemRoute = require('./routes/system-route');
const userSystemNotificationRoute = require('./routes/user_system_notification-route');

app.use(bodyParser.json({
    limit: '5mb',
    type: 'application/json'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

const prefixUrlV1 = '/api/v1';

app.use(prefixUrlV1 + '/', indexRoute);
app.use(prefixUrlV1 + '/logs', logRoute);
app.use(prefixUrlV1 + '/users', userRoute);
app.use(prefixUrlV1 + '/organizations', organizationRoute);
app.use(prefixUrlV1 + '/systems', systemRoute);
app.use(prefixUrlV1 + '/usersystemnotifications', userSystemNotificationRoute);

module.exports = app;