const express = require('express');
const  router = express.Router();

const {getCalculations, getSingleCalculations, postCalculations, editCalcuations, deleteCalculations} = require('../controllers/Calculations')

router.get('/', getCalculations);
router.get('/:id', getSingleCalculations);
router.post('/', postCalculations);
router.patch('/:id', editCalcuations);
router.delete('/:id', deleteCalculations);

module.exports = router;