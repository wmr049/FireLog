'use strict'

// Durante os testes a variavel de ambiente esta setada para TEST
process.env.NODE_ENV = 'test';

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
        it('Ele mostra buscar todos os usuarios', (done) => {
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
});