'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/organization-repository')
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

exports.post = async (req, res, next) => {

    let contract = new ValidationContract();

    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.company, 2, 'A Empresa deve conter pelo menos 2 caracteres');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create({
            name: req.body.name,
            company: req.body.company,
            address: req.body.address,
            zipcode: req.body.zipcode,
            city: req.body.city,
            country: req.body.country,
        });

        res.status(201).send({
            message: 'Organização criada com sucesso'
        });

    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};