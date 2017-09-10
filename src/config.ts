
import path = require('path')
import when = require('when')
import Dotfile = require('./dotfile')


export = Config

class Config
{
    get filePath(): string { return this.dotfile.filePath }
    get parentDirectory(): string { return path.dirname(this.filePath) }

    protected dotfile: Dotfile;

    static defaultConfigLocation() :string {
        return process.env['XDG_CONFIG_HOME'] || path.join(process.env['HOME'], '.config')
    }

    static load (configFilename:string, minimumContents:{} = {}, parentDir:string = Config.defaultConfigLocation()) :when.Promise<Config> {
        var filepath = path.join(parentDir, configFilename)
        return Dotfile.load(filepath, minimumContents)
                      .then(dotfile => new this(dotfile))
                      .then(config  => config.validate())
    }


    /** Validation stuff */

    // subclasses should override
    requiredKeys(): string[] {
        return []
    }

    protected validate() :when.Promise<Config>
    {
        let keys = this.keys()
        for (var key in this.requiredKeys)
        {
            if (this.dotfile.keys().indexOf(key) === -1) {
                throw new Error(`config.json must contain the key '${key}'`)
            }
        }

        return when.resolve(this)
    }

    /** Constructor */

    constructor (_dotfile:Dotfile) {
        this.dotfile = _dotfile
    }

    fetch (key:string)           :any    { return this.dotfile.fetch(key) }
    store (key:string, value:{}) :Config { this.dotfile.store(key, value) ; return this }

    save () :when.Promise<Config>        { return this.dotfile.save().then(df => this) }
    keys () :string[]                    { return this.dotfile.keys() }
}
