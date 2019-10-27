'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pergunta extends Model {
    respostas () {
        return this.hasMany('App/Models/Resposta').orderBy('qtdLike', 'desc')
    }
}

module.exports = Pergunta
