import { bodyParser } from '../lib/body-parser.js';
describe('body parser', () => {
    it('returns null if method is not POST, PUT, or PATCH', () => {
        const req = { method: 'GET', url: '/' };
        const res = bodyParser(req);
        expect(res).toEqual(null);
    });
    xit('throws if content-type is not application/json', () => {
        const req = { method: 'POST', contentType: 'text/plain' };
        const res = bodyParser(req);
        expect(res).toEqual('thrown: Content-Type Incorrect');
    });
});
