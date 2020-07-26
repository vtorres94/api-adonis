'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class RecursoNoEncotradoException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error, { response }) {
    return response.status(404).json({
      error: "El recurso no existe"
    })
  }
}

module.exports = RecursoNoEncotradoException
