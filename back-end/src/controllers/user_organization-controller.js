'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/user_organization-repository')
const azure = require('azure-storage');
const guid = require('guid');
var config = require('../config');

exports.get = async (req, res, next) => {

    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }


}

exports.getById = async (req, res, next) => {

    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}