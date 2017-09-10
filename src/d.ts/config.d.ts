
declare module "cli-components/config"
{
    import when = require('when');
    import Dotfile = require('cli-components/dotfile');

    export = Config;

    class Config {
        filePath: string;
        parentDirectory: string;
        protected dotfile: Dotfile;
        static defaultConfigLocation(): string;
        static load(configFilename: string, minimumContents?: {}, parentDir?: string): when.Promise<Config>;

        /** To be used by subclasses — do not call directly.  This is called on a `Config` object after `Config.load()` returns. */
        protected validate(): when.Promise<Config>;
        requiredKeys(): string[];

        constructor(_dotfile: Dotfile);

        fetch(key: string): any;
        store(key: string, value: {}): Config;
        save(): when.Promise<Config>;
        keys(): string[];
    }
}
