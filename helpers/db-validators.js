
const db = require("../database/config");
const Book = db.books;
const Section = db.sections;


const existeBookById = async ( id ) => {          
    // Verifica si existe un libro por Id
    const existeLibro = await Book.findOne({
        where: {
            id
      }             
      });        

    if ( !existeLibro ) {
        throw new Error( `El id: ${id}, no existe` );    
    }
}

const existeSectionById = async ( id ) => {          
    // Verifica si existe una sección por Id
    const existeSeccion = await Section.findOne({
        where: {
            id
      }             
      });        

    if ( !existeSeccion ) {
        throw new Error( `El id: ${id}, no existe` );    
    }
}

const libroExiste = async ( titulo = '' ) => {          
    // Verifica si existe un libro por el título
    const existeLibro = await Book.findOne({
        where: {
            titulo
      }             
      });        

    if ( existeLibro ) {
        throw new Error( `El libro: ${titulo}, ya esta registrado` );    
    }
}

const seccionExiste = async ( nombre = '' ) => {          
    // Verificar si existe una seccion por el nombre
    const existeSeccion = await Section.findOne({
        where: {
           nombre
      }             
      });        

    if ( existeSeccion ) {
        throw new Error( `La seccion: ${nombre}, ya esta registrado` );    
    }
}


module.exports = {        
    existeBookById,
    existeSectionById,
    libroExiste,
    seccionExiste
}