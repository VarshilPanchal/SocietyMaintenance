import { Injectable } from '@angular/core';
import { isEmpty } from 'rxjs/operators';
import {
  isArray,
  isRegExp,
  isDate,
  isError,
  isBoolean,
  isBuffer,
  isFunction,
  isNull,
  isNullOrUndefined,
  isNumber,
  isObject,
  isPrimitive,
  isString,
  isSymbol,
  isUndefined,
} from 'util';

@Injectable({
  providedIn: 'root'
})
export class LoadashService {

  constructor() { }

  get isEmpty() {
    return isEmpty;
  }

  // get forEach() {
  //   return forEach;
  // }

  get isArray() {
    return isArray;
  }

  get isRegExp() {
    return isRegExp;
  }
  get isDate() {
    return isDate;
  }
  get isError() {
    return isError;
  }

  get isBoolean() {
    return isBoolean;
  }

  get isBuffer() {
    return isBuffer;
  }

  get isFunction() {
    return isFunction;
  }

  get isNull() {
    return isNull;
  }

  get isNullOrUndefined() {
    return isNullOrUndefined;
  }

  get isNumber() {
    return isNumber;
  }

  get isObject() {
    return isObject;
  }

  get isPrimitive() {
    return isPrimitive;
  }

  get isString() {
    return isString;
  }

  get isSymbol() {
    return isSymbol;
  }

  get isUndefined() {
    return isUndefined;
  }

}
