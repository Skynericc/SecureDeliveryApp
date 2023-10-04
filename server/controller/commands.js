const mongoose = require('mongoose');
const Command = require('../models/command').commandModel;
const Product = require('../models/product').productModel;

const createCommand = async (req, res, next) => {
    try {
      const { utilisateur, produits, estValide } = req.body;
      // Check if the products exist by their IDs
      const productIds = produits.map((product) =>
      new mongoose.Types.ObjectId(product.produit));
      const quantites = produits.map((product) => product.quantite);
  
      const existingProducts = await Product.find({
        _id: { $in: productIds },
      });
  
      if (existingProducts.length !== productIds.length) {
        // Some product IDs provided in the request do not exist
        return res.status(400).json({ error: 'One or more products do not exist' });
      }
  
      // Create a new command with the user ID and product references
      const newCommand = new Command({
        _id: new mongoose.Types.ObjectId(),
        utilisateur, // Utilisez l'ID de l'utilisateur directement
        produits: produits.map((product) => ({
          produit: product.produit, // ID du produit sous forme de chaîne
          quantite: product.quantite, // Quantité demandée
        })),
        estValide: estValide || false, // Utilisez la valeur estValide de la requête ou la valeur par défaut
      });
  
      // Save the new command to the database
      const command = await newCommand.save();
  
      // Send a response indicating the command was created successfully
      res.status(201).json(command);
    } catch (error) {
      // Handle any errors that occur during command creation
      console.error(error);
      res.status(500).json({ error: 'Error creating command' });
    }
};

const getCommand = (req, res, next) => {
  Command.findById(req.params.id).then((command) => {
		console.log('GET Retrieved ID: ' + command._id);
		res.format({
			json: () => {
				res.json(command);
			}
		});
	}).catch((error) => {
		// transmit the error to the next middleware
		return next(error);
	});
};

module.exports = { createCommand, getCommand };