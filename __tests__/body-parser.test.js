import { bodyParser } from '../lib/body-parser.js';
describe('body parser', () => {
    it('returns null if method is not POST, PUT, or PATCH', async () => {
        const req = { method: 'GET', url: '/' };
        const res = await bodyParser(req);
        expect(res).toEqual(null);
    });
    it('throws if content-type is not application/json', async () => {
        const req = { method: 'POST', contentType: 'text/plain' };
        const res = await bodyParser(req);
        expect(res).toEqual('Bad Request');
    });
});
