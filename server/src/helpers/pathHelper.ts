import * as path from 'path';

let rootPath = path.join(__dirname, '../..');

export default {
    path,
    getRelative: getRelativePath
};

function getRelativePath(...paths: string[]) {
    paths.unshift(rootPath)
    return path.join(...paths);
}

