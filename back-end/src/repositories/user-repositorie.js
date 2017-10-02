'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.put = async (id, data) => {
    await User
        .findByIdAndUpdate(id, {
            $set: {
                name: data.name,
                email: data.email,
                cpf: data.cpf,
                roles: data.roles
            }
        })
}

exports.create = async (data) => {
    var user = new User(data);
    await user.save();
}

exports.authenticate = async (data) => {
    const res = await User.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}

exports.getById = async (id) => {
    const res = await User.findById(id);
    return res;
}

exports.get = async () => {
    const res = await User
        .find();

    return res;
}