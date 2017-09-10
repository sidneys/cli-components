/// <xreference path='../typings/tsd.d.ts' />
// import when = require('when')
var misc = require('./misc');
var isNull = misc.isNull;
var isNonNull = misc.isNonNull;
(function (ResultState) {
    ResultState[ResultState["Success"] = 0] = "Success";
    ResultState[ResultState["Failure"] = 1] = "Failure";
    ResultState[ResultState["Pending"] = 2] = "Pending";
})(exports.ResultState || (exports.ResultState = {}));
var ResultState = exports.ResultState;
var Result = (function () {
    function Result(value, errors) {
        if (isNonNull(value) && isNonNull(errors)) {
            throw new Error('Result<T> cannot be instantiated with a value AND errors.');
        }
        if (isNonNull(errors)) {
            if (errors instanceof Array) {
                this.errors = errors;
            }
            else if (errors instanceof Error) {
                this.errors = [errors];
            }
            else {
                throw new Error('Unexpected "errors" argument in Result<T> constructor.');
            }
            this.state = ResultState.Failure;
        }
        else {
            this.value = value;
            this.state = ResultState.Success;
        }
    }
    Object.defineProperty(Result.prototype, "isSuccess", {
        get: function () { return this.state === ResultState.Success; } //return this.value !== null && this.value !== undefined }
        ,
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "isError", {
        get: function () { return this.state === ResultState.Failure; } //return this.errors !== null && this.errors !== undefined && this.errors.length > 0 }
        ,
        enumerable: true,
        configurable: true
    });
    Result.prototype.map = function (transform) {
        if (this.isError) {
            return failure(this.errors);
        }
        else {
            return success(transform(this.value));
        }
    };
    Result.prototype.flatMap = function (transform) {
        if (this.isError) {
            return failure(this.errors);
        }
        else {
            return transform(this.value);
        }
    };
    return Result;
})();
exports.Result = Result;
function failure(errors) {
    if (typeof errors === 'string') {
        return new Result(null, [new Error(errors)]);
    }
    else {
        return new Result(null, errors);
    }
}
exports.failure = failure;
function success(value) {
    return new Result(value, null);
}
exports.success = success;
function attempt(closure) {
    try {
        return success(closure());
    }
    catch (err) {
        return new Result(null, err);
    }
}
exports.attempt = attempt;
function demandKey(key, object) {
    if (isNull(object[key])) {
        return failure("Missing value for key \"" + key + "\" on object " + object);
    }
    else {
        return success(object);
    }
}
exports.demandKey = demandKey;
function coalesce() {
    var results = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        results[_i - 0] = arguments[_i];
    }
    var errors = results.filter(function (result) { return result.isError; })
        .map(function (result) { return result.errors; })
        .reduce(function (into, errors) { return [].concat(into, errors); }, new Array());
    if (errors.length > 0) {
        return new Result(null, errors);
    }
    else {
        var unwrapped = results.map(function (result) { return result.value; });
        return new Result(unwrapped);
    }
}
exports.coalesce = coalesce;
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
//# sourceMappingURL=result.js.map