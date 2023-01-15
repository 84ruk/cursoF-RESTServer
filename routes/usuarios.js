const { Router } = require('express');
const { check, query } = require('express-validator');

const { validarCampos } = require("../middlewares/validar-campos");
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators'); 

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');

const router = Router();


router.get(
  "/",
  [
    query("limite", "El limite debe ser un numero")
      .isNumeric()
      .optional()
      .isInt(),
    query("desde", "El desde debe ser un numero").isNumeric().optional(),
    validarCampos,
  ],
  usuariosGet
);

router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check('rol').custom( esRoleValido ),
    validarCampos,
  ],
  usuariosPut
);

router.post(
  "/",
  [
    // middleware
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser de 6 caracteres").isLength({
      min: 6,
    }),
    check("correo", "El correo no es valido").isEmail(),
    check('rol').custom( esRoleValido ),
    check( 'correo' ).custom( emailExiste ),
    /* check("rol", "El rol no es valido").isIn(["ADMIN_ROLE", "USER_ROLE"]), */
    validarCampos
    ]
    ,
  usuariosPost
);

router.delete('/:id',[
  check("id", "No es un ID valido").isMongoId(),
  check("id").custom(existeUsuarioPorId),
  validarCampos
], usuariosDelete );

router.patch('/', usuariosPatch );

module.exports = router;