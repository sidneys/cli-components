/// <xreference path='../typings/tsd.d.ts' />

import fs = require('fs-extra')
import path = require('path')
import when = require('when')
import whenNode = require('when/node')
import yaml = require('js-yaml')

var fsp = whenNode.liftAll(fs)


export = Dotfile

class Dotfile
{
    static load(filePath:string, fileMinimumContents:{}) :when.Promise<Dotfile>
    {
        var dotfile = new Dotfile(filePath, fileMinimumContents)
        return dotfile.ensureFile()
                      .then(df => df.fillCacheFromFile())
    }

    filePath:string;
    fileMinimumContents:{};
    private cache: {};

    constructor (_filePath:string, _fileMinimumContents:{}) {
        this.filePath = _filePath
        this.fileMinimumContents = _fileMinimumContents
    }

    store (key:string, value:{}) :void {
        this.cache[key] = value
    }

    fetch (key:string) :any {
        return this.cache[key]
    }

    keys () :string[]
    {
        var allKeys :string[] = []
        for (var key in this.cache) {
            if (this.cache.hasOwnProperty(key)) {
                allKeys.push(key)
            }
        }
        return allKeys
    }

    save() :when.Promise<Dotfile> {
        return this.writeCacheToFile()
    }

    private writeCacheToFile () :when.Promise<Dotfile> {
        return when.attempt(JSON.stringify, this.cache)
                   .then(json => fsp.writeFile(this.filePath, json))
                   .then(() => this)
    }

    private fillCacheFromFile () :when.Promise<Dotfile>
    {
        return this.ensureFile()
                  .then(()   => fsp.readFile(this.filePath))
                  .then(json => when.attempt(JSON.parse, json))
                  .then(obj  => { this.cache = obj; return this })
    }

    private ensureFile () :when.Promise<Dotfile>
    {
        return fsp.ensureFile(this.filePath)
                  .then(() => this.ensureMinimumContents(this.filePath, this.fileMinimumContents))
    }

    private ensureMinimumContents (filename:string, minimumContents:{}) :when.Promise<Dotfile>
    {
        return fsp.readFile(filename).then(contents => {
                                          if (contents.toString().trim().length <= 0)
                                          {
                                              this.cache = minimumContents
                                              return this.writeCacheToFile()
                                          }
                                          else { return when.resolve(this) }
                                      })
    }

}
