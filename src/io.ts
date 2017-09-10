/// <xreference path='../typings/tsd.d.ts' />

import $ = require('./index')
import symbol = require('./symbol')


export class Logger
{
    folderDepth :number;
    tab         :string;
    prefix      :string;

    constructor(prefixString:string = null, tabString:string = '    ') {
        this.folderDepth = 0
        this.tab = tabString
        this.prefix = prefixString
    }

    private writeOutput(str:string) :void {
        process.stderr.write(str)
    }

    print (...str:string[]) :void
    {
        var padding = new Array(str.length).join(this.tab)
        var maybePrefix = (!!this.prefix ? this.prefix + ' ' : '')
        this.writeOutput(maybePrefix + padding + str.join(' '))
    }

    println (...str:string[]) :void {
        if (str === null || str === undefined || str.length === 0 || str[0] === null || str[0] === undefined) {
            this.writeOutput('\n')
        }
        else {
            this.print(str.join(' ') + '\n')
        }
    }

    dieError (err) {
        process.stderr.write([$.color.red(err), err.stack || ''].join('\n'))
        process.exit(1)
    }

    indent() :void {
        this.folderDepth++
    }

    unindent() :void {
        this.folderDepth--
    }
}

export var settings = {
    currentProcessLogger: new Logger()
}

export function logger () :Logger {
    return settings.currentProcessLogger
}

export function print (str:string) :void {
    logger().print(str)
}

export function println (str:string) :void {
    logger().println(str)
}

export function dieError (err:any) :void {
    logger().dieError(err)
}
