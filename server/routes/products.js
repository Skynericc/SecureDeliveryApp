const express = require('express');
const router = express.Router();
const productController = require('../controller/products');


router.post('/product', productController.createProduct);
router.route('/product/:id').get(productController.getProductById);
router.route('/product').get(productController.getAllProducts);

module.exports = router;