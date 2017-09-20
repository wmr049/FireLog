'use strict';
 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: [true, 'O Titutlo é obrigatório'],
        trim: true
    },
    application : {
        type: String,
        trim: true        
    },
    cookies : {
        type: String,        
        trim: true
    },
    data : {
        type: String,
        trim: true
    },
    dateTime : {
        type: String,
        trim: true
    },
    detail : {
        type: String,
        trim: true
    },
    form : {
        type: String,        
        trim: true
    },
    hostname : {
        type: String,
        trim: true
    },
    queryString : {
        type: String,
        trim: true
    },
    source : {
        type: String,
        trim: true
    },
    serverVariables : {
        type: String,
        trim: true
    },
    severity : {
        type: String,
        trim: true
    },
    statusCode : {
        type: String,
        trim: true
    },
    type : {
        type: String,
        trim: true
    },
    url : {
        type: String,
        trim: true
    },
    user : {
        type: String,
        trim: true
    },
    version : {
        type: String,
        trim: true
    },
});

module.exports = mongoose.model('Log', schema);
