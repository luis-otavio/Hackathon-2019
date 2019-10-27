'use strict'

const Resposta = use("App/Models/Resposta")

class RespostaController {

    async store ({ request }){

        let resposta =  request.all()

        resposta = await Resposta.create(resposta)
        return resposta
    }

    async ranqueiaResposta({ request, params }){
        const resposta = await Resposta.findOrFail(params.id)
        const tipoRanqueamento = request.only('increment')
        if (tipoRanqueamento.increment === true){
            resposta.qtdLike += 1
        }else{
            resposta.qtdLike -= 1
        }
        await resposta.save()
        return resposta
    }
    
}

module.exports = RespostaController