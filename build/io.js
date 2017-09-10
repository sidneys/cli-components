/// <xreference path='../typings/tsd.d.ts' />
var $ = require('./index');
var Logger = (function () {
    function Logger(prefixString, tabString) {
        if (prefixString === void 0) { prefixString = null; }
        if (tabString === void 0) { tabString = '    '; }
        this.folderDepth = 0;
        this.tab = tabString;
        this.prefix = prefixString;
    }
    Logger.prototype.writeOutput = function (str) {
        process.stderr.write(str);
    };
    Logger.prototype.print = function () {
        var str = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            str[_i - 0] = arguments[_i];
        }
        var padding = new Array(str.length).join(this.tab);
        var maybePrefix = (!!this.prefix ? this.prefix + ' ' : '');
        this.writeOutput(maybePrefix + padding + str.join(' '));
    };
    Logger.prototype.println = function () {
        var str = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            str[_i - 0] = arguments[_i];
        }
        if (str === null || str === undefined || str.length === 0 || str[0] === null || str[0] === undefined) {
            this.writeOutput('\n');
        }
        else {
            this.print(str.join(' ') + '\n');
        }
    };
    Logger.prototype.dieError = function (err) {
        process.stderr.write([$.color.red(err), err.stack || ''].join('\n'));
        process.exit(1);
    };
    Logger.prototype.indent = function () {
        this.folderDepth++;
    };
    Logger.prototype.unindent = function () {
        this.folderDepth--;
    };
    return Logger;
})();
exports.Logger = Logger;
exports.settings = {
    currentProcessLogger: new Logger()
};
function logger() {
    return exports.settings.currentProcessLogger;
}
exports.logger = logger;
function print(str) {
    logger().print(str);
}
exports.print = print;
function println(str) {
    logger().println(str);
}
exports.println = println;
function dieError(err) {
    logger().dieError(err);
}
exports.dieError = dieError;
//# sourceMappingURL=io.js.map