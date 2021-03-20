/* const chaiHttp = require('chai-http');
const chai = require('chai');
const app =require('../src/api/app');

/*
import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../src/app';
 
chai.use(chaiHttp);
const { expect } = chai;
const { request } = chai;

describe('API', () => {
  describe('POST /users', () => {
    it('given videoID of a publically available video, responds with 200 and JSON that contains an array of objects', async () => {
      const res = await request(app)
        .post('/users')
        .send({ videoID: 'OrxmtDw4pVI' });

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
    });

    it('given an invalid videoID, responds with 400 and an Error', async () => {
      const res = await request(app)
        .post('/api/info')
        .send({ videoID: 'qwerty' });

      expect(res).to.have.status(400);
      expect(res.body.error).to.include('Error');
    });
  });
});
 */