/// <xreference path='../typings/tsd.d.ts' />
var path = require('path');
var Dotfile = require('./dotfile');
/**
   a simple key-value cache serialized to json.  or really whatever you need it to be.
 */
var Cache = (function () {
    function Cache(dotfile) {
        this.dotfile = dotfile;
    }
    Object.defineProperty(Cache.prototype, "filePath", {
        get: function () { return this.dotfile.filePath; },
        enumerable: true,
        configurable: true
    });
    Cache.defaultFileLocation = function () { return path.join(process.env.HOME, '.cache'); };
    Cache.load = function (cacheFilename, minimumContents, parentDir) {
        if (minimumContents === void 0) { minimumContents = {}; }
        if (parentDir === void 0) { parentDir = Cache.defaultFileLocation(); }
        var filepath = path.join(parentDir, cacheFilename);
        return Dotfile.load(filepath, minimumContents)
            .then(function (dotfile) { return new Cache(dotfile); });
    };
    Cache.prototype.fetch = function (key) { return this.dotfile.fetch(key); };
    Cache.prototype.store = function (key, value) { this.dotfile.store(key, value); return this; };
    Cache.prototype.save = function () {
        var _this = this;
        return this.dotfile.save().then(function (df) { return _this; });
    };
    Cache.prototype.keys = function () { return this.dotfile.keys(); };
    return Cache;
})();
module.exports = Cache;
//# sourceMappingURL=cache.js.map