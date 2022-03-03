import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';

it('returns a 404 if the provided id does not exsit', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({ title: 'g5YuYEo5Q1wdPWI', price: 10.25 })
    .expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({ title: 'g5YuYEo5Q1wdPWI', price: 10.25 })
    .expect(401);
});

it('returns 401 if the user does not won the ticket', async () => {});

it('returns a 400 if the user provides invalid title or price', async () => {});

it('updates the ticket provided an invalid title or price', async () => {});
