'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/log-repositorie')
const azure = require('azure-storage');
const guid = require('guid');
var config = require('../config');


exports.post = async (req, res, next) => {

    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O titulo deve conter pelo menos 3 caracteres');

    //se os dados forem invalidados
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {

        await repository.criarlog({
            title: req.body.title,
            application: req.body.application,
            cookies: req.body.cookies,
            data: req.body.data,
            dateTime: req.body.dateTime,
            detail: req.body.detail,
            form: req.body.form,
            hostname: req.body.hostname,
            queryString: req.body.queryString,
            source: req.body.source,
            serverVariables: req.body.serverVariables,
            severity: req.body.severity,
            statusCode: req.body.statusCode,
            type: req.body.type,
            url: req.body.url,
            user: req.body.user,
            version: req.body.version

        });

        res.status(201).send({
            message: 'Log criado com sucesso'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error.message
        });
    }
};

exports.buscarlogs = async (req, res, next) => {

    try {
        var data = await repository.buscarlogs();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.buscarlog = async (req, res, next) => {

    try {
        var data = await repository.buscarlog(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.deletarlog = async (req, res, next) => {

    try {
        var data = await repository.deletarlog(req.body.id);
        res.status(201).send({
            message: 'Log excluido com sucesso'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}


exports.esconderlog = async (req, res, next) => {

    try {
        var data = await repository.esconderlog(req.params.id);
        res.status(201).send({
            message: 'Log desabilitado com sucesso'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

