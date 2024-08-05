const express = require('express');
const adminController = require('../controller/adminController');
const router = express.Router();

// /admin/create
router.post('/create', adminController.createMaterial )

router.put('/edit/:id',adminController.editMaterial)
router.put('/delete/:id',adminController.deleteMaterial)


module.exports = router