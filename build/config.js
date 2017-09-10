var path = require('path');
var when = require('when');
var Dotfile = require('./dotfile');
var Config = (function () {
    /** Constructor */
    function Config(_dotfile) {
        this.dotfile = _dotfile;
    }
    Object.defineProperty(Config.prototype, "filePath", {
        get: function () { return this.dotfile.filePath; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "parentDirectory", {
        get: function () { return path.dirname(this.filePath); },
        enumerable: true,
        configurable: true
    });
    Config.defaultConfigLocation = function () {
        return process.env['XDG_CONFIG_HOME'] || path.join(process.env['HOME'], '.config');
    };
    Config.load = function (configFilename, minimumContents, parentDir) {
        var _this = this;
        if (minimumContents === void 0) { minimumContents = {}; }
        if (parentDir === void 0) { parentDir = Config.defaultConfigLocation(); }
        var filepath = path.join(parentDir, configFilename);
        return Dotfile.load(filepath, minimumContents)
            .then(function (dotfile) { return new _this(dotfile); })
            .then(function (config) { return config.validate(); });
    };
    /** Validation stuff */
    // subclasses should override
    Config.prototype.requiredKeys = function () {
        return [];
    };
    Config.prototype.validate = function () {
        var keys = this.keys();
        for (var key in this.requiredKeys) {
            if (this.dotfile.keys().indexOf(key) === -1) {
                throw new Error("config.json must contain the key '" + key + "'");
            }
        }
        return when.resolve(this);
    };
    Config.prototype.fetch = function (key) { return this.dotfile.fetch(key); };
    Config.prototype.store = function (key, value) { this.dotfile.store(key, value); return this; };
    Config.prototype.save = function () {
        var _this = this;
        return this.dotfile.save().then(function (df) { return _this; });
    };
    Config.prototype.keys = function () { return this.dotfile.keys(); };
    return Config;
})();
module.exports = Config;
//# sourceMappingURL=config.js.map