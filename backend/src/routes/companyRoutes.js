const express = require('express');
const companyController = require('../controllers/companyController');

const router = express.Router();

router.post('/', companyController.create);
router.get('/:id', companyController.get);
router.get('/', companyController.list);
router.put('/:id', companyController.update);
router.delete('/:id', companyController.delete);



module.exports = router;
