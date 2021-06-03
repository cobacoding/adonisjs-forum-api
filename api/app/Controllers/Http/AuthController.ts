import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    const email = request.input("emaill")
    const password = request.input("password")
    const token = await auth.use("api").attempt(email, password, {
      expiresIn: "1 days",
    })
    return token.toJSON()
  }

  public async register({ request, auth}: HttpContextContract) {
    const email = request.input("email")
    const password = request.input("password")
    const name = request.input("name")
    const newUser = new User()
    newUser.email = email
    newUser.name = name
    newUser.password = password
    await newUser.save()
    const token = await auth.use("api").login(newUser, {
      expiresIn: "1 days",
    })
    return token.toJSON()
  }
}