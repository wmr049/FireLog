'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },    
    daily_digest: {
        type: Boolean,        
        default: false
    },
    new_error: {
        type: Boolean,        
        default: false
    },
    import_increased: {
        type: Boolean,        
        default: false
    },
    roles: [{
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    }],
    active: {
        type: Boolean,
        required: [true, 'O Status é obrigatório'],
        default: true
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('User', schema);