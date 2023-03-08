const express = require('express');
const cors = require('cors');
const sequelize = require('sequelize');
const dotenv = require('dotenv').config();
const db = require("../database/config");
const run = require('../seed-data-api/seed-data-api');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.librosPath = '/api/libros';
        this.seccionesPath = '/api/secciones';

        // Conectar a base de datos        
        db.sequelize.sync({ force: true }).then(() => {
            console.log("La base de datos se ha vuelto a sincronizar");

            run(); // Método que ejecuta la semilla de datos hacia la base de datos    
        });
        

        // Middlewares
        this.middlewares();


        // Rutas de la aplicación
        this.routes();
    }



    middlewares() {

        // Cors
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());


        // Directorio público
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.librosPath, require('../routes/libros'));
        this.app.use(this.seccionesPath, require('../routes/seccion'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

module.exports = {
    Server
}