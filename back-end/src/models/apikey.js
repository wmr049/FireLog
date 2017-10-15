'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    name: {
        type: String,
        required: false,
        trim: true
    },
    key: {
        type: String,
        required: false
    },
    system: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'System'
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

module.exports = mongoose.model('ApiKey', schema);
