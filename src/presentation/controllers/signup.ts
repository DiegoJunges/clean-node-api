import { AddAccount } from '../../domain/usecases/add-account'
import { MissingParamError, InvalidParamError } from '../errors/index'
import { badRequest, serverError } from '../helpers/http-helper'
import { HttpResponse, HttpRequest, Controller, EmailValidator } from '../protocols'
export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccout: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccout = addAccount
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, email, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      this.addAccout.add({
        name,
        email,
        password
      })
      return {
        statusCode: 200,
        body: null
      }
    } catch (error) {
      return serverError()
    }
  }
}
