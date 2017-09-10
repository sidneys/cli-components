/// <xreference path='../typings/tsd.d.ts' />
var os = require('os');
var fs = require('fs-extra');
var path = require('path');
var sh = require('shelljs');
var when = require('when');
var whenNode = require('when/node');
var result = require('./result');
var fsp = whenNode.liftAll(fs);
function contents(filename) {
    return fs.readFileSync(filename, 'utf8');
}
exports.contents = contents;
function tmpdir() {
    return os.tmpdir();
}
exports.tmpdir = tmpdir;
function mtime(file) {
    if (fs.existsSync(file)) {
        var stat = fs.statSync(file);
        return stat.mtime.getTime();
    }
    return 0;
}
exports.mtime = mtime;
/**
 * Splits the contents of a text file into an Array of its constituent lines.
 * @param filepath The path of the file to split into lines.
 */
function lines(filepath) {
    return contents(filepath).split('\n');
}
exports.lines = lines;
function prependStringToFile(file, str) {
    var newContents = str + '\n' + contents(file);
    fs.writeFileSync(file, newContents);
    lines('lsfkj');
}
exports.prependStringToFile = prependStringToFile;
function removeLinesFrom(glob, regexp) {
    sh.ls(glob).forEach(function (filename) {
        var newContents = lines(filename)
            .filter(function (line) { return regexp.test(line) == false; })
            .join('\n');
        fs.writeFileSync(filename, newContents);
    });
}
exports.removeLinesFrom = removeLinesFrom;
function findMatchesInFile(filename, regexp) {
    var file = contents(filename);
    var matches = file.match(regexp); //(/#\{[a-zA-Z0-9_\-\+]+\}/g)
    return matches || [];
}
exports.findMatchesInFile = findMatchesInFile;
function createBackup(filepath, backupDir) {
    var filename = path.basename(filepath);
    var dateStr = new Date().toString().replace(/[^a-zA-Z0-9]/g, '-');
    var absFilepath = path.resolve(filepath);
    var parentDirParts = path.dirname(absFilepath).split('/');
    var parentDir = parentDirParts[parentDirParts.length - 1];
    var backupFilename = path.join(backupDir, filename + '--' + parentDir + '--' + dateStr).replace(/\-+$/, '');
    return fsp.ensureDir(backupDir)
        .then(function () {
        return fs.existsSync(absFilepath)
            ? fsp.copy(absFilepath, backupFilename)
                .then(function () { backupFilename; })
            : when.reject(new Error('The file "' + filepath + ' was not found."'));
    });
}
exports.createBackup = createBackup;
function removeFilesFromDirMatching(regex, fromDir) {
    sh.ls(fromDir).filter(function (file) { return regex.test(file); })
        .map(function (file) { return path.join(fromDir, file); })
        .forEach(function (file) { return sh.rm('-f', file); });
}
exports.removeFilesFromDirMatching = removeFilesFromDirMatching;
function removeFileTypesFromDir(types, fromDir) {
    sh.ls(fromDir).filter(function (file) { return filetypeIsAmong(file, types); })
        .map(function (file) { return path.join(fromDir, file); })
        .forEach(function (file) { return sh.rm('-f', file); });
}
exports.removeFileTypesFromDir = removeFileTypesFromDir;
function filetypeIsAmong(filename, types) {
    return types.some(function (type) { return filename.slice(-type.length) == type; });
}
exports.filetypeIsAmong = filetypeIsAmong;
function searchUpForFile(filename) {
    var parts = process.cwd().split('/').filter(function (part) { return part.length > 0; });
    while (parts.length > 0) {
        var cwd = path.join(parts);
        var filepath = path.join(cwd, filename);
        if (fs.existsSync(filepath) && fs.statSync(filepath).isFile() === true) {
            return filepath;
        }
        parts.pop();
    }
    return null;
}
exports.searchUpForFile = searchUpForFile;
function readJSONSync(filepath) {
    var jsonStr = fs.readFileSync(filepath, 'utf8');
    var jsonObj = null;
    try {
        jsonObj = JSON.parse(jsonStr);
    }
    catch (err) {
        return result.failure(err);
    }
    // if (isNull(jsonObj)) { return failure<T>('The contents of JSON file "' + filepath + '" evaluated to null.') }
    return jsonObj;
}
exports.readJSONSync = readJSONSync;
//# sourceMappingURL=file.js.map