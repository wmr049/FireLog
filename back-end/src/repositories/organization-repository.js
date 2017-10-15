'use strict';
const mongoose = require('mongoose');
const Organization = mongoose.model('Organization');

exports.get = async () => {
    const res = await Organization
        .find({
            active: true
        });

    return res;
}

exports.getById = async (id) => {
    
    const res = await Organization.findById(id);
    return res;
}

exports.create = async (data) => {
    var organization = new Organization(data);
    await organization.save();
}