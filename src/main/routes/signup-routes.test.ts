import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  it('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'John Doe',
        password: '123',
        passwordConfirmation: 'email@email.com'
      })
      .expect(200)
  })
})
