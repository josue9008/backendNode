

 const seccionController = require('../controllers/seccion');
 const libroController = require('../controllers/libros');

const run = async () => {
    const seccion1 = await seccionController.seccionesSeedData({
        nombre: "Seccion 1 ",
        descripcion: "Descripcion Seccion 1",
    });

    const seccion2 = await seccionController.seccionesSeedData({
        nombre: "Seccion 2 ",
        descripcion: "Descripcion Seccion 2",
    });

    const seccion3 = await seccionController.seccionesSeedData({
        nombre: "Seccion 3 ",
        descripcion: "Descripcion Seccion 3",
    });

    const seccion4 = await seccionController.seccionesSeedData({
        nombre: "Seccion 4 ",
        descripcion: "Descripcion Seccion 4",
    });

    const seccion5 = await seccionController.seccionesSeedData({
        nombre: "Seccion 5 ",
        descripcion: "Descripcion Seccion 5",
    });

    const seccion6 = await seccionController.seccionesSeedData({
        nombre: "Seccion 6",
        descripcion: "Descripcion Seccion 6",
    });

    const seccion7 = await seccionController.seccionesSeedData({
        nombre: "Seccion 7",
        descripcion: "Descripcion Seccion 7",
    });

    const seccion8 = await seccionController.seccionesSeedData({
        nombre: "Seccion 8",
        descripcion: "Descripcion Seccion 8",
    });

    const libro1 = await libroController.librosSeedData({
        titulo: "Libro 1",
        autor: "Multiples Autores",
        resumen: "Libro 1",
        portada: "Portada del Libro 1",
        cantidad_ejemplares: "100000",
        fecha_publicacion: "2022-04-02",
        seccionid: 1,
    });

    const libro2 = await libroController.librosSeedData({
        titulo: "Libro 2",
        autor: "Multiples Autores",
        resumen: "Libro 2",
        portada: "Portada del Libro 2",
        cantidad_ejemplares: "100000",
        fecha_publicacion: "2022-04-02",
        seccionid: 1,
    });

    const libro3 = await libroController.librosSeedData({
        titulo: "Libro 3",
        autor: "Autor del Libro 3",
        resumen: "Libro 3",
        portada: "Portada del Libro 3",
        cantidad_ejemplares: "100000",
        fecha_publicacion: "2022-04-02",
        seccionid: 2,
    });

    const libro4 = await libroController.librosSeedData({
        titulo: "Libro 4",
        autor: "Autor del Libro 4",
        resumen: "Libro 4",
        portada: "Portada del Libro 4",
        cantidad_ejemplares: "100000",
        fecha_publicacion: "2022-04-02",
        seccionid: 2,
    });

    const libro5 = await libroController.librosSeedData({
        titulo: "Libro 5",
        autor: "Autor del Libro 5",
        resumen: "Libro 5",
        portada: "Portada del Libro 5",
        cantidad_ejemplares: "1000000",
        fecha_publicacion: "2021-04-02",
        seccionid: 2,
    });

    const libro6 = await libroController.librosSeedData({
        titulo: "Libro 6",
        autor: "Autor del Libro 5",
        resumen: "Libro 6",
        portada: "Portada del Libro 6",
        cantidad_ejemplares: "1000000",
        fecha_publicacion: "1960-04-02",
        seccionid: 3,
    });

    const libro7 = await libroController.librosSeedData({
        titulo: "Libro 7",
        autor: "Autor del Libro 1",
        resumen: "Libro 7",
        portada: "Portada del Libro 7",
        cantidad_ejemplares: "1000000",
        fecha_publicacion: "2021-04-02",
        seccionid: 3,
    });

    const libro8 = await libroController.librosSeedData({
        titulo: "Libro 8",
        autor: "Autor del Libro 8",
        resumen: "Libro 8",
        portada: "Portada del Libro 8",
        cantidad_ejemplares: "1000000",
        fecha_publicacion: "2021-04-02",
        seccionid: 4,
    });

    const libro9 = await libroController.librosSeedData({
        titulo: "Libro 9",
        autor: "Autor del Libro 9",
        resumen: "Libro 9",
        portada: "Portada del Libro 9",
        cantidad_ejemplares: "1000000",
        fecha_publicacion: "2021-04-02",
        seccionid: 4,
    });

    const libro10 = await libroController.librosSeedData({
        titulo: "Libro 10",
        autor: "Autor del Libro 10",
        resumen: "Libro 10",
        portada: "Portada del Libro 10",
        cantidad_ejemplares: "10000000",
        fecha_publicacion: "2021-04-02",
        seccionid: 4,
    });

    const libro11 = await libroController.librosSeedData({
        titulo: "Libro 11",
        autor: "Autor del Libro 11",
        resumen: "Libro 11",
        portada: "Portada del Libro 11",
        cantidad_ejemplares: "10000000",
        fecha_publicacion: "2021-04-02",
        seccionid: 4,
    });

    const libro12 = await libroController.librosSeedData({
        titulo: "Libro 12",
        autor: "Autor del Libro 12",
        resumen: "Libro 12",
        portada: "Portada del Libro 12",
        cantidad_ejemplares: "10000000",
        fecha_publicacion: "2021-04-02",
        seccionid: 5,
    });

    const libro13 = await libroController.librosSeedData({
        titulo: "Libro 13",
        autor: "Autor del Libro 13",
        resumen: "Libro 13",
        portada: "Portada del Libro 13",
        cantidad_ejemplares: "10000000",
        fecha_publicacion: "2021-04-02",
        seccionid: 5,
    });

    const libro14 = await libroController.librosSeedData({
        titulo: "Libro 14",
        autor: "Autor del Libro 14",
        resumen: "Libro 14",
        portada: "Portada del Libro 14",
        cantidad_ejemplares: "10000000",
        fecha_publicacion: "2021-04-02",
        seccionid: 6,
    });

    const libro15 = await libroController.librosSeedData({
        titulo: "Libro 15",
        autor: "Autor del Libro 15",
        resumen: "Libro 15",
        portada: "Portada del Libro 15",
        cantidad_ejemplares: "10000000",
        fecha_publicacion: "2021-04-02",
        seccionid: 7,
    });

    
}

module.exports = run;