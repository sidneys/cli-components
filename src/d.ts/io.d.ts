
declare module "cli-components/io"
{
    export class Logger {
        folderDepth: number;
        tab: string;
        prefix: string;
        constructor(prefixString?: string, tabString?: string);
        print(...str: string[]): void;
        println(...str: string[]): void;
        dieError(err: any): void;
        indent(): void;
        unindent(): void;
    }
    export function print(str: string): void;
    export function println(str: string): void;
    export function dieError(err: any): void;
    export function logger() :Logger;

    export var settings :{ currentProcessLogger: Logger };
}

