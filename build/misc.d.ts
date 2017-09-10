
declare module "cli-components/misc"
{
    export function isNull (val:any) :boolean;
    export function isNonNull (val:any) :boolean;
    export function applyMixins(derivedCtor: any, baseCtors: any[]) :void;
}
