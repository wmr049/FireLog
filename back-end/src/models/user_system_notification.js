'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    system: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'System'
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
    active: {
        type: Boolean,
        required: [true, 'O Status é obrigatório'],
        default: true
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now
    },
});

module.exports = mongoose.model('UserSystemNotification', schema);