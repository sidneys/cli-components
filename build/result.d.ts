
declare module "cli-components/result"
{
    export class Result <T>
    {
        value: T;
        errors: Error[];

        isSuccess:boolean;
        isError:boolean;

        new (value:T, errors?:Error[]);

        map <U> (transform:(value:T) => U): Result<U>;
        flatMap <U> (transform:(value:T) => Result<U>): Result<U>;
    }

    export function failure <T> (errors:Error[]) :Result<T>;
    export function failure <T> (reason:string) :Result<T>;
    export function success <T> (value:T) :Result<T>;

    export function attempt <T> (closure:() => T) :Result<T>;
    export function demandKey <T> (key:string, object:T) :Result<T>;
    export function coalesce <T> (...results:Result<T>[]) :Result<T[]>;
}

