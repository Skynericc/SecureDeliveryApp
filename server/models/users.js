const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
	_id: ObjectId,
	nom: {
		type: String,
		required: true
	},
	prenom: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	addrNum: {
		type: String
	},
	addrRue: {
		type: String
	},
	ville: {
		type: String,
	},
	codePost: {
		type: String,
	}
});

const userModel = mongoose.model('Users', userSchema);

module.exports = { userModel };
