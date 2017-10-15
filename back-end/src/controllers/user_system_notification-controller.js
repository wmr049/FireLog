'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/user_system_notification-repository')
const repositorySystem = require('../repositories/system-repository')
const repositoryUser = require('../repositories/user-repositorie')
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

    const system = await repositorySystem.getById(req.body.systemId);
    const user = await repositoryUser.getById(req.body.userId);
    const userSystemNotification = await repository.getByUserSystem(user.id, system.id);

    // Validações
    let contract = new ValidationContract();
    contract.isRequired(user.id, 'Necessario informar o Usuario');
    contract.isRequired(system.id, 'Sistema informado é inexistente');
    contract.isDuplicated(userSystemNotification, 'Esta configuração ja existe');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create({
            user: user.id,
            system: system.id,
            daily_digest: req.body.daily_digest,
            new_error: req.body.new_error,
            import_increased: req.body.import_increased,
        });

        res.status(201).send({
            message: 'Configurado permissão usuario sistema'
        });

    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};