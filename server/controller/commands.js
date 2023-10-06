const mongoose = require('mongoose');
const Command = require('../models/command').commandModel;
const Product = require('../models/product').productModel;

const createCommand = async (req, res, next) => {
    try {
      const { utilisateur, produits, estValide, adresse, totalPrice } = req.body;
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
        utilisateur,
        produits: produits.map((product) => ({
          produit: product.produit, // ID du produit
          titre: product.titre, //titre du produit
          quantite: product.quantite, // Quantité demandée
        })),
        estValide: estValide || false, // La valeur estValide de la requête ou la valeur par défaut(false)
        adresse,
        totalPrice 
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

const getCommandById = (req, res, next) => {
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

const getAllCommands = (_req, res, next) => {
	// Retrieve all products from Mongo
	Command.find({}).then((commands) => {
		res.format({
			// JSON response will show all users in JSON format
			json: () => {
				res.json(commands);
			}
		});
	}).catch((error) => {
		// transmit the error to the next middleware
		return next(error);
	});
};

const confirmCommand = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      // Recherchez la commande par son ID
      const commande = await Command.findById(id);
  
      if (!commande) {
        return res.status(404).json({ error: 'Commande introuvable' });
      }
  
      if (commande.estValide) {
        return res.status(400).json({ error: 'La commande a déjà été confirmée' });
      }
  
  
      // Mettez à jour les quantités des produits dans la base de données
      const invalidProducts = await Promise.all(
        commande.produits.map(async (produit) => {
          const product = await Product.findById(produit.produit);
  
          if (!product) {
            return res.status(404).json({ error: 'Produit introuvable' });
          }
  
          if (produit.quantite > product.quant) {
            return product.titre; // Return the title of the invalid product
          }
  
          return null; // Product is valid
        })
      );

      // Filter out null values (valid products) from the array of invalid products
      const invalidProductNames = invalidProducts.filter((productName) => productName !== null);

      if (invalidProductNames.length > 0) {
        // There are invalid products in the command
        return res.status(400).json({
          error: 'Un ou plusieurs produits non disponibles en stock',
          invalidProducts: invalidProductNames,
        });
      }

      // Subtract quantities from the quantity in stock for each product
      await Promise.all(
        commande.produits.map(async (produit) => {
          const product = await Product.findById(produit.produit);

          if (product) {
            // Subtract the wanted quantity from the quantity in stock
            product.quant -= produit.quantite;

            // Save the updated product in the database
            await product.save();
          }
        })
      );

      // Mettre à jour la commande pour la marquer comme valide
      commande.estValide = true;
      await commande.save();
      res.status(200).json({ message: 'Commande confirmée avec succès' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la confirmation de la commande' });
    }
};

const updateCommand = async (req, res, next) => {
    const { id } = req.params;
    const updatedCommandData = req.body;
  
    try {
      // Recherchez la commande par son ID
      const commande = await Command.findById(id);
  
      if (!commande) {
        return res.status(404).json({ error: 'Commande introuvable' });
      }
  
      if (commande.estValide) {
        return res.status(400).json({ error: 'La commande validée ne peut pas être mise à jour' });
      }
  
      // Mettez à jour les données de la commande avec les nouvelles données
      Object.assign(commande, updatedCommandData);
  
      // Enregistrez la commande mise à jour dans la base de données
      const updatedCommande = await commande.save();
  
      // Envoyez une réponse avec la commande mise à jour
      res.status(200).json(updatedCommande);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la mise à jour de la commande' });
    }
};

module.exports = { createCommand, getCommandById, getAllCommands, confirmCommand, updateCommand };