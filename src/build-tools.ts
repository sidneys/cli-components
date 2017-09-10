/// <xreference path='../typings/tsd.d.ts' />
/// <xreference path='./index.ts' />

import when = require('when')
import whenNode = require('when/node')
import fs = require('fs-extra')
import path = require('path')
import sh = require('shelljs')

import $io = require('./io')
import $sh = require('./shell')
import $c = require('./color')
import $file = require('./file')

var fsp = whenNode.liftAll(fs)


export function addToGlobalScope()
{
    require('./build-tools-js-extensions')

    var buildTools = require('./build-tools')
    for (var key in Object.keys(buildTools)) {
        global[key] = buildTools[key]
    }
}

export function log(...parts:string[]) :void {
    $io.print(parts.join(' '))
}

export function logn(...parts:string[]) :void {
    if (parts.length > 0) {
        parts = [].concat(parts) //$symbol.bullet, parts)
    }
    $io.println(parts.join(' '))
}

export function needsBuild(filename:string, builtProduct:string) :boolean {
    return $file.mtime(filename) > $file.mtime(builtProduct)
}


export function formatExecResult(result:sh.ExecReturnValue) :string {
    return (result.code === 0) ? $c.green('success')
                               : $c.red(`failed (result code = ${result.code.toString()}, output = ${result.output})`)
}

export function typescriptCompileCmd(inFile:string, outDir:string, options:{}) :string {
    var compilerArgs = $sh.argString(options)
    var command      = [].concat('tsc', compilerArgs, '--outDir', outDir, inFile)
    return command.join(' ')
}

export function compileTypescript(sourceRoot:string, sources:string[], buildRoot:string, options:{}) :sh.ExecReturnValue[]
{
    return sources.map(file => { return { inFile: path.join(sourceRoot, file),
                                         outFile: path.join(buildRoot,  file) } })
                     .map(args => {
                        var immediateParentDir = path.dirname(args.outFile)
                         $sh.mkdir('-p', immediateParentDir)
                         return $sh.exec(typescriptCompileCmd(args.inFile, buildRoot, options))
                     })
}

export function compileTypescriptFile(inFile:string, outFile:string, options:{}) :sh.ExecReturnValue {
    var compileCmd = typescriptCompileCmd(inFile, outFile, options)
    return $sh.exec(compileCmd)
}
