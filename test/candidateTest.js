/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable consistent-return */
/* eslint-disable indent */

import chai, { expect } from 'chai';
import request from 'supertest';
import app from '../app';

let admintoken;

describe('POST Requests', () => {
      describe ('POST /api/v1/auth/login', () => {
        it('should sign in a user', (done) => {
          request(app)
            .post('/api/v1/auth/login')
            .send({
              email: 'kaks@gmail.com',
              password: 'kaka',
            })
            .end((err, res) => {
              expect(res.statusCode).to.equal(200);
              expect(res.body).to.be.an('object');
              expect(res.body.data).to.be.an('array');
              expect(res.body.data[0]).to.be.an('object');
              admintoken = res.body.data[0].token;
              console.log('admintoken', admintoken);
            if (err) { return done(err); }
            done();
            });
        });
      });

      describe ('POST /api/v1/offices/id/register', () => {
        it('should create a new candidate', (done) => {
          request(app)
            .post('/api/v1/office/1/register')
            .set('x-auth', admintoken)
            .send({
              office: 1,
              party: 1,
              userid: 2
            })
            .end((err, res) => {
              expect(res.statusCode).to.equal(201);
              expect(res.body).to.be.an('object');
              expect(res.body.data).to.be.an('array');
              expect(res.body.data[0]).to.be.an('object');
            done();
            });
        });
      });

      describe ('POST /api/v1/offices/id/register', () => {
        it('should check if office id exists', (done) => {
          request(app)
            .post('/api/v1/office/40/register')
            .set('x-auth', admintoken)
            .send({
              office: 1,
              party: 1,
              userid: 1
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.deep.equal({ status: 400, error: 'Office id does not exist' });
            done();
            });
        });
      });

      describe ('POST /api/v1/parties', () => {
        it('should check if candidate has already applied for an office', (done) => {
          request(app)
            .post('/api/v1/office/1/register')
            .set('x-auth', admintoken)
            .send({
              office: 1,
              party: 1,
              userid: 1
            })
            .end((err, res) => {
                expect(res.statusCode).to.equal(409);
                expect(res.body).to.be.an('object');
                expect(res.body).to.deep.equal({ status: 409, error: 'Candidate with this id has already applied for an office' });
            done();
            });
        });
      });
}); 
