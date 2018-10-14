
const User = require('../models/users')
const mongoose = require('mongoose')

let user_fetch_all = (req, res) => {
    User.find()
    .exec()
    .then(docs => {
        console.log(docs)
        res.status(200).json({
            message: 'All users',
            users: docs
        })
    })
    .catch(err => console.log(err))
}

let user_fetch_by_id = (req, res) => {
    const id = req.params.id
    User.findById(id)
    .exec()
    .then(doc => {
        console.log(doc)
        if(doc)
            res.status(200).json({
                message: 'Getting user by ID',
                user: doc
            })
        else
            res.status(404).json({
                message: 'No valid ID'
            })
    })
    .catch(err => console.log(err))
}

let user_create = (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        email: req.body.email,
        userName: req.body.userName
    })
    user.save().then(result => {
        console.log(result)
        res.status(201).json({
            message:"User created",
            createdUser: result
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
}

let user_update = (req, res) => {
    const id = req.params.id
    const updateOps = {}
    for(const ops of req.body)
    {
        updateOps[ops.propName] = ops.value
    }
    User.update(
        {_id: id},
        { $set: updateOps}
    )
    .exec()
    .then(result => {
        console.log(result)
        res.status(200).json({
            message: 'Updated user by ID',
            updateUser: result
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
}

let user_delete = (req, res) => {
    const id = req.params.id
    User.remove({
        _id: id
    })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Deleted user by ID',
            deletedUser: result
        })
    })
    .catch(err => {
        console.log(err)
        err.status(500).json({
            error:err
        })
    })
}

exports.user_fetch_all = user_fetch_all
exports.user_create = user_create
exports.user_fetch_by_id = user_fetch_by_id
exports.user_update = user_update
exports.user_delete = user_delete