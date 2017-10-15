'use strict';
const mongoose = require('mongoose');
const UserOrganization = mongoose.model('UserOrganization');

exports.get = async () => {
    const res = await UserOrganization
        .find({
            active: true
        });

    return res;
}

exports.getById = async (id) => {
    const res = await UserOrganization.findById(id);
    return res;
}