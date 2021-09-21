// import SimpleDb from '../lib/simple-db';
import { rm, mkdir } from 'fs/promises';
import SimpleDb from '../lib/simple-db.js';
describe('simple db', () => {
    const rootDir = './__tests__/store';

    beforeEach(async () => {
        await rm(rootDir, { force: true, recursive: true });
        await mkdir(rootDir, { recursive: true });
    });

    xit('saved object has id', async () => {
        const db = new SimpleDb(rootDir);

        const felix = { name: 'felix', type: 'tuxedo' };

        await db.save(felix);
        expect(felix.id).toEqual(expect.any(String));
    });

    xit('save and get an object', async () => {
        const db = new SimpleDb(rootDir);

        const felix = { name: 'felix', type: 'tuxedo' };
        await db.save(felix);
        const got = await db.get(felix.id);
        expect(got).toEqual(felix);
    });

    xit('returns null for non-existant id', async () => {
        const db = new SimpleDb(rootDir);

        const got = await db.get('non-existant');
        expect(got).toBeNull();
    });

    xit('gets all objects', async () => {
        const cats = [
            { name: 'felix', type: 'tuxedo' },
            { name: 'garfield', type: 'orange tabby' },
            { name: 'duchess', type: 'angora' },
        ];

        const db = new SimpleDb(rootDir);

        await Promise.all(cats.map((cat) => db.save(cat)));
        const got = await db.getAll();
        expect(got).toEqual(expect.arrayContaining(cats));
    });

    xit('deletes an object', async () => {
        const db = new SimpleDb(rootDir);

        const felix = { name: 'felix', type: 'tuxedo' };

        await db.save(felix);
        await db.delete(felix.id);
        const got = await db.get(felix.id);
        expect(got).toBeNull();
    });

    xit('updates an object', async () => {
        const db = new SimpleDb(rootDir);

        const felix = { name: 'felix', type: 'tuxedo' };
        await db.save(felix);

        felix.type = 'tabby';
        await db.update(felix);

        const got = await db.get(felix.id);
        expect(got).toEqual(felix);
    });
});
