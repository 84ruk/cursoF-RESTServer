const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuarios");


const usuariosGet = async(req = request, res = response) => {

    /* const { q, nombre = 'no nombre', apikey, page = 1, limit = 20 } = req.query; */
    const { limite = 0, desde = 0 } = req.query;
    const query = { estado: true };
/* 
    const usuarios = await Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limite));

    const total = await Usuario.countDocuments(query);
 */
    const [total, usuarios] = await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query)

        .skip(Number(desde))
        .limit(Number(limite)),
    ]);

    res.json({
      total,
      usuarios
      //query: req.query 
    });

  }

const usuariosPost = async(req, res = response) => {

  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //Verificar si correo existe
  const existeEmail = await Usuario.findOne({ correo });

  if (existeEmail) {
    return res.status(400).json({
      msg: "El correo ya existe",
    });
  }

  //Encriptar la contraseña
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);

  //Guardar en BDD
  await usuario.save();

  res.json({
    usuario
  });
}

const usuariosPut = async(req, res = response) => {

  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  
  //TODO VALIDART CONTRA BASE DE DATOS
  if( password ){
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate( id, resto); //encuentra en base al id y actualiza el segundo parametro qe en este caso es el resto

    res.json(usuario);

  }
const usuariosPatch = (req, res = response) => {

  res.json({
    msg: "Todo esta bien - controlador patch",
  });

}
const usuariosDelete = async( req, res = response) => {
  const { id } = req.params;

  //Fisicamente lo borramos
  /* const usuario = await Usuario.findByIdAndDelete(id); no es recomendable por que puede ocurrir un error si el id no existe Y se pierde la referencia */
  const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

  res.json({
    msg: `el usuario ${usuario.nombre} se ha eliminado`,
  });
} 

  module.exports = {
    usuariosGet,
    usuariosPatch,
    usuariosDelete,
    usuariosPost,
    usuariosPut,
  };