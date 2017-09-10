/// <xreference path='../typings/tsd.d.ts' />

import events = require('events')
// import when = require('when')
import misc = require('./misc')
import isNull = misc.isNull
import isNonNull = misc.isNonNull

export interface IResult <T>
{
    map     <U> (transform:(value:T) => U):          IResult<U>;
    flatMap <U> (transform:(value:T) => IResult<U>): IResult<U>;
}

export enum ResultState {
    Success, Failure, Pending
}


export class Result <T>
    implements IResult <T>
{
    value: T;
    errors: Error[];
    state: ResultState;

    get isSuccess() :boolean { return this.state === ResultState.Success } //return this.value !== null && this.value !== undefined }
    get isError()   :boolean { return this.state === ResultState.Failure } //return this.errors !== null && this.errors !== undefined && this.errors.length > 0 }

    constructor (value:T, errors?:Error|Error[])
    {
        if (isNonNull(value) && isNonNull(errors)) {
            throw new Error('Result<T> cannot be instantiated with a value AND errors.')
        }

        if (isNonNull(errors))
        {
            if      (errors instanceof Array)       { this.errors = <Error[]>errors }
            else if (errors instanceof Error)       { this.errors = [errors] }
            else { throw new Error('Unexpected "errors" argument in Result<T> constructor.') }

            this.state = ResultState.Failure
        }
        else {
            this.value  = value
            this.state = ResultState.Success
        }

    }

    map <U> (transform:(value:T) => U): Result<U>
    {
        if (this.isError) { return failure<U>(this.errors) }
        else              { return success<U>(transform(this.value)) }
    }

    flatMap <U> (transform:(value:T) => Result<U>): Result<U>
    {
        if (this.isError) { return failure<U>(this.errors) }
        else              { return transform(this.value) }
    }
}


export function failure <T> (errors:string|Error[]) :Result<T>
{
    if (typeof errors === 'string') { return new Result<T>(null, [new Error(errors)]) }
    else                            { return new Result<T>(null, errors) }
}


export function success <T> (value:T) :Result<T> {
    return new Result<T>(value, null)
}

export function attempt <T> (closure:() => T) :Result<T> {
    try         { return success(closure()) }
    catch (err) { return new Result<T>(null, err) }
}

export function demandKey <T> (key:string, object:T) :Result<T> {
    if (isNull(object[key])) {
        return failure<T>(`Missing value for key "${key}" on object ${object}`)
    }
    else { return success<T>(object) }
}


export function coalesce <T> (...results:Result<T>[]) :Result<T[]>
{
    var errors: Error[] = results.filter(result => result.isError)
                                 .map(result => result.errors)
                                 .reduce((into, errors) => [].concat(into, errors), new Array<Error>())

    if (errors.length > 0) {
        return new Result<T[]>(null, errors)
    }
    else {
        var unwrapped = results.map(result => result.value)
        return new Result<T[]>(unwrapped)
    }
}




/*export class AsyncResult <T>
    extends Promise implements IResult <T>
{
    value: T;
    errors: Error[] = [];

    private _state: ResultState = ResultState.Pending;
    protected deferred: when.Deferred<T>;

    get state (): ResultState { return this._state }
    set state (s: ResultState)
    {
        switch (this._state) {
            case ResultState.Success: throw new Error('Cannot resolve an AsyncResult<T> more than once.')
            case ResultState.Failure: throw new Error('Cannot resolve an AsyncResult<T> more than once.')
            case ResultState.Pending: if (s === ResultState.Pending) { throw new Error('The state of an AsyncResult<T> can never be set to Pending.') }
            default: throw new Error(`AsyncResult._state is set to an unrecognized value (${this._state})`)
        }

        this._state = s

        switch (this._state)
        {
            case ResultState.Success: return
            case ResultState.Failure: return
            case ResultState.Pending: throw new Error('This should definitely be impossible.  Watch for agents.')
            default:                  throw new Error(`AsyncResult._state is set to an unrecognized value (${this._state})`)
        }

    }


    constructor (promise:Promise<T>)
    {
        super()

        this.deferred = when.defer()

        // this.deferred.promise = isNonNull(promise) ? promise : new Promise<T>()
        this.deferred.promise.done((value: T)   => { this.didResolve(value, null); return },
                                   (error: any) => { this.didResolve(null, error); return })
    }


    protected didResolve (value:T, error:any) :void
    {
        if (isNonNull(value) && isNull(error)) {
            this.value = value
            this.errors = []
            this.state = ResultState.Success
        }
        else if (isNonNull(error) && isNull(value)) {
            this.value = null
            this.errors = [error]
            this.state = ResultState.Failure
        }
        else { throw new Error('You\'re doing it wrong') }
    }


    success (value:T) :void
    {
        // this.value = value
        // this.errors = []
        this.state = ResultState.Success
        this.deferred.resolve(value)
    }

    failure (error:string) :void
    {
        // this.errors = [new Error(error)]
        // this.value = null
        this.state = ResultState.Failure
        this.deferred.reject(error)
    }

    map <U> (transform:(value:T) => U): AsyncResult<U>
    {
        return new AsyncResult(when(this.deferred.promise, transform))

        // this.promise.then(value => transform)
        //
        // if (this.isError) { return new Result<U>(null, this.errors) }
        // else              { return new Result<U>(transform(this.value), null) }
    }

    flatMap <U> (transform:(value:T) => Result<U>|AsyncResult<U>): AsyncResult<U>
    {
        return new AsyncResult(when(this.deferred.promise, transform))

        // var promise = this.promise.then((value:T) => {
        //     var transformed = transform(value)
        //     if (transformed instanceof AsyncResult) {
        //         return transformed
        //     }
        //     else if (transformed instanceof Result) {
        //         return transformed
        //     }
        // })

        // var promise = when.promise((resolve, reject) => {
        //     this.promise.done(value => resolve(transform(value)),
        //                       error => reject(error))
        //     return
        // })
        // return new AsyncResult(promise)
    }
}*/
