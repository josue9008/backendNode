const { request, response } = require('express');
const db = require("../database/config");
const Seccion = db.sections;


// Se configura la paginación

const getPagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: secciones } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, secciones, totalPages, currentPage };
};


const seccionesGetByPaginate = async( req = request, res = response ) => {

  // Se adquiere los valores que vengan de page y size
  const { page, size } = req.query;    

  // const pageInt = parseInt(page * size);
  const pageInt = parseInt(page);
  const sizeInt = parseInt(size);
 
  const { limit, offset } = getPagination(pageInt, sizeInt);
  
 
  await Seccion.findAndCountAll({ 
    order: [
      ['id', 'ASC']
  ], include: ["libros"],limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.status(200).json({
        ok: true,
        response
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algún error mientras se realizaba las peticiones de las secciones."
      });
    });
};

const seccionesGetAll = async (req = request, res = response) => {  
  try {
       
    const seccionesGetAll = await Seccion.findAll({
      order: [
        ['id', 'ASC']
    ], include: ["libros"]
    });      

    // Generar respuesta exitosa
  return res.status(200).json({
    ok: true,
    seccionesGetAll
  });
     
   } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });       
   }  
  
};

const seccionGetById = async (req = request, res = response) => {
  const id = req.params.id;

  try {    

    const seccionGetById = await Seccion.findOne({
      where: {
          id: id
    }, include: ["libros"]       
    });

    if( seccionGetById ) {

      // Generar respuesta exitosa
    return res.status(200).json({
      ok: true,
      seccionGetById
    }); 

    } else {
      res.status(500).send({
        ok:false,
        message: "No existe la seccion con el id=" + id + "."
      });  
    }    
  } catch (error) {
    res.status(500).send({
      ok:false,
      message: "Error al recibir la seccion con el id=" + id + ".Por favor hable con el administrador "
    });    
  } 
};


const seccionesPost = async(req, res = response) => {
    try {  

        // Crear seccion con el modelo
        const dbSection = new Seccion( req.body );       

        // Crear libro de DB
        await dbSection.save();

        // Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            id: dbSection.id,
            titulo:dbSection.nombre,
            autor: dbSection.descripcion              
        }); 

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }  
}

const seccionesPut = async( req = request, res = response ) => {

    const id = req.params.id;

     await Seccion.update(req.body, {
        where: { id:id }
      })
        .then(num => {
          if (num == 1) {
            // Generar respuesta exitosa
            res.status(201).json({
              ok: true,
              message: "La sección se actualizó de manera correcta."
            });
          } else {
            res.status(500).json({
              ok: false,
              message: `No se pudo actualizar la sección con el id=${id}. Por favor hable con el administrador`
            });
          }
        })
        .catch(err => {
          res.status(500).json({
            ok: false,
            message: "Error al realizar la actualización de la sección con el id=" + id
          });
        });    
};

const seccionesSeedData = async(seccion) => {
  await Seccion.create({
    nombre: seccion.nombre,
    descripcion: seccion.descripcion,
  })
    .then((seccion) => {     
      return seccion;
    })
    .catch((err) => {
      console.log("Error durante la inserción de los datos en la seccion:", err);
    });
};


module.exports = {
 seccionesGetByPaginate,
 seccionesPost,
 seccionesPut,
 seccionesGetAll,
 seccionesSeedData,
 seccionGetById
}