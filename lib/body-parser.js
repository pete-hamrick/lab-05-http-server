//body parser
//exports a function that takes an http req obj
//and returns a promise for the parsed body
//

export function bodyParser(req) {
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
        return new Promise((resolve, reject) => {
            if (req.contentType === 'application/json') {
                try {
                    const res = JSON.parse(req.body);
                    resolve(res);
                } catch (error) {
                    reject(error.message);
                }
            } else {
                reject('Content-Type Incorrect');
            }
        });
    } else {
        return null;
    }
}
