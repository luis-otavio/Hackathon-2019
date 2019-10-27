'use strict'

const Pergunta = use("App/Models/Pergunta")

class PerguntaController {

    async store ({ request }){

        let pergunta =  request.all()

        pergunta = await Pergunta.create(pergunta)
        return pergunta
    }

    async index () {

        const perguntas = Pergunta.all()
      
        return perguntas
    }

    async show({ params }){
        const pergunta = await Pergunta.findOrFail(params.id)
        
        await pergunta.load('respostas')

        return pergunta
    }
    
}

module.exports = PerguntaController