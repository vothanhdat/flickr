
import { isEqual } from 'lodash'


/**
 * Prevent multiple same promise task call in the same time, 
 * This funtion wrap all of method call into only one until this task is done
 */
export function wrapPromise(target, propertyKey, descriptor) {
    if (target[propertyKey] instanceof Function) {
        var _promiseSym = Symbol('promise_' + propertyKey);
        var func = descriptor.value
        descriptor.value = function newfunc(...args) {
            if (this[_promiseSym])
                return this[_promiseSym]
            else {
                this[_promiseSym] = func && func.bind(this)(...args)
                this[_promiseSym]
                    .then(() => this[_promiseSym] = null)
                    .catch(() => this[_promiseSym] = null)
                return this[_promiseSym]
            }
        }
    } else {
        throw 'Wrong Function Type'
    }

}

export function cacheMethod(getCheck) {


    return function (target, propertyKey, descriptor) {

        if (descriptor.value instanceof Function) {
            var _cacheSym = Symbol(`cache-${propertyKey}`);
            var _cacheCheckSym = Symbol(`cache-check-${propertyKey}`);
            var func = descriptor.value

            descriptor.value = function (...args) {
                var newCheck = getCheck(this)
                console.log({ newCheck })
                if (isEqual(this[_cacheCheckSym], newCheck)) {
                    console.info('matchCheck')
                    return this[_cacheSym]
                } else {
                    this[_cacheCheckSym] = newCheck
                    return this[_cacheSym] = func.call(this, ...args)
                }
            }

        } else {
            throw 'Wrong Function Type'
        }

    }
}