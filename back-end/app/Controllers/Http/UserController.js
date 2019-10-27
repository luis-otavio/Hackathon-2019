'use strict'

const User = use("App/Models/User")

class UserController {

    store ({ request, auth }){

        let user = request.all()

        const response = this.usuarioLogado(auth).then(async res => { 
            user.user_id = res.id
            user = await User.create(user)
            return user
        })
        return response
    }

    async login ({ request, auth }){

        const { username, password } = request.all()

        const token = await auth.attempt(username, password)

        const user = await User
            .findBy('username', username)

        Object.assign(user, token)

        return user
    }

    async usuarioLogado(auth) {
        try {
            return await auth.getUser()
        } catch (error) {
            console.log(error)
        }
    }
    
}

module.exports = UserController