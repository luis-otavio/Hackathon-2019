'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PerguntaSchema extends Schema {
  up () {
    this.create('perguntas', (table) => {
      table.increments()
      table.timestamps()
      table.string('descricao').notNullable()
      table.string('titulo').notNullable()
    })
  }

  down () {
    this.drop('perguntas')
  }
}

module.exports = PerguntaSchema
