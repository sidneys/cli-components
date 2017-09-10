
declare module "cli-components/dotfile"
{
    import when = require('when');

    export = Dotfile;
    class Dotfile {
        static load(filePath: string, fileMinimumContents: {}): when.Promise<Dotfile>;
        filePath: string;
        fileMinimumContents: {};
        private cache;
        constructor(_filePath: string, _fileMinimumContents: {});
        store(key: string, value: {}): void;
        fetch(key: string): any;
        keys(): string[];
        save(): when.Promise<Dotfile>;
        private writeCacheToFile();
        private fillCacheFromFile();
        private ensureFile();
        private ensureMinimumContents(filename, minimumContents);
    }
}
