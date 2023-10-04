const mongoose = require('mongoose');
const Product = require('../models/product').productModel;

const createProduct = (req, res, next) => {
  Product.create({
    _id: new mongoose.Types.ObjectId(),
    titre: req.body.titre,
    desc: req.body.desc,
    prix: req.body.prix,
    quant: req.body.quant
  }).then((product) => {
    // product has been created
    console.log('POST created new product: ' + product);
    res.status(200).json(product);
  }).catch((error) => {
    // transmit a custom error to the next middleware
    return next(new Error("There was a problem adding the information to the database: " + error));
  });
};

const getProductById = (req, res, next) => {
  Product.findById(req.params.id).then((product) => {
		console.log('GET Retrieved ID: ' + product._id);
		res.format({
			json: () => {
				res.json(product);
			}
		});
	}).catch((error) => {
		// transmit the error to the next middleware
		return next(error);
	});
};

const getAllProducts = (_req, res, next) => {
	// Retrieve all products from Mongo
	Product.find({}).then((products) => {
		res.format({
			// JSON response will show all users in JSON format
			json: () => {
				res.json(products);
			}
		});
	}).catch((error) => {
		// transmit the error to the next middleware
		return next(error);
	});
};

module.exports = { createProduct, getProductById, getAllProducts };