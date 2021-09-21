import shortid from 'shortid';
import path from 'path';
import { writeFile, readFile, readdir, rm } from 'fs/promises';

class SimpleDb {
    constructor(rootDir) {
        this.rootDir = rootDir;
    }
    //TODO FIX ALL THIS GET PATH MESS
    getPath(id) {
        return `${this.rootDir}/${id}.json`;
    }

    async save(obj) {
        obj.id = shortid.generate();
        return await this.update(obj);
    }

    async update(obj) {
        const filePath = this.getPath(obj.id);
        return await writeFile(filePath, JSON.stringify(obj));
    }

    async get(id) {
        const filePath = path.join(this.rootDir, id);
        try {
            const data = await readFile(filePath, 'utf8');
            return data;
        } catch (err) {
            if (err.code === 'ENOENT') return null;
            throw err;
        }
    }

    async getAll() {
        const files = await readdir(this.rootDir);
        const ids = files.map((file) => path.basename(file, '.json'));
        return Promise.all(ids.map((id) => this.get(id)));
    }

    async delete(id) {
        const filePath = this.getPath(id);
        return rm(filePath);
    }
}

export default SimpleDb;
