const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { seccionExiste, existeSectionById } = require('../helpers/db-validators');

const {  seccionesPost, 
         seccionesPut,
         seccionesGetAll,
         seccionesGetByPaginate,
         seccionGetById
      } = require('../controllers/seccion');


const router = Router();

router.get('/seccionesGetByPaginate', seccionesGetByPaginate);

router.get('/seccionesGetAll', seccionesGetAll);

router.get("/seccionGetById/:id", seccionGetById);

router.put('/seccionUpdateById/:id', [
      check( 'id').custom( existeSectionById ),     
      validarCampos
], seccionesPut);

router.post('/seccionPost', [
      check('nombre', 'El nombre de la sección es obligatorio').not().isEmpty(),
      check( 'nombre').custom( seccionExiste ),       
      check('descripcion', 'La descripcion de la sección es obligatorio').not().isEmpty(),
      validarCampos 
], seccionesPost);

module.exports = router;