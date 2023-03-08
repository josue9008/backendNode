

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, correoExiste, existeUsuarioById } = require('../helpers/db-validators');

const { usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosDelete, 
        usuariosPatch } = require('../controllers/usuarios');



const router = Router();


router.get('/', usuariosGet);

router.put('/:id', [
        check('id', 'El id no es válido'),
        check( 'id').custom( existeUsuarioById ),
        check('rol', 'No es un rol válido').custom( (rol) => esRoleValido(rol) ),
        validarCampos
],usuariosPut);

router.post('/',[
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio y más de 6 letras').isLength({min:6}),
        check('correo', 'El correo no es válido').isEmail(),
        // check('correo').custom( correoExiste ),
        check('correo').custom( (correo) => correoExiste(correo) ),
        // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('rol', 'No es un rol válido').custom( (rol) => esRoleValido(rol) ),
        // check('rol', 'No es un rol válido').custom( esRoleValido ),
        validarCampos

], usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);


module.exports = router;