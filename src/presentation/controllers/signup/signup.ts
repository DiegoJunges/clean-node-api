import { badRequest, serverError, ok } from '../../helpers/http-helper'
import { HttpResponse, HttpRequest, Controller, AddAccount, Validation } from '../signup/signup-protocols'
export class SignUpController implements Controller {
  private readonly addAccout: AddAccount
  private readonly validation: Validation

  constructor (addAccount: AddAccount, validation: Validation) {
    this.addAccout = addAccount
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = httpRequest.body

      const account = await this.addAccout.add({
        name,
        email,
        password
      })
      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
