'use strict'

// Durante os testes a variavel de ambiente esta setada para TEST
process.env.NODE_ENV = 'dev';

const mongoose = require("mongoose");
const User = require("../src/models/user");

// É requerido as dependencias de desenvolvimento
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../src/app");
const should = chai.should();

chai.use(chaiHttp);
// Nosso bloco pai
describe('Users', () => {

    beforeEach((done) => { // Antes de cada teste, esvaziamos o banco de dados
        User.remove({}, (err) => {
            done();
        });
    });

    // Testar a rota /GET
    describe('/GET users', () => {
        it('Validar serviço ativo e limpar dados da tabela user.', (done) => {
            chai.request(server)
                .get('/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });


    describe('/POST user', () => {
        it('Validar trava de campos requeridos ao criar usuario (bloqueio).', (done) => {

            const user = {

            }

            chai.request(server)
                .post('/users')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(false);
                    res.body.should.have.property('errors');

                    res.body.errors[0].should.eql('É necessario informar a senha');
                    res.body.errors[1].should.eql('É necessario informar o nome');
                    res.body.errors[2].should.eql('É necessario informar o email');
                    res.body.errors[3].should.eql('É necessario informar o CPF');

                    res.body.errors[4].should.eql('A senha deve conter pelo menos 6 caracteres');
                    res.body.errors[5].should.eql('O nome deve conter pelo menos 3 caracteres');
                    res.body.errors[6].should.eql('O email deve conter pelo menos 6 caracteres');
                    res.body.errors[7].should.eql('O CPF deve conter pelo menos 11 caracteres');
                    res.body.errors[8].should.eql('E-mail inválido');

                    done();
                });
        });

        it('Validar criação de usuario.', (done) => {

            const user = {
                name: "Cora Lafe",
                email:"coralafe@gmail.com",
                password:"reis2000",
                cpf:"30877030872"
            }

            chai.request(server)
                .post('/users')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have.property('data');

                    res.body.data[0].should.have.property('user');
                                        
                    done();
                });
        });


    });
});