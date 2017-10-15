'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('User');
const md5 = require('md5');

exports.put = async (id, data) => {
    await User
        .findByIdAndUpdate(id, {
            $set: {
                name: data.name,
                email: data.email,
                cpf: data.cpf,
                password: md5(data.password + global.SALT_KEY),
                roles: [ 
                    data.roles
                ]
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

exports.getByPage = async (page, per_page) => {
    const res = User.find().sort('createDate').skip((page-1)*per_page).limit(per_page);

    return res;
}