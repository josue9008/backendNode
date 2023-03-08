const { request, response } = require('express');
const { sequelize } = require('../database/config');
const db = require("../database/config");
const Libro = db.books;
const Seccion = db.sections;


// Se configura la paginación

const getPagination = (page, size) => {
    const limit = size ? +size : 5;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };
  
  const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: libro } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, libro, totalPages, currentPage };
  };


const librosGetByPaginate = async (req = request, res = response) => {  

// Se adquiere los valores que vengan de page y size
  const { page, size } = req.query;    

  const pageInt = parseInt(page);
  const sizeInt = parseInt(size);
 
  const { limit, offset } = getPagination(pageInt, sizeInt);
 
  await Libro.findAndCountAll({ 
    order: [
      ['id', 'ASC']
  ],  include: ["seccion"],limit, offset })
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
          err.message || "Algún error mientras se realizaba las peticiones de los libros."
      });
    });
  };

  const librosGetAll = async (req = request, res = response) => { 
     try {

      const seccioId= req.query.seccioid;
       
      const librosGetAll = await Libro.findAll({
        order: [
          ['id', 'ASC']
      ],
      include: ["seccion"]
      });      

      // Generar respuesta exitosa
    return res.status(200).json({
      ok: true,
      librosGetAll
    });
       
     } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: 'Por favor hable con el administrador'
      });       
     }    
  };

  
const libroGetById = async (req = request, res = response) => {
  const id = req.params.id;

  try {    

    const libroGetById = await Libro.findOne({
      where: {
          id: id
    },
    include: ["seccion"]      
    });

    if( libroGetById ) {

      // Generar respuesta exitosa
    return res.status(200).json({
      ok: true,
      libroGetById
    }); 

    } else {
      res.status(500).send({
        ok:false,
        message: "No existe el libro con el id=" + id + "."
      });  
    }    
  } catch (error) {
    res.status(500).send({
      ok:false,
      message: "Error al recibir el libro con el id=" + id + ".Por favor hable con el administrador "
    });    
  } 
};


const librosPost = async (req = request, res = response) => {
  try {

    // Crear libro con el modelo
    const dbBook = new Libro(req.body);

    // Crear libro de DB
    await dbBook.save();

    // Generar respuesta exitosa
    return res.status(201).json({
      ok: true,
      id: dbBook.id,
      titulo: dbBook.titulo,
      autor: dbBook.autor,
      ejemplares: dbBook.cantidad_ejemplares
    });


  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });
  }
}

const librosPut = async (req = request, res = response) => {
  const id = req.params.id;
  await Libro.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(201).json({
          ok: true,
          message: "El libro se actualizó de manera correcta."
        });
      } else {
        res.status(500).json({
          ok: false,
          message: `No se pudo actualizar el libro con el id=${id}. Por favor hable con el administrador`
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        ok:false,
        message: "Error al realizar la actualización del libro con el id=" + id
      });
    });  
};

const librosSeedData = async(libro) => {
  await Libro.create({
    titulo: libro.titulo,
    autor: libro.autor,
    resumen: libro.resumen,
    portada: libro.portada,
    cantidad_ejemplares: libro.cantidad_ejemplares,
    fecha_publicacion: libro.fecha_publicacion,
    seccionid: libro.seccionid,
  })
    .then((libro) => {     
      return libro;
    })
    .catch((err) => {
      console.log("Error durante la inserción de los datos en el libro:", err);
    });
};


module.exports = {
  librosGetByPaginate,
  librosPost,
  librosPut,
  librosGetAll,
  librosSeedData,
  libroGetById
}