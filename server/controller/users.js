const mongoose = require('mongoose');
var bcrypt = require("bcryptjs");
const User = require('../models/users').userModel;

const createUser = (req, res, next) => {
  User.create({
    _id: new mongoose.Types.ObjectId(),
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
	mdp: bcrypt.hashSync(req.body.mdp, 8)
  }).then((user) => {
    // user has been created
    console.log('POST created new user: ' + user);
    res.status(200).json(user);
  }).catch((error) => {
    // transmit a custom error to the next middleware
    return next(new Error("There was a problem adding the information to the database: " + error));
  });
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id).then((user) => {
		console.log('GET Retrieved ID: ' + user._id);
		res.status(200).json(user);
	}).catch((error) => {
		// transmit the error to the next middleware
		return next(error);
	});
};

const getAllUsers = (_req, res, next) => {
	// Retrieve all users from Mongo
	User.find({}).then((users) => {
		res.format({
			// JSON response will show all users in JSON format
			json: () => {
				res.json(users);
			}
		});
	}).catch((error) => {
		// transmit the error to the next middleware
		return next(error);
	});
};

module.exports = { createUser, getUserById, getAllUsers };