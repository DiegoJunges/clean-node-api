import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { AccountModel } from '../../../../domain/models/account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accounCollection = await MongoHelper.getCollection('accounts')
    const { insertedId } = await accounCollection.insertOne(accountData)
    const account = await accounCollection.findOne(insertedId)
    return MongoHelper.map(account)
  }
}
