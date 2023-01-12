const { response, request } = require("express");


const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'no nombre', apikey, page = 1, limit = 20 } = req.query;

    res.json({
      msg: "Todo esta bien - controlador get",
      q,
      nombre,
      apikey,
      page,
      limit,
      //query: req.query
    });

  }

const usuariosPost = (req, res = response) => {

  const { nombre, edad } = req.body; 

    res.json({
      msg: "Todo esta bien - controlador post",
      nombre, 
      edad
    });

  }

const usuariosPut = (req, res = response) => {

  const id = req.params.id;

    res.json({
        msg: "Todo esta bien - controlador put",
        id
      });

  }
const usuariosPatch = (req, res = response) => {

  res.json({
    msg: "Todo esta bien - controlador patch",
  });

}
const usuariosDelete = ( req, res = response) => {

  res.json({
    msg: "Todo esta bien - controlador delete",
  });

} 

  module.exports = {
    usuariosGet,
    usuariosPatch,
    usuariosDelete,
    usuariosPost,
    usuariosPut,
  };