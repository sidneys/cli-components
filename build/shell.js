/// <xreference path="../typings/tsd.d.ts" />
var $ = require('./index');
var $c = require('./color');
var fs = require('fs');
var sh = require('shelljs');
var path = require('path');
// import lsArchive = require('ls-archive')
exports.echo = sh.echo;
exports.find = sh.find;
// export import ls = require('ls-r')
function addToGlobalScope() {
    var shell = require('./shell');
    for (var i in shell) {
        if (shell.hasOwnProperty(i)) {
            global[i] = shell[i];
        }
    }
}
exports.addToGlobalScope = addToGlobalScope;
function logcmd(cmd) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var joinedArgs = args.join(' ');
    var parts = [$.symbol.bullet, $.symbol.prompt, $c.blue(cmd), $c.blue($c.bold(joinedArgs))];
    $.io.println(parts.join(' '));
}
exports.logcmd = logcmd;
function logcmd_begin(cmd, args) {
    var joinedArgs = args.join(' ');
    var parts = [$.symbol.bullet, $.symbol.prompt, $c.blue(cmd), $c.blue($c.bold(joinedArgs)), '...'];
    $.io.print(parts.join(' ') + ' ');
}
exports.logcmd_begin = logcmd_begin;
function logcmd_end(result) {
    if (result.code === 0) {
        $.io.print($c.green('success') + '\n');
    }
    else {
        $.io.print($c.red("failed (result code = " + result.code.toString() + ", output = " + result.output + ")\n"));
    }
}
exports.logcmd_end = logcmd_end;
function argString(args) {
    var parts = [];
    for (var argName in args) {
        var argValue = args[argName];
        parts.push((argName.length == 1 ? '-' : '--') + argName);
        if (typeof argValue == 'boolean') {
            continue;
        }
        else {
            parts.push('' + argValue);
        }
    }
    return parts.join(' ');
}
exports.argString = argString;
function isFile(filename) {
    var stats = fs.statSync(filename);
    return stats.isFile();
}
exports.isFile = isFile;
function isDir(filename) {
    var stats = fs.statSync(filename);
    return stats.isDirectory();
}
exports.isDir = isDir;
function isChildOf(filename, maybeParent) {
    return filename.indexOf(maybeParent) === 0;
}
exports.isChildOf = isChildOf;
function depthSortFilenames(filenames) {
    function compareStrings(a, b) {
        if (a < b) {
            return -1;
        }
        else if (a > b) {
            return 1;
        }
        else {
            return 0;
        }
    }
    return filenames.sort(function (a, b) {
        if (a.length == b.length && isChildOf(a, b) == false) {
            return compareStrings(a, b);
        }
        else if (isChildOf(a, b)) {
            return -1;
        }
        else if (isChildOf(b, a)) {
            return 1;
        }
        else {
            return compareStrings(a, b);
        }
    });
}
exports.depthSortFilenames = depthSortFilenames;
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
function cp(opts, src, dest) {
    logcmd('cp', opts, src, $.symbol.arrow, dest);
    sh.cp(opts, src, dest);
}
exports.cp = cp;
function mv(src, dest) {
    var relativeSrc = path.relative(process.cwd(), src);
    var relativeDest = path.relative(src, dest);
    logcmd('mv', $c.turquoise(relativeSrc), $.symbol.arrow, $c.turquoise($c.underline(relativeDest)));
    sh.mv(src, dest);
}
exports.mv = mv;
function rm(opts, victim) {
    logcmd('rm', opts, victim);
    sh.rm(opts, victim);
}
exports.rm = rm;
function chmod(mode, file) {
    logcmd('chmod', mode, file);
    sh.chmod(mode, file);
}
exports.chmod = chmod;
function mkdir(flags, dirpath) {
    logcmd('mkdir', flags, dirpath);
    sh.mkdir(flags, dirpath);
}
exports.mkdir = mkdir;
function pushd(dir) {
    $.io.println($.symbol.into + ' ' + $c.red($c.bold(dir)));
    $.io.logger().indent();
    return sh.pushd(dir);
}
exports.pushd = pushd;
function popd() {
    $.io.logger().unindent();
    var before = process.cwd();
    var newDirStack = sh.popd();
    var after = process.cwd();
    var relativePath = path.relative(after, before);
    $.io.println($.symbol.outof + ' ' + $c.green($c.bold(relativePath)));
    return newDirStack;
}
exports.popd = popd;
function ln(opts, realPath, linkPath) {
    logcmd('ln', opts, realPath, $.symbol.link, linkPath);
    sh.ln(opts, realPath, linkPath);
}
exports.ln = ln;
// export function sed(opts:string, searchRegex:RegExp, replacement:string, file:string) {
//     logcmd('sed', opts, searchRegex.toString(), replacement, file)
//     sh.sed(opts, searchRegex, replacement, file)
// }
function sed(opts, searchRegex, replacement, file) {
    logcmd('sed', $c.white(opts), $c.orange(searchRegex.toString()), $c.red(replacement), $c.turquoise($c.bold(file)));
    return sh.sed(opts, searchRegex, replacement, file);
}
exports.sed = sed;
function exec(cmdString) {
    var parts = cmdString.split(' ');
    if (parts.length < 0) {
        return null;
    }
    var cmd = parts.shift();
    logcmd_begin(cmd, parts);
    var result = sh.exec(cmdString);
    logcmd_end(result);
    return result;
}
exports.exec = exec;
function cat() {
    var files = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        files[_i - 0] = arguments[_i];
    }
    var flattened = flatten(files);
    return sh.cat(flattened);
}
exports.cat = cat;
function flatten() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    var flattened = [];
    // for (var i in args) {
    for (var _a = 0; _a < args.length; _a++) {
        var arg = args[_a];
        flattened = [].concat(flattened, arg);
    }
    return flattened;
}
exports.flatten = flatten;
//# sourceMappingURL=shell.js.map