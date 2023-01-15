const Role = require("../models/role");
const Usuario = require('../models/usuarios');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if(!existeRol){
      throw new Error("El rol no existe");
    }
}

const emailExiste = async(correo = '') => {

  const existeEmail = await Usuario.findOne({ correo });

  if( existeEmail ){
    throw new Error(`Una cuenta con el correo: ${ correo } ya existe`)
  }

}

const existeUsuarioPorId = async(id) => {

  const existeUsuario = await Usuario.findById(id);

  if(!existeUsuario ){
    throw new Error(`El ID: ${ id } no existe`)
  }

}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}