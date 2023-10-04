const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const commandSchema = new Schema({
	_id: ObjectId,
	utilisateur: {
		type: String,
		required: true
	},
	produits: [
		{
		produit: {
			type: String,
			required: true,
		},
		quantite: {
			type: String,
			required: true,
		},
	},
	  ],
	estValide: {
		type: Boolean,
    	default: false,
	},
	adresse:{
		type: String
	}
});

const commandModel = mongoose.model('Commands', commandSchema);

module.exports = { commandModel };
