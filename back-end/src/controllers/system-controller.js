'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/system-repository')
const repositoryOrganization = require('../repositories/organization-repository')

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

    const organization = await repositoryOrganization.getById(req.body.organizationId);

    let contract = new ValidationContract();

    contract.hasMinLen(req.body.systemname, 2, 'O nome do sistema deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 2, 'A descrição do sistema deve conter pelo menos 2 caracteres');
    contract.isRequired(req.body.organizationId, 'Necessario informar a Organização');
    contract.isRequired(organization.id, 'Organização informada é inexistente');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create({
            systemname: req.body.systemname,
            description: req.body.description,
            organization: organization.id,
        });

        res.status(201).send({
            message: 'Sistema criado com sucesso'
        });

    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};