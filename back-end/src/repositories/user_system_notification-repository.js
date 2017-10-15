'use strict';
const mongoose = require('mongoose');
const UserSystemNotification = mongoose.model('UserSystemNotification');

exports.get = async () => {
    const res = await UserSystemNotification
        .find({
            active: true
        });

    return res;
}

exports.getByUserSystem = async (userId, systemId )  => {
    const res = await UserSystemNotification
        .find({
            user: userId,
            system: systemId,
            active: true
        });

    return res;
}


exports.getById = async (id) => {
    const res = await UserSystemNotification.findById(id);
    return res;
}

exports.create = async (data) => {
    const userSystemNotification = new UserSystemNotification(data);
    
    await userSystemNotification.save();
}