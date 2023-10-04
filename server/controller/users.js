const mongoose = require('mongoose');
const User = require('../models/users').userModel;

const createUser = (req, res, next) => {
  User.create({
    _id: new mongoose.Types.ObjectId(),
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
  }).then((user) => {
    // user has been created
    console.log('POST created new user: ' + user);
    res.status(200).json(user);
  }).catch((error) => {
    // transmit a custom error to the next middleware
    return next(new Error("There was a problem adding the information to the database: " + error));
  });
};

const getUser = (req, res, next) => {
  User.findById(req.params.id).then((user) => {
		console.log('GET Retrieved ID: ' + user._id);
		res.status(200).json(user);
	}).catch((error) => {
		// transmit the error to the next middleware
		return next(error);
	});
};

module.exports = { createUser, getUser };