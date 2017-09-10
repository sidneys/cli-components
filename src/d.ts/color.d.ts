
declare module 'cli-components/color'
{
    module Color
    {
        export function bold(text:string) :string;
        export function underline(text:string) :string;

        export function blue(text:string) :string;
        export function red(text:string) :string;
        export function magenta(text:string) :string;
        export function yellow(text:string) :string;
        export function orange(text:string) :string;
        export function turquoise(text:string) :string;
        export function green(text:string) :string;
        export function purple(text:string) :string;

        export function white(text:string) :string;
        export function darkGrey(text:string) :string;
        export function lightGrey(text:string) :string;
        export function black(text:string) :string;
    }

    export = Color;
}
