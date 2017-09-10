/// <xreference path='../typings/tsd.d.ts' />

import path = require('path')
import when = require('when')
import Dotfile = require('./dotfile')

export = Cache


/**
   a simple key-value cache serialized to json.  or really whatever you need it to be.
 */
class Cache
{
    get filePath():  string { return this.dotfile.filePath }
    private dotfile: Dotfile;

    static defaultFileLocation() :string { return path.join(process.env.HOME, '.cache') }

    static load(cacheFilename:string, minimumContents:{} = {}, parentDir:string = Cache.defaultFileLocation()) :when.Promise<Cache>
    {
        var filepath = path.join(parentDir, cacheFilename)

        return Dotfile.load(filepath, minimumContents)
                      .then(dotfile => new Cache(dotfile))
    }


    constructor (dotfile:Dotfile) {
        this.dotfile = dotfile
    }

    fetch (key:string) :any             { return this.dotfile.fetch(key) }
    store (key:string, value:{}) :Cache { this.dotfile.store(key, value) ; return this }

    save () :when.Promise<Cache>        { return this.dotfile.save().then(df => this) }
    keys () :string[]                   { return this.dotfile.keys() }
}
