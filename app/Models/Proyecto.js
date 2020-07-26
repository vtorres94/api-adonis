'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Proyecto extends Model {
    user () {
        return this.belongsTo('App/Models/User') //Cada proyecto pertenece a un usuario
    }

    tareas () {
        return this.hasMany('App/Models/Tarea') //Cada proyecto tiene muchas tareas
    }
}

module.exports = Proyecto
