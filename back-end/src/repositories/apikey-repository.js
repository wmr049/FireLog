'use strict';
const mongoose = require('mongoose');
const ApiKey = mongoose.model('ApiKey');


exports.get = async () => {
    const res = await Product
        .find({
            active: true
        });

    return res;
}

exports.getById = async (id) => {
    const res = await ApiKey.findById(id);
    return res;
}