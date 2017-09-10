/// <xreference path='../typings/tsd.d.ts' />
var fs = require('fs-extra');
var when = require('when');
var whenNode = require('when/node');
var fsp = whenNode.liftAll(fs);
var Dotfile = (function () {
    function Dotfile(_filePath, _fileMinimumContents) {
        this.filePath = _filePath;
        this.fileMinimumContents = _fileMinimumContents;
    }
    Dotfile.load = function (filePath, fileMinimumContents) {
        var dotfile = new Dotfile(filePath, fileMinimumContents);
        return dotfile.ensureFile()
            .then(function (df) { return df.fillCacheFromFile(); });
    };
    Dotfile.prototype.store = function (key, value) {
        this.cache[key] = value;
    };
    Dotfile.prototype.fetch = function (key) {
        return this.cache[key];
    };
    Dotfile.prototype.keys = function () {
        var allKeys = [];
        for (var key in this.cache) {
            if (this.cache.hasOwnProperty(key)) {
                allKeys.push(key);
            }
        }
        return allKeys;
    };
    Dotfile.prototype.save = function () {
        return this.writeCacheToFile();
    };
    Dotfile.prototype.writeCacheToFile = function () {
        var _this = this;
        return when.attempt(JSON.stringify, this.cache)
            .then(function (json) { return fsp.writeFile(_this.filePath, json); })
            .then(function () { return _this; });
    };
    Dotfile.prototype.fillCacheFromFile = function () {
        var _this = this;
        return this.ensureFile()
            .then(function () { return fsp.readFile(_this.filePath); })
            .then(function (json) { return when.attempt(JSON.parse, json); })
            .then(function (obj) { _this.cache = obj; return _this; });
    };
    Dotfile.prototype.ensureFile = function () {
        var _this = this;
        return fsp.ensureFile(this.filePath)
            .then(function () { return _this.ensureMinimumContents(_this.filePath, _this.fileMinimumContents); });
    };
    Dotfile.prototype.ensureMinimumContents = function (filename, minimumContents) {
        var _this = this;
        return fsp.readFile(filename).then(function (contents) {
            if (contents.toString().trim().length <= 0) {
                _this.cache = minimumContents;
                return _this.writeCacheToFile();
            }
            else {
                return when.resolve(_this);
            }
        });
    };
    return Dotfile;
})();
module.exports = Dotfile;
//# sourceMappingURL=dotfile.js.map