/// <xreference path="../typings/tsd.d.ts" />

import $ = require('./index')
import $c = require('./color')
import fs = require('fs')
import sh = require('shelljs')
import path = require('path')
import when = require('when')
import whenNode = require('when/node')
// import lsArchive = require('ls-archive')

export import echo = sh.echo
export import find = sh.find
export import ExecReturnValue = sh.ExecReturnValue
// export import ls = require('ls-r')



export function addToGlobalScope() {
    var shell = require('./shell')
    for (var i in shell) { if (shell.hasOwnProperty(i)) { global[i] = shell[i] } }
}




export function logcmd(cmd:string, ...args:string[]) :void {
    var joinedArgs = args.join(' ')
    var parts = [ $.symbol.bullet, $.symbol.prompt, $c.blue(cmd), $c.blue($c.bold(joinedArgs)) ]
    $.io.println(parts.join(' '))
}

export function logcmd_begin(cmd:string, args:string[]) :void {
    var joinedArgs = args.join(' ')
    var parts = [ $.symbol.bullet, $.symbol.prompt, $c.blue(cmd), $c.blue($c.bold(joinedArgs)), '...' ]
    $.io.print(parts.join(' ') + ' ')
}

export function logcmd_end(result:sh.ExecReturnValue) :void {
    if (result.code === 0) { $.io.print($c.green('success') + '\n') }
    else                   { $.io.print($c.red(`failed (result code = ${result.code.toString()}, output = ${result.output})\n`)) }
}

export function argString(args:{}) :string
{
    var parts :string[] = []
    for (var argName in args) {
        var argValue = args[argName]

        parts.push((argName.length == 1 ? '-' : '--') + argName)

        if (typeof argValue == 'boolean') {
            continue
        }
        else {
            parts.push('' + argValue)
        }
    }
    return parts.join(' ')
}

export function isFile(filename:string) :boolean {
    var stats = fs.statSync(filename)
    return stats.isFile()
}

export function isDir(filename:string) :boolean {
    var stats = fs.statSync(filename)
    return stats.isDirectory()
}

export function isChildOf(filename:string, maybeParent:string) :boolean {
    return filename.indexOf(maybeParent) === 0
}

export function depthSortFilenames(filenames:string[]) :string[] {
    function compareStrings(a:string, b:string) :number {
        if (a < b) { return -1 }
        else if (a > b) { return 1 }
        else { return 0 }
    }

    return filenames.sort((a:string, b:string) => {
        if (a.length == b.length && isChildOf(a, b) == false) {
            return compareStrings(a, b)
        }
        else if (isChildOf(a, b)) {
            return -1
        }
        else if (isChildOf(b, a)) {
            return 1
        }
        else {
            return compareStrings(a, b)
        }
    })
}

// interface FileResult extends fs.Stats {
//     path: string;
// }

// export function ls(opts:string, glob:string, options:any) :when.Promise<FileResult[]>
// {
//     var options = { recursive: false }
//     if (opts.indexOf('R') !== -1) {
//         options.recursive = true
//     }

//     return when.promise((resolve, reject) => {
//         lsModule(glob, options, (error, files) => {
//             if (error) { return reject(error) }
//             else       { return resolve(files) }
//         })
//     })
// }

export function cp(opts:string, src:string, dest:string) :void {
    logcmd('cp', opts, src, $.symbol.arrow, dest)
    sh.cp(opts, src, dest)
}

export function mv(src:string, dest:string) :void {
    var relativeSrc  = path.relative(process.cwd(), src)
    var relativeDest = path.relative(src, dest)
    logcmd('mv', $c.turquoise(relativeSrc), $.symbol.arrow, $c.turquoise($c.underline(relativeDest)))
    sh.mv(src, dest)
}

export function rm(opts:string, victim:string) :void {
    logcmd('rm', opts, victim)
    sh.rm(opts, victim)
}

export function chmod(mode: string, file: string) :void {
    logcmd('chmod', mode, file)
    sh.chmod(mode, file)
}

export function mkdir(flags, dirpath) :void {
    logcmd('mkdir', flags, dirpath)
    sh.mkdir(flags, dirpath)
}

export function pushd(dir) :string[] {
    $.io.println($.symbol.into + ' ' + $c.red($c.bold(dir)))
    $.io.logger().indent()
    return sh.pushd(dir)
}

export function popd() :string[] {
    $.io.logger().unindent()
    var before       = process.cwd()
    var newDirStack  = sh.popd()
    var after        = process.cwd()
    var relativePath = path.relative(after, before)
    $.io.println($.symbol.outof + ' ' + $c.green($c.bold(relativePath)))
    return newDirStack
}

export function ln(opts:string, realPath:string, linkPath:string) {
    logcmd('ln', opts, realPath, $.symbol.link, linkPath)
    sh.ln(opts, realPath, linkPath)
}

// export function sed(opts:string, searchRegex:RegExp, replacement:string, file:string) {
//     logcmd('sed', opts, searchRegex.toString(), replacement, file)
//     sh.sed(opts, searchRegex, replacement, file)
// }

export function sed(opts:string, searchRegex:RegExp, replacement:string, file:string) :string {
    logcmd('sed', $c.white(opts), $c.orange(searchRegex.toString()), $c.red(replacement), $c.turquoise($c.bold(file)))
    return sh.sed(opts, searchRegex, replacement, file)
}

export function exec(cmdString:string) :sh.ExecReturnValue
{
    var parts = cmdString.split(' ')
    if (parts.length < 0) { return null }

    var cmd = parts.shift()

    logcmd_begin(cmd, parts)
    var result = sh.exec(cmdString)
    logcmd_end(result)
    return result
}

export function cat(...files:string[]) {
    var flattened = flatten(files)
    return sh.cat(flattened)
}

export type StringPile = string|string[]
export function flatten (...args:StringPile[]) :string[]
{
    var flattened :string[] = []
    // for (var i in args) {
    for (let arg of args) {
        flattened = [].concat(flattened, arg)
    }
    return flattened
}
