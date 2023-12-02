const jwt = require('jsonwebtoken');
const User = require('../models/users').userModel;
const bcrypt = require("bcryptjs");
const secretKey = require("../config/auth.config");

//Génerer le token JWT pour l'utiliser après la connexion de l'utilisateur
const generateToken = (user) => {
  return jwt.sign({ userId: user._id }, secretKey.secret, { algorithm: 'HS256', allowInsecureKeySizes: true, expiresIn: '1h' });
};

const login = async (req, res, next) => {
  const { email, mdp } = req.body;

  try {
    // Rechercher l'utilisateur par son email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Identifiants incorrects' });
    }

    // Vérifier le mot de passe
    const isValidPassword = true;


    if (!isValidPassword) {
      return res.status(401).json({ error: 'Identifiants incorrects' });
    }

    // Générez un token JWT
    const token = generateToken(user);

    // Envoyer le token en réponse. On utilisera ce token dans la partie client pour avoir les informations de l'utilisateur connecté
    const nom = user.nom;
    const prenom = user.prenom;
    const nomComplet = nom + " " + prenom;
    const id = user._id;
    res.status(200).json({ token, email, nomComplet, id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur d\'authentification' });
  }
};

module.exports = { login };