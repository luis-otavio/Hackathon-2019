'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Resposta extends Model {
    pergunta () {
        return this.belongsToMany('App/Models/Pergunta')
    }
}

module.exports = Resposta