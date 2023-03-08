const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('./dbConfig');

// const sequelize = new Sequelize('postgres://postgres:admin2023.@localhost:5432/biblioteca', { dialect: "postgres" })

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

//chequea si la conexión es satisfactoria
sequelize.authenticate().then(() => {
    console.log(`Base de datos conectado`)
}).catch((err) => {
    console.log(err)
})

const db = {}
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sections = require('../models/seccion')(sequelize, DataTypes);
db.books = require('../models/libro')(sequelize, DataTypes);

db.sections.hasMany(db.books, { foreignKey: { name: 'seccionid', allowNull: false } });

db.books.belongsTo( db.sections, { foreignKey: 'seccionid', as: 'seccion'} )

module.exports = db;