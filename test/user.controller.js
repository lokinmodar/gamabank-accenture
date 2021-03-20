/* 
const chaiHttp =require('chai-http');
const chai =require('chai');
const app =require('../src/api/app');

chai.use(chaiHttp);
const { expect } = chai;
const { request } = chai;

const botchedRequest = {
  full_name: 'lala',
  user_name: 'lele',
  password: 'laLª131!',
  telephone: '123456789',
  cpf: '21798532620',
  card_due_day: 5
}
//console.log(JSON.stringify(botchedRequest));

describe('API', () => {

  describe("POST /users", () => {
    it('given a json with the fields required sould return status 200 and a json with the generated user account', async () => {
      const okRequest = {
        full_name: 'lala',
        user_name: 'lele',
        user_email: 'lili@lolo.com',
        password: 'laLª131!',
        telephone: '123456789',
        cpf: '21798532620',
        card_due_day: 5
      }

      return await request(app)
        .post("/users")
        .send(okRequest)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.include('createdUser');
    });
  });



    it('given an invalid json without the fields required should return status 400 and a json with the and an Error', async () => {
      const res = await request(app)
        .post('/users')
        .send(botchedRequest);
      expect(res).to.have.status(400);
      expect(res.body.error);
    });
  });
});
 */