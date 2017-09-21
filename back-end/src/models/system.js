'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    systemname: {
        type: String,
        required: false,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    },
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

module.exports = mongoose.model('System', schema);
