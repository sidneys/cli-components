/// <xreference path="index.d.ts" />

declare module "cli-components/shell"
{
    import sh = require('shelljs');
    import when = require('when');

    export import echo = sh.echo;
    // export import ls = require('ls-r');

    export function addToGlobalScope(): void;
    export function logcmd(cmd:string, ...args:string[]);
    export function logcmd_begin(cmd:string, args:string[]);
    export function logcmd_end(result:sh.ExecReturnValue);
    export function argString(args:{}) :string;

    export type StringPile = string | string[];
    export function flatten(...args: StringPile[]): string[];

    export function isFile(filename:string) :boolean;
    export function isDir(filename:string) :boolean;
    export function isChildOf(filename:string, maybeParent:string) :boolean;
    export function depthSortFilenames(filenames:string[]) :string[];

    // export function ls(opts:string, glob:string, fileRegex:RegExp) :string[];
    export function lz(archivePath:string) :when.Promise<any>;
    export function cp(opts: string, src: string, dest: string): void;
    export function mv(src: string, dest: string): void;
    export function rm(opts: string, victim: string): void;
    export function chmod(mode: string, file: string) :void;
    export function mkdir(flags: any, dirpath: any): void;
    export function pushd(dir: any): string[];
    export function popd(): string[];
    export function ln(opts: string, realPath: string, linkPath: string): void;
    export function sed(opts:string, searchRegex:RegExp, replacement:string, file:string) :void;
    // export function sed(searchRegex:RegExp, replacement:string, file:string) :void;
    export function exec(cmdString: string): sh.ExecReturnValue;
    export function cat(...files: string[]): string;
}
