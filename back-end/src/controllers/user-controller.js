'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/user-repositorie')
const md5 = require('md5');
const authService = require('../services/auth-service');

const emailService = require('../services/email-service');

exports.get = async(req, res, next) => {

    try {
        var data = await repository.get();

        res.status(200).send({
            success: true,
            data: data
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            errors: [e.message]
        });
    }
}

exports.getById = async(req, res, next) => {

    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send({
            success: true,
            data: data
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            errors: [e.message]
        });
    }

}

exports.getByPage = async(req, res, next) => {

    var page = parseInt(req.params.page);
    var per_page = parseInt(req.params.per_page);

    // Definir quantidades de itens por pagina e qual a pagina
    
    if (!req.params.page) {
        page = 1
    }

    if (!req.params.per_page) {
        per_page = 1
    }

    try {        

        var data = await repository.getByPage(page, per_page);

        res.status(200).send({
            success: true,
            data: data
        })
    } catch (e) {
        res.status(500).send({
            success: false,
            errors: [e.message]
        });
    }




}

exports.put = async(req, res, next) => {

    let contract = new ValidationContract();

    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres');
    contract.isEmail(req.body.email, 'E-mail inválido');
    contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 6 caracteres');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send({
                success: false,
                errors: contract.errors()
            }

        ).end();
        return;
    }

    try {
        var data = await repository.put(req.params.id, req.body);

        this.authenticate(req, res, next);

    } catch (error) {
        res.status(500).send({
            success: false,
            errors: [e.message]
        });
    }

}

exports.post = async(req, res, next) => {

    let contract = new ValidationContract();

    contract.isRequired(req.body.password, 'É necessario informar a senha');
    contract.isRequired(req.body.name, 'É necessario informar o nome');
    contract.isRequired(req.body.email, 'É necessario informar o email');
    contract.isRequired(req.body.cpf, 'É necessario informar o CPF');

    contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 6 caracteres');
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.email, 6, 'O email deve conter pelo menos 6 caracteres');
    contract.hasMinLen(req.body.cpf, 11, 'O CPF deve conter pelo menos 11 caracteres');

    contract.isEmail(req.body.email, 'E-mail inválido');



    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send({
            success: false,
            errors: contract.errors()
        }).end()
        return;
    }

    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            cpf: req.body.cpf,
            roles: ["user"]
        });

        emailService.send(
            req.body.email,
            'Bem vindo ao Firelog',
            global.EMAIL_TMPL.replace('{0}', req.body.name));

        this.authenticate(req, res, next);

    } catch (e) {
        res.status(500).send({
            success: false,
            errors: [e.message]
        });
    }
};

exports.logout = async(req, res, next) => {
    try {

        const data = await authService.logout(req, res, next);

        res.status(200).send({
            success: true,
            data: {
                message: data
            }                            
        });
        
    } catch (e) {
        res.status(500).send({
            success: false,
            errors: [e.message]
        });
    }
}

exports.authenticate = async(req, res, next) => {
    try {


        const user = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if (!user) {
            res.status(404).send({
                success: false,
                errors: 'Usuário ou senha inválidos'
            });
            return;
        }

        const token = await authService.generateToken({
            id: user._id,
            email: user.email,
            name: user.name,
            cpf: user.cpf,
            roles: user.roles
        });

        res.status(201).send({
            success: true,
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    cpf: user.cpf,
                    roles: user.roles
                },
                token: token
            }
        });
    } catch (e) {
        res.status(500).send({
            success: false,
            errors: 'Falha ao processar sua requisição'
        });
    }
};

exports.refreshToken = async(req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const user = await repository.getById(data.id);

        if (!user) {
            res.status(404).send({
                success: false,
                errors: 'Cliente não encontrado'
            });
            return;
        }

        const tokenData = await authService.generateToken({
            id: user._id,
            email: user.email,
            name: user.name,
            cpf: user.cpf,
            roles: user.roles
        });

        res.status(201).send({
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    cpf: user.cpf,
                    roles: user.roles
                },
                token: token
            }
        });
    } catch (e) {
        res.status(500).send({
            success: false,
            errors: [e.message]
        });
    }
};