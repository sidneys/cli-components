/// <xreference path="index.d.ts" />

declare module "cli-components/build-tools"
{
    import sh = require('shelljs');
    import io = require('cli-components/io');

    export function addToGlobalScope(): void;
    export var logger: io.Logger;
    export function log(...parts: string[]): void;
    export function logn(...parts: string[]): void;
    export function logcmd(cmd: string, ...args: string[]): void;
    export function logcmd_begin(cmd: string, args: string[]): void;
    export function logcmd_end(result: sh.ExecReturnValue): void;
    export function needsBuild(filename: string, builtProduct: string): boolean;
    export function formatExecResult(result: sh.ExecReturnValue): string;
    export function typescriptCompileCmd(inFile:string, outDir:string, options:{}) :string;
    export function compileTypescript(inFile: string, outFile: string): sh.ExecReturnValue;
    export function compileTypescript(sourceRoot:string, sources:string[], buildRoot:string, options:{}) :sh.ExecReturnValue[];
    export function compileTypescriptFile(inFile:string, outFile:string, options:{}) :sh.ExecReturnValue;
}
