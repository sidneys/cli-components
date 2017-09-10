/// <xreference path='../typings/tsd.d.ts' />
/// <xreference path='./index.ts' />
var whenNode = require('when/node');
var fs = require('fs-extra');
var path = require('path');
var $io = require('./io');
var $sh = require('./shell');
var $c = require('./color');
var $file = require('./file');
var fsp = whenNode.liftAll(fs);
function addToGlobalScope() {
    require('./build-tools-js-extensions');
    var buildTools = require('./build-tools');
    for (var key in Object.keys(buildTools)) {
        global[key] = buildTools[key];
    }
}
exports.addToGlobalScope = addToGlobalScope;
function log() {
    var parts = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        parts[_i - 0] = arguments[_i];
    }
    $io.print(parts.join(' '));
}
exports.log = log;
function logn() {
    var parts = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        parts[_i - 0] = arguments[_i];
    }
    if (parts.length > 0) {
        parts = [].concat(parts); //$symbol.bullet, parts)
    }
    $io.println(parts.join(' '));
}
exports.logn = logn;
function needsBuild(filename, builtProduct) {
    return $file.mtime(filename) > $file.mtime(builtProduct);
}
exports.needsBuild = needsBuild;
function formatExecResult(result) {
    return (result.code === 0) ? $c.green('success')
        : $c.red("failed (result code = " + result.code.toString() + ", output = " + result.output + ")");
}
exports.formatExecResult = formatExecResult;
function typescriptCompileCmd(inFile, outDir, options) {
    var compilerArgs = $sh.argString(options);
    var command = [].concat('tsc', compilerArgs, '--outDir', outDir, inFile);
    return command.join(' ');
}
exports.typescriptCompileCmd = typescriptCompileCmd;
function compileTypescript(sourceRoot, sources, buildRoot, options) {
    return sources.map(function (file) {
        return { inFile: path.join(sourceRoot, file),
            outFile: path.join(buildRoot, file) };
    })
        .map(function (args) {
        var immediateParentDir = path.dirname(args.outFile);
        $sh.mkdir('-p', immediateParentDir);
        return $sh.exec(typescriptCompileCmd(args.inFile, buildRoot, options));
    });
}
exports.compileTypescript = compileTypescript;
function compileTypescriptFile(inFile, outFile, options) {
    var compileCmd = typescriptCompileCmd(inFile, outFile, options);
    return $sh.exec(compileCmd);
}
exports.compileTypescriptFile = compileTypescriptFile;
//# sourceMappingURL=build-tools.js.map