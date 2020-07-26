'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tarea extends Model {
    proyecto () {
        return this.belongsTo('App/Models/Proyecto') //Cada tarea pertenece a un proyecto
    }
}

module.exports = Tarea
