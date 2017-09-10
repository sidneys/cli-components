var path = require('path')

require('shelljs/global')

String.prototype.typeIsAmong = function(types) {
    for (var i in types) {
        if (this.endsWith(type[i])) {
            return true
        }
    }
    return false
}

String.prototype.asType = function (type) {
    if (!type.startsWith('.')) {
        type = '.' + type
    }

    var ext = path.extname(this)
    return this.replace(ext, type)
}

String.prototype.writeTo = function (file) {
    log('Writing ' + chalk.bold(file) + '...')
    this.to(file)
}

String.prototype.writeAppendTo = function (file) {
    log('Writing ' + chalk.bold(file) + '...')
    this.toEnd(file)
}

