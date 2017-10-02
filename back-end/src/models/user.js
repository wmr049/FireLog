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
    roles: [{
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    }],
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

schema.pre('save', next => {
    const now = new Date();
    if (!this.createDate) {
        this.createDate = now;
    }
    next();
})
module.exports = mongoose.model('User', schema);