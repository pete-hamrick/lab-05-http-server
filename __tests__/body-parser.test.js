import { bodyParser } from '../lib/body-parser.js';
describe('body parser', () => {
    it('returns null if method is not POST, PUT, or PATCH', async () => {
        const req = { method: 'GET', url: '/' };
        const res = await bodyParser(req);
        expect(res).toEqual(null);
    });
});
