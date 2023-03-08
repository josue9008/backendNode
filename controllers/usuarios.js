const { response } = require('express');
// const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
//const { generarJWT } = require('../helpers/jwt');
const Pool = require('pg').Pool;
const db = require("../database/config");
const Usuario = db.users;
const Role = db.role;

const getPagination = (page, size) => {
  /*const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;*/

  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: users } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, users, totalPages, currentPage };
};


const  usuariosGet = async( req = request, res = response ) => {

    // const {q, nombre = 'No name',apiKey, page = 1, limit} = req.query;

    // const usuarios = await Usuario.findAll().; Todos los registros

  const { page = 5, size = 2 } = req.query;  

  const { limit , offset } = getPagination(page, size);

   await Usuario.findAndCountAll({ where: page, size })
    .then(data => {     
      const response = getPagingData(data, page, limit);
      //res.send(response);
      res.json({   
        response
    });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algún error ocurrió al recibir los usuarios."
      });
    });
    
    /**/
};


const usuariosPost = async(req, res = response) => {
 

    const { correo, nombre, password } = req.body;

    try {  

        // Crear usuario con el modelo
        const dbUser = new Usuario( req.body );

        // Hashear la contraseña
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync( password, salt );

        // Generar el JWT
          //const token = await generarJWT( dbUser.id, name );

        // Crear usuario de DB
        await dbUser.save();

        // Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name:dbUser.nombre
            // dbUser 
            // token
        });

    

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const usuariosPut = async( req, res = response ) => {

    const {id} = req.params;   
 

    Usuario.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });

};


const usuariosDelete = ( req, res = response ) => {
    
    res.json({               
        msg: 'delete API - controlador'
    });
};

const usuariosPatch = ( req, res = response ) => {
    
    res.json({               
        msg: 'patch API - controlador'
    });
};



module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch
}