// inventory.js
var router = require('express').Router();
const inventoryCtrl = require('./controller/inventoryCtrl.js');

router.get('/listar', inventoryCtrl.list);
router.get('/agregar', inventoryCtrl.showAddForm);
router.post('/agregar', inventoryCtrl.create);
router.get('/modificar', inventoryCtrl.showUpdateForm);
router.post('/modificar', inventoryCtrl.update);
router.get('/eliminar', inventoryCtrl.showDeleteForm);
router.post('/eliminar', inventoryCtrl.remove);

module.exports = router;
