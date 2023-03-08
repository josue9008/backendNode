
// Modelo de la sección

module.exports = (sequelize, DataTypes) => {
    const Seccion = sequelize.define("seccion", {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, { timestamps: false })
    return Seccion
}
