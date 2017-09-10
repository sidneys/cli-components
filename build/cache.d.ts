
declare module "cli-components/cache"
{
    import when = require('when');
    import Dotfile = require('cli-components/dotfile');

    export = Cache;
    class Cache {
        filePath: string;
        private dotfile;
        static load(cacheFilename: string, minimumContents?: {}, parentDir?: string): when.Promise<Cache>;
        constructor(_dotfile: Dotfile);
        fetch(key: string): any;
        store(key: string, value: {}): Cache;
        save(): when.Promise<Cache>;
        keys(): string[];
    }
}