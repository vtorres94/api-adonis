'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class InvalidDataException extends LogicalException {
  /**
   * Handle this exception by Vladimir Torres
   */
  handle (error, { response }) {
    return response.status(400).json({
      error: "Campo invalido"
    })
  }
}

module.exports = InvalidDataException
