import SimpleDb from './simple-db.js';
const app = async (req, res) => {
    const [, resource, text] = req.url.split('/');
    if (resource === '') {
        try {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            const newDB = new SimpleDb('public');
            const html = await newDB.get('index.html');
            res.end(html);
        } catch (error) {
            res.statusCode = 500;
            res.end('Internal Server Error');
        }
    }
    if (resource === 'styles' && text === 'main.css') {
        try {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            const newDB = new SimpleDb('public');
            const css = await newDB.get('/css/main.css');
            res.end(css);
        } catch (error) {
            res.statusCode = 500;
            res.end('Internal Server Error');
        }
    }
};
export default app;
