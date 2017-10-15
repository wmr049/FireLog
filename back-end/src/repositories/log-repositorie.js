'use strict';
const mongoose = require('mongoose');
const Log = mongoose.model('Log');


exports.criarlog = async(data) => {
    var log = new Log(data);
    await log.save();
}

exports.buscarlog = async(id) => {
    const res = await Log.findById(id);
    return res;
}

exports.buscarlogs = async() => {
    const res = await Log
        .find({ active: true });

    return res;
}

exports.deletarlog = async(id) => {
    await Log
        .findOneAndRemove(id);
}

exports.esconderlog = async(id) => {
    await Log    
        .findByIdAndUpdate(id, {
            $set: {
                active: false
            }
        })
}
