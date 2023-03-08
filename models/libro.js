// Modelo de el libro

module.exports = (sequelize, DataTypes) => {
    const Libro = sequelize.define( "libro", {
       titulo: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        autor: {
            type: DataTypes.STRING,                       
            allowNull: false
        },
        resumen: {
            type: DataTypes.STRING,
            allowNull: true
        },        
        portada: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cantidad_ejemplares: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha_publicacion: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },       
    }, {timestamps: false}, )
    return Libro
  }