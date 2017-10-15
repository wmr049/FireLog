'use strict';
const mongoose = require('mongoose');
const System = mongoose.model('System');

exports.get = async () => {
    const res = await System
        .find({
            active: true
        });

    return res;
}

exports.getById = async (id) => {
    const res = await System.findById(id);
    return res;
}

exports.create = async (data) => {
    var system = new System(data);

    await system.save();
}