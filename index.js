const fs = require('fs');
const archiver = require('archiver');
const path = require('path');
const glob = require("glob");

const IGNORE_LIST_FILENAME = '.murchiver_ignore';

const loadIgnoreFile = () => {
    try {
        return fs.readFileSync(process.cwd() + `/${IGNORE_LIST_FILENAME}`)
            .toString()
            .replace(/^(?=\n)$|^\s*|\s*$|\n\n+/gm, "")
            .split('\n')
    } catch (err) {
        return [];
    }
}

const zipDirectories = (ignoreList) => {
    glob("*/", {ignore: ignoreList},  (err, directories) => {
        if (err) throw err;
        directories.forEach(dir=>{
            const dirName = dir.replace("/","");
            const zipFile = path.resolve(process.cwd(),dirName+'.zip');
            const output = fs.createWriteStream(zipFile);
            const archive = archiver('zip', {zlib: { level: 9 }});
            console.time(`${dirName} zipped in`);
            archive.pipe(output);
            archive.glob('**/*', {
                cwd: path.resolve(process.cwd(),dirName),
                ignore: ignoreList
            })
            output.on('finish', () => console.timeEnd(`${dirName} zipped in`));
            archive.finalize();
        })
    })
}

zipDirectories(loadIgnoreFile());
