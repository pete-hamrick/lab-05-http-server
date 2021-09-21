// import SimpleDb from '../lib/simple-db.js';
import { readFile } from 'fs/promises';
import request from 'supertest';
import app from '../lib/app.js';
describe('app.js public routes', () => {
  it.only('should return index.html from GET /', async () => {
    const res = await request(app).get('/');
    console.log(res.text);
    const readHTML = await readFile('./public/index.html', 'utf-8');
    expect(res.text).toEqual(readHTML);
  });
});
