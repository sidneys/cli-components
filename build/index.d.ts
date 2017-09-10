/// <reference path='./file.d.ts'/>
/// <reference path='./build-tools.d.ts'/>
/// <reference path='./io.d.ts'/>
/// <reference path='./config.d.ts'/>
/// <reference path='./cache.d.ts'/>
/// <reference path='./dotfile.d.ts'/>
/// <reference path='./symbol.d.ts'/>
/// <reference path='./shell.d.ts'/>
/// <reference path='./color.d.ts'/>
/// <reference path='./result.d.ts'/>
/// <reference path='./misc.d.ts'/>

/// <xreference path='./zip.d.ts'/>

declare module 'cli-components'
{
    export import file = require('cli-components/file')
    export import build = require('cli-components/build-tools')
    export import io = require('cli-components/io')
    export import symbol = require('cli-components/symbol')
    export import sh = require('cli-components/shell')
    export import color = require('cli-components/color')
    export import result = require('cli-components/result')
    export import misc = require('cli-components/misc')
    // export import zip = require('cli-components/zip')

    // export import ui = require('blessed')

    export import Config = require('cli-components/config')
    export import Cache = require('cli-components/cache')
    export import Dotfile = require('cli-components/dotfile')
    export import Result = result.Result
}
