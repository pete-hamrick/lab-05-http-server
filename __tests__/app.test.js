// import SimpleDb from '../lib/simple-db.js';
import { readFile } from 'fs/promises';
import request from 'supertest';
import app from '../lib/app.js';
describe.skip('app.js public routes', () => {
    it('should return index.html from GET /', async () => {
        const res = await request(app).get('/');
        const readHTML = await readFile('./public/index.html', 'utf-8');
        expect(res.text).toEqual(readHTML);
    });
    it('should return main.css file contents on GET /styles/main.css', async () => {
        const res = await request(app).get('/styles/main.css');
        const css = await readFile('./public/css/main.css', 'utf-8');
        expect(res.text).toEqual(css);
    });
    it('should return 404 from GET /bad-file', async () => {
        const res = await request(app).get('/bad-file');
        expect(res.text).toEqual(
            '<html><body><h1>Not Found</h1></body></html>'
        );
    });
    it('should return 404 from get of folder /styles', async () => {
        const res = await request(app).get('/styles');
        expect(res.text).toEqual(
            '<html><body><h1>Not Found</h1></body></html>'
        );
    });
});
