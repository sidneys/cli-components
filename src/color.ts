/// <xreference path="../typings/tsd.d.ts" />

import colors = require('ansi-256-colors')
import chalk = require('chalk')


export function bold(text:string) :string {
    return <string>chalk.bold(text)
}

export function underline(text:string) :string {
    return <string>chalk.underline(text)
}

export function blue(text:string) :string {
    return colors.fg.getRgb(0, 2, 4) + text + colors.reset
}

export function magenta(text:string) :string {
    return colors.fg.getRgb(4, 0, 2) + text + colors.reset
}

export function red(text:string) :string {
    return colors.fg.getRgb(3, 0, 0) + text + colors.reset
}

export function orange(text:string) :string {
    return colors.fg.getRgb(4, 2, 0) + text + colors.reset
}

export function yellow(text:string) :string {
    return colors.fg.getRgb(4, 3, 0) + text + colors.reset
}

export function turquoise(text:string) :string {
    return colors.fg.getRgb(0, 2, 2) + text + colors.reset
}

export function green(text:string) :string {
    return colors.fg.getRgb(0, 2, 0) + text + colors.reset
}

export function purple(text:string) :string {
    return colors.fg.getRgb(1, 1, 5) + text + colors.reset
}

export function white(text:string) :string {
    return colors.fg.grayscale[23] + text + colors.reset
}

export function darkGrey(text:string) :string {
    return colors.fg.grayscale[6] + text + colors.reset
}

export function lightGrey(text:string) :string {
    return colors.fg.grayscale[12] + text + colors.reset
}

export function black(text:string) :string {
    return colors.fg.grayscale[0] + text + colors.reset
}
