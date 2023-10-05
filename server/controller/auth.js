const jwt = require('jsonwebtoken');
const User = require('../models/users').userModel; 
const bcrypt = require("bcryptjs");
const secretKey = require("../config/auth.config");

const generateToken = (user) => {
  return jwt.sign({ userId: user._id }, secretKey.secret, { algorithm: 'HS256', allowInsecureKeySizes: true, expiresIn: '1h' });
};

const login = async (req, res, next) => {
  const { email, mdp } = req.body;

  try {
    // Recherchez l'utilisateur par son email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Identifiants incorrects' });
    }

    // Vérifiez le mot de passe
    const isValidPassword = bcrypt.compareSync(
      mdp,
      user.mdp
    );
    

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Identifiants incorrects' });
    }

    // Générez un token JWT
    const token = generateToken(user);

    // Envoyez le token en réponse
    const nom = user.nom;
    const prenom = user.prenom;
    const nomComplet = nom + " " + prenom;
    res.status(200).json({ token, email, nomComplet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur d\'authentification' });
  }
};

module.exports = { login };