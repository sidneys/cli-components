
declare module "cli-components/file"
{
    import when = require('when')
    import result = require('cli-components/result')

    module File
    {
        export function contents(filename: string): string;
        export function tmpdir(): string;
        export function mtime(file: string): number;

        /**
         * Splits the contents of a text file into an Array of its constituent lines.
         * @param filepath The path of the file to split into lines.
         */
        export function lines(filename: string): string[];
        export function prependStringToFile(file: string, str: string): void;
        export function removeLinesFrom(glob: string, regexp: RegExp): void;
        export function findMatchesInFile(filename: string, regexp: RegExp): string[];
        export function createBackup(filepath: string, backupDir: string): when.Promise<string>;
        export function removeFilesFromDirMatching(regex: RegExp, fromDir: string): void;
        export function removeFileTypesFromDir(types: string[], fromDir: string): void;
        export function searchUpForFile(filename:string) :string;
        export function readJSONSync (filepath:string) :result.Result<any>;
    }
    export = File
}