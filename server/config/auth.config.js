const crypto = require('crypto');

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex'); // 32 bytes convertis en une chaîne hexadécimale
};

const secretKey = generateSecretKey();

console.log('Clé secrète JWT générée :', secretKey);

module.exports = {
    secret: secretKey
};