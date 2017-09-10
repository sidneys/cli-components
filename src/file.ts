/// <xreference path='../typings/tsd.d.ts' />

import os = require('os')
import fs = require('fs-extra')
import path = require('path')
import sh = require('shelljs')

import when = require('when')
import whenNode = require('when/node')

import Dotfile = require('./dotfile')
import result = require('./result')

var fsp = whenNode.liftAll(fs)


export function contents(filename:string) :string {
    return fs.readFileSync(filename, 'utf8')
}

export function tmpdir() :string {
    return os.tmpdir()
}

export function mtime(file:string) :number {
    if (fs.existsSync(file)) {
        var stat = fs.statSync(file)
        return stat.mtime.getTime()
    }
    return 0
}

/**
 * Splits the contents of a text file into an Array of its constituent lines.
 * @param filepath The path of the file to split into lines.
 */
export function lines(filepath:string) :string[] {
    return contents(filepath).split('\n')
}

export function prependStringToFile(file:string, str:string) {
    var newContents :string = str + '\n' + contents(file)
    fs.writeFileSync(file, newContents)
    lines('lsfkj')
}

export function removeLinesFrom(glob:string, regexp:RegExp)
{
    sh.ls(glob).forEach(filename => {
        var newContents = lines(filename)
                            .filter(line => regexp.test(line) == false)
                            .join('\n')

        fs.writeFileSync(filename, newContents)
    })
}

export function findMatchesInFile (filename:string, regexp:RegExp) :string[] {
    var file :string = contents(filename)
    var matches = file.match(regexp) //(/#\{[a-zA-Z0-9_\-\+]+\}/g)
    return matches || []
}

export function createBackup (filepath:string, backupDir:string) :when.Promise<string>
{
    var filename = path.basename(filepath)
    var dateStr  = new Date().toString().replace(/[^a-zA-Z0-9]/g, '-')

    var absFilepath     = path.resolve(filepath)
    var parentDirParts  = path.dirname(absFilepath).split('/')
    var parentDir       = parentDirParts[parentDirParts.length - 1]
    var backupFilename  = path.join(backupDir, filename + '--' + parentDir + '--' + dateStr).replace(/\-+$/, '')

    return   fsp.ensureDir(backupDir)
                .then(() => {
                    return fs.existsSync(absFilepath)
                                    ? fsp.copy(absFilepath, backupFilename)
                                         .then(() => { backupFilename })
                                    :  when.reject(new Error('The file "' + filepath + ' was not found."'))
               })
}

export function removeFilesFromDirMatching(regex:RegExp, fromDir:string) {
    sh.ls(fromDir)  .filter (file => regex.test(file))
                    .map    (file => path.join(fromDir, file))
                    .forEach(file => sh.rm('-f', file))
}

export function removeFileTypesFromDir(types:string[], fromDir:string) {
    sh.ls(fromDir)  .filter (file => filetypeIsAmong(file, types))
                    .map    (file => path.join(fromDir, file))
                    .forEach(file => sh.rm('-f', file))
}

export function filetypeIsAmong (filename:string, types:string[]) :boolean {
    return types.some(type => filename.slice(-type.length) == type)
}

export function searchUpForFile(filename:string) :string
{
    var parts = process.cwd().split('/').filter(part => part.length > 0)
    while (parts.length > 0) {
        var cwd = path.join(parts)
        var filepath = path.join(cwd, filename)
        if (fs.existsSync(filepath) && fs.statSync(filepath).isFile() === true) {
            return filepath
        }
        parts.pop()
    }
    return null
}

export function readJSONSync (filepath:string) :result.Result<any>
{
    var jsonStr = fs.readFileSync(filepath, 'utf8')
    var jsonObj: any = null

    try { jsonObj = JSON.parse(jsonStr) }
    catch(err) { return result.failure<any>(err) }

    // if (isNull(jsonObj)) { return failure<T>('The contents of JSON file "' + filepath + '" evaluated to null.') }

    return jsonObj
}
