'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RespostaSchema extends Schema {
  up () {
    this.create('respostas', (table) => {
      table.increments()
      table.timestamps()
      table.string('descricao').notNullable()
      table.integer('qtdLike')
      table.integer('pergunta_id').references('id').inTable('perguntas')
    })
  }

  down () {
    this.drop('respostas')
  }
}

module.exports = RespostaSchema
