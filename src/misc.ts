/// <xreference path='../typings/tsd.d.ts' />


export function isNull (val:any) :boolean {
    return !isNonNull(val)
}

export function isNonNull (val:any) :boolean {
    return (val !== null && val !== undefined)
}

export function applyMixins(receivingClass: any, mixinClasses: any[])
{
    mixinClasses.forEach(mixinClass => {
        Object.getOwnPropertyNames(mixinClass.prototype).forEach(name => {
            receivingClass.prototype[name] = mixinClass.prototype[name]
        })

        Object.getOwnPropertyNames(mixinClass.prototype).forEach(name => {
            receivingClass.prototype[name] = mixinClass.prototype[name]
        })
    })

    var receivingClass
}
