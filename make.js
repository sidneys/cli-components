#!/usr/bin/env node --harmony
var tasks = require('command-router')()
var $ = require('./build/index')
$.build.addToGlobalScope()


/**
    configuration
*/

var SOURCES     = ['index.ts']
var SOURCE_ROOT = 'src'
var BUILD_ROOT  = 'build'

var BUILD_OUTPUT_FILETYPES = ['.js', '.js.map', '.d.ts']

var TSD_UMBRELLA_INCLUDE_PATH = './typings/tsd.d.ts'
var TS_COMPILER_CMD = 'tsc'

function TS_COMPILER_ARGS(args)
{
    args.module = args.module || 'commonjs'
    args.target = args.target || 'ES6'
    return args
}


/**
    tasks
 */

tasks.command('',                                                           function () { $.io.println(tasks.helpText()) })
tasks.command('build',   'Builds the project.',                             function () { buildFiles(SOURCES) })
tasks.command('build *', 'Builds specific file[s] from the project.',       function () { buildFiles(tasks.params.splats) })
tasks.command('clean',   'Removes built products from the build folder.',   function () { $.file.removeFileTypesFromDir(BUILD_OUTPUT_FILETYPES, BUILD_ROOT) })
tasks.on('notfound', function (action) {
    console.error('Unknown command.')
    $.io.println(tasks.helpText())
})


function buildFiles(buildFiles)
{
    $.sh.mkdir('-p', './build')

    /** compile typescript */
    $.build.compileTypescript(SOURCE_ROOT, SOURCES, BUILD_ROOT, TS_COMPILER_ARGS({declaration: true}))

    /** copy javascript + typescript declaration files */
    $.sh.cp('-f', 'src/*.js',     'build/')
    $.sh.cp('-f', 'src/d.ts/*.*', 'build/')
}


/**
    entry point
 */

$.io.println()
tasks.parse(process.argv)
$.io.println()

