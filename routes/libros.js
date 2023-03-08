const { Router } = require('express');
const { check } = require('express-validator');
const { existeBookById, libroExiste, existeSectionById } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const {  librosPost, 
        librosPut,
        librosGetAll,
        librosGetByPaginate,
        libroGetById
      } = require('../controllers/libros');

const router = Router();

router.get('/librosGetByPaginate', librosGetByPaginate);

router.get('/librosGetAll', librosGetAll);

router.get("/libroGetById/:id", libroGetById);

router.put('/libroUpdateById/:id', [
  check( 'id').custom( existeBookById ),    
  validarCampos
], librosPut);

router.post('/libroPost',[
  check('titulo', 'El título es obligatorio').not().isEmpty(),  
  check('titulo').custom( libroExiste ),  
  check('autor', 'El nombre del autor es obligatorio').not().isEmpty(),
  check('portada', 'La foto de la portada es obligatorio').not().isEmpty(),
  check('cantidad_ejemplares', 'La cantidad de ejemplares es obligatorio').not().isEmpty(),
  check('fecha_publicacion', 'La fecha de publicación es obligatorio').not().isEmpty(),
  check('seccionid', 'El id de la sección es obligatorio').not().isEmpty(),
  check('seccionid', 'El id de la sección no se encuentra').custom( existeSectionById ),    
  validarCampos
], librosPost);

module.exports = router;