'use strict'

// Durante os testes a variavel de ambiente esta setada para TEST
process.env.NODE_ENV = 'dev';

const mongoose = require("mongoose");
const User = require("../../src/models/user");

// É requerido as dependencias de desenvolvimento
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../src/app");
const should = chai.should();

chai.use(chaiHttp);
// Nosoo bloco pai
describe('Users', () => {

    beforeEach((done) => { // Antes de cada teste, esvaziamos o banco de dados
        User.remove({}, (err) => {
            done();
        });
    });

    // Testar a rota /GET
    describe('/GET users', () => {
        it('Metodo busca todos os usuarios do sistema', (done) => {
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


    describe('/POS user', () => {
        it('Testar validação de campo obrigatório na criação do usuario', (done) => {

            const user = {
                "name": "Marcia Lira",
                "email": "papelaria_reis@hotmail.com",
                
                "cpf": "30877030872"
            }

            chai.request(server)
                .post('/users')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('pages');
                    res.body.errors.pages.should.have.property('kind').eql('required');
                    done();
                });
        });
    });
});