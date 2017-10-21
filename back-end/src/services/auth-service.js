'use strict';
const jwt = require('jsonwebtoken');
const jwtBlacklist = require('jwt-blacklist')(jwt);

jwtBlacklist.config({
    maxBlacklistPerUnit: 100000,
    error: 0.00001,
    unitType: 'h',
    expiresDuration: '12'
});

exports.logout = async(req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    var response = {}

    if (!token) {
        response: {
            status: true
            message: 'Token não encontrado'
        }
    }
    else {


        await jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(200).json({
                    status: true,
                    message: 'Token invalido'
                });

            } else {

                
            }
        });

    }

    return response;
}

exports.generateToken = async(data) => {
    return jwt.sign(data, global.SALT_KEY, {
        expiresIn: '1d'
    });
}

exports.decodeToken = async(token) => {
    var data = await jwt.verify(token, global.SALT_KEY);
    return data;
}

exports.authorize = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                next();
            }
        });
    }
};

exports.isAdmin = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Token Inválido'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                if (decoded.roles.includes('admin')) {
                    next();
                } else {
                    res.status(403).json({
                        message: 'Esta funcionalidade é restrita para administradores'
                    });
                }
            }
        });
    }
};