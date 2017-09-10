/// <xreference path='../typings/tsd.d.ts' />
function isNull(val) {
    return !isNonNull(val);
}
exports.isNull = isNull;
function isNonNull(val) {
    return (val !== null && val !== undefined);
}
exports.isNonNull = isNonNull;
function applyMixins(receivingClass, mixinClasses) {
    mixinClasses.forEach(function (mixinClass) {
        Object.getOwnPropertyNames(mixinClass.prototype).forEach(function (name) {
            receivingClass.prototype[name] = mixinClass.prototype[name];
        });
        Object.getOwnPropertyNames(mixinClass.prototype).forEach(function (name) {
            receivingClass.prototype[name] = mixinClass.prototype[name];
        });
    });
    var receivingClass;
}
exports.applyMixins = applyMixins;
//# sourceMappingURL=misc.js.map