/// <xreference path="../typings/tsd.d.ts" />
var colors = require('ansi-256-colors');
var chalk = require('chalk');
function bold(text) {
    return chalk.bold(text);
}
exports.bold = bold;
function underline(text) {
    return chalk.underline(text);
}
exports.underline = underline;
function blue(text) {
    return colors.fg.getRgb(0, 2, 4) + text + colors.reset;
}
exports.blue = blue;
function magenta(text) {
    return colors.fg.getRgb(4, 0, 2) + text + colors.reset;
}
exports.magenta = magenta;
function red(text) {
    return colors.fg.getRgb(3, 0, 0) + text + colors.reset;
}
exports.red = red;
function orange(text) {
    return colors.fg.getRgb(4, 2, 0) + text + colors.reset;
}
exports.orange = orange;
function yellow(text) {
    return colors.fg.getRgb(4, 3, 0) + text + colors.reset;
}
exports.yellow = yellow;
function turquoise(text) {
    return colors.fg.getRgb(0, 2, 2) + text + colors.reset;
}
exports.turquoise = turquoise;
function green(text) {
    return colors.fg.getRgb(0, 2, 0) + text + colors.reset;
}
exports.green = green;
function purple(text) {
    return colors.fg.getRgb(1, 1, 5) + text + colors.reset;
}
exports.purple = purple;
function white(text) {
    return colors.fg.grayscale[23] + text + colors.reset;
}
exports.white = white;
function darkGrey(text) {
    return colors.fg.grayscale[6] + text + colors.reset;
}
exports.darkGrey = darkGrey;
function lightGrey(text) {
    return colors.fg.grayscale[12] + text + colors.reset;
}
exports.lightGrey = lightGrey;
function black(text) {
    return colors.fg.grayscale[0] + text + colors.reset;
}
exports.black = black;
//# sourceMappingURL=color.js.map