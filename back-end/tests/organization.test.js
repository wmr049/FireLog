'use strict'

process.env.NODE_ENV = 'dev';

const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");

const server = require("../src/app");
const Organization = require("../src/models/organization");

const should = chai.should();
chai.use(chaiHttp);