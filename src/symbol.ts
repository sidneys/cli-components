/// <xreference path='../typings/tsd.d.ts' />
/// <xreference path='./index.ts' />

import $c = require('./color')


export var arrow = $c.white($c.bold('->'))
export var bullet = $c.white('+') //$c.white($c.bold('[')) + $c.white('+') + $c.white($c.bold(']'))
export var into = $c.white($c.bold('---> into'))
export var outof = $c.white($c.bold('---> out of'))
export var link = $c.white($c.bold(' <--> '))
export var prompt = $c.yellow('$')
