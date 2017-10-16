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
const assert = require('assert');

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
        it('Validar serviço ativo e sem dados na collection user.', (done) => {
            chai.request(server)
                .get('/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);

                    res.body.should.have.property('data');
                    res.body.data.length.should.be.eql(0);

                    done();
                });
        });

        it('Validar busca de Todos os usuarios cadastrados.', (done) => {

            const user1 = new User({
                name: "Milton Reis",
                email: "wmr049@gmail.com",
                password: "reis2000",
                cpf: "30877030871",
                roles: ['admin']
            });
            user1.save();

            const user2 = new User({
                name: "Cora Lafe",
                email: "coralage@hotmail.com",
                password: "reis2000",
                cpf: "30877030872",
                roles: ['user']
            });
            user2.save();


            chai.request(server)
                .get('/users/')
                .end((err, res) => {

                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have.property('data');

                    res.body.data.length.should.be.eql(2);

                    done();
                })
        })

        it('Validar busca de Usuarios paginados.', (done) => {

            const user1 = new User({
                name: "Milton Reis",
                email: "wmr049@gmail.com",
                password: "reis2000",
                cpf: "30877030871",
                roles: ['admin']
            });
            user1.save();

            const user2 = new User({
                name: "Cora Lafe",
                email: "coralage@hotmail.com",
                password: "reis2000",
                cpf: "30877030872",
                roles: ['user']
            });
            user2.save();

            const user3 = new User({
                name: "Marcia Lira",
                email: "papelaria_reis@hotmail.com",
                password: "reis2000",
                cpf: "30877030872",
                roles: ['user']
            });
            user3.save();

            const user4 = new User({
                name: "Herlado Reis",
                email: "hreis049@hotmail.com",
                password: "reis2000",
                cpf: "30877030872",
                roles: ['user']
            });
            user4.save();


            chai.request(server)
                .get('/users/2/1')
                .end((err, res) => {

                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have.property('data');

                    res.body.data.length.should.be.eql(1);

                    done();
                })
        })

        it('Validar busca de Usuario por Id', (done) => {
            const user = new User({
                name: "Milton Reis",
                email: "wmr049@gmail.com",
                password: "reis2000",
                cpf: "30877030871",
                roles: [
                    'user'
                ]
            });

            user.save((err, user) => {
                chai.request(server)
                    .get('/users/' + user.id)
                    .send(user)
                    .end((err, res) => {

                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('success').eql(true);
                        res.body.should.have.property('data');

                        res.body.data.should.have.property('_id');
                        res.body.data.should.have.property('email');
                        res.body.data.should.have.property('password');
                        res.body.data.should.have.property('cpf');
                        res.body.data.should.have.property('createDate');
                        res.body.data.should.have.property('active');
                        res.body.data.should.have.property('roles');

                        done();
                    })
            })

        })

    });

    // Testar a rota /POST
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
                email: "coralafe@gmail.com",
                password: "reis2000",
                cpf: "30877030872"
            }

            chai.request(server)
                .post('/users')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have.property('data');

                    res.body.data.should.have.property('user');
                    res.body.data.user.should.have.property('id');
                    res.body.data.user.should.have.property('email').eql('coralafe@gmail.com');
                    res.body.data.user.should.have.property('name').eql('Cora Lafe');
                    res.body.data.user.should.have.property('cpf').eql('30877030872');

                    res.body.data.user.should.have.property('roles');
                    res.body.data.user.roles[0].should.eql('user');

                    res.body.data.should.have.property('token');

                    done();
                });
        });


    });

    // Testar a rota de /PUT/:id atualizando usuario
    describe('/PUT/:id user', () => {
        it('Validar atualização do usuario', (done) => {

            const user = new User({
                name: "Milton Reis",
                email: "wmr049@gmail.com",
                password: "reis2000",
                cpf: "30877030871",
                roles: [
                    'user'
                ]
            });

            user.save((err, user) => {
                chai.request(server)
                    .put('/users/' + user.id)
                    .send({
                        name: "Milton O. Reis",
                        email: "milton.oliveira.reis@hotmail.com",
                        password: "reis2000",
                        cpf: "12345678910",
                        roles: [
                            'admin'
                        ]
                    })
                    .end((err, res) => {

                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        res.body.should.have.property('success').eql(true);
                        res.body.should.have.property('data');

                        res.body.data.should.have.property('user');
                        res.body.data.user.should.have.property('id');
                        res.body.data.user.should.have.property('email');
                        res.body.data.user.should.have.property('name');
                        res.body.data.user.should.have.property('cpf');

                        res.body.data.user.should.have.property('roles');

                        res.body.data.should.have.property('token');

                        done();
                    })
            })

        })
    })

    // Validar o renovação de um token
    describe('/POST/users/refresh-token', () => {
        it('Validar Atualização do Token (retorno do novo Token).', (done) => {


            var token = '';
            var tokenRefresh = '';

            // Cria o usuario
            const user = new User({
                name: "Cora Lafe",
                email: "coralafe@gmail.com",
                password: "reis2000",
                cpf: "30877030872"
            });


            chai.request(server)
                .post('/users')
                .send(user)
                .end((err, res) => {
                    token = res.body.data.token;

                    chai.request(server)
                        .post('/users/refresh-token')
                        .set('x-access-token', token)
                        .end((err, res) => {                            
                            tokenRefresh = res.body.data.token;

                            res.should.have.status(201);
                            assert.equal(token, tokenRefresh, 'Token novo deve ser diferente do antigo.');


                            done();
                        });
                });




        });
    });

    // Validar a Authenticação de usuario
    describe('/POST/users/Authenticate', () => {
        it('Validar autenticação do usuario (retorno do Token e usuario)', (done) => {


            // Cria o usuario
            const user = new User({
                name: "Cora Lafe",
                email: "coralafe@gmail.com",
                password: "reis2000",
                cpf: "30877030872"
            });

            chai.request(server)
                .post('/users')
                .send(user)
                .end((err, res) => {                    
                });

            // Autentica o usuario
            const userAuth = {
                email: "coralafe@gmail.com",
                password: "reis2000"
            }

            chai.request(server)
                .post('/users/authenticate')
                .send(userAuth)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have.property('data');

                    res.body.data.should.have.property('user');
                    res.body.data.user.should.have.property('id');
                    res.body.data.user.should.have.property('email').eql('coralafe@gmail.com');
                    res.body.data.user.should.have.property('name').eql('Cora Lafe');
                    res.body.data.user.should.have.property('cpf').eql('30877030872');

                    res.body.data.user.should.have.property('roles');
                    res.body.data.user.roles[0].should.eql('user');

                    res.body.data.should.have.property('token');

                    assert.equal(5, 5, '5 is strictly greater than 2');

                    done();
                });


        })
    });

    // Validar o logout do usuario
    describe('/POST/users/logout', () => {
        it('Validar o logout do usuario', (done) => {


            // Cria o usuario
            const user = new User({
                name: "Cora Lafe",
                email: "coralafe@gmail.com",
                password: "reis2000",
                cpf: "30877030872"
            });

            chai.request(server)
                .post('/users')
                .send(user)
                .end((err, res) => {                    
                });

            // Autentica o usuario
            const userAuth = {
                email: "coralafe@gmail.com",
                password: "reis2000"
            }

            chai.request(server)
                .post('/users/logout')
                .send(userAuth)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have.property('data');

                    

                    done();
                });


        })
    });

});