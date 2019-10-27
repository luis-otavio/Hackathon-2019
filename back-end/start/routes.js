'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//Perguntas
Route.resource('pergunta', 'PerguntaController')
  .apiOnly()

//Respostas
Route.resource('resposta', 'RespostaController')
  .apiOnly()
Route.put('ranqueiaResposta/:id', 'RespostaController.ranqueiaResposta')