'use strict'

process.env.NODE_ENV = 'dev';

const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");

const System = require("../src/models/system");
const server = require("../src/app");

const should = chai.should();
chai.use(chaiHttp);