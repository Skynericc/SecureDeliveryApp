const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
	_id: ObjectId,
	titre: {
		type: String,
		required: true
	},
	desc: {
		type: String
	},
	prix: {
		type: String,
		required: true,
	},
	quant: {
		type: String
	}
});

const productModel = mongoose.model('Products', productSchema);

module.exports = { productModel };
