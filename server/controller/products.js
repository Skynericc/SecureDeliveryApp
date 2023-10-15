const mongoose = require('mongoose');
const Product = require('../models/product').productModel;
const jwt = require('jsonwebtoken');
const secretKey = require("../config/auth.config").secret;

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

const getAllProducts = (req, res, next) => {
	const token = req.query.token;
	// Check if a valid JWT token exists in the query parameters
	if (!token) {
		return res.status(401).json({ error: 'No token provided' });
	}

	jwt.verify(token, secretKey, (err, decoded) => {
		if (err) {
		  return res.status(403).json({ error: 'Failed to authenticate token' });
		}
	
		// The token is valid; the decoded object will contain user information
		const userId = decoded.userId;
	
		// Now you can use the userId to fetch user-specific data or proceed as needed
	
		// Retrieve all products from DB or fetch user-specific data
		Product.find({ quant: { $gt: 0 } })
		  .then((products) => {
			res.format({
			  json: () => {
				res.json(products);
			  },
			});
		  })
		  .catch((error) => {
			return next(error);
		  });
	  });
};

const deleteAllProducts = async (req, res, next) => {
	try {
	  await Product.deleteMany({});
	  res.status(204).send();
	} catch (error) {
	  next(error);
	}
};

module.exports = { createProduct, getProductById, getAllProducts, deleteAllProducts };