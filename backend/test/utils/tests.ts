import { Class, DeepPartial, Methods } from 'src/utils/types';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

export function mock<T>(token: Class<T>): T {
  const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
  const Mock = moduleMocker.generateFromMetadata(mockMetadata);
  return new Mock();
}

export function getMethods<T>(Target: Class<T>): Array<Methods<T>> {
  return Object.getOwnPropertyNames(Target.prototype).filter(
    (method) => !['constructor', 'onModuleInit'].includes(method),
  ) as Array<Methods<T>>;
}

export function executeTotal<T>(func: () => T): T | any {
  try {
    return func();
  } catch (reason) {
    return reason;
  }
}

export function without<T>(originalObject: T, ...attrs: Array<keyof T>) {
  let objectWithoutAttrs: any = { ...originalObject };
  for (const attr of attrs) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [attr]: attrValue, ...rest } = objectWithoutAttrs;
    objectWithoutAttrs = rest;
  }
  return objectWithoutAttrs;
}

export function merge<T, R extends DeepPartial<T>>(originalObject: T, replaceObject: R): DeepPartial<T> {
  const replaced: any = { ...originalObject };
  if (
    !replaceObject ||
    replaceObject instanceof Array ||
    ['boolean', 'string', 'number', 'function'].includes(typeof replaceObject) ||
    Object.keys(replaceObject).length === 0
  ) {
    return replaceObject;
  } else {
    for (const key in replaceObject) {
      replaced[key] = merge(replaced[key], replaceObject[key]);
    }
    return replaced;
  }
}
