import { InstanciableArray, SuperClass } from './types';

export function getInstances<T>(
  SuperClass: SuperClass<T>,
  classesOrIntstances: InstanciableArray<T>,
): Array<T> {
  return isInstancesArray(SuperClass, classesOrIntstances)
    ? classesOrIntstances
    : classesOrIntstances.map((Constructor) => new Constructor());
}

export function isInstancesArray<T>(
  SuperClass: SuperClass<T>,
  classesOrIntstances: InstanciableArray<T>,
): classesOrIntstances is Array<T> {
  return classesOrIntstances.length === 0 || classesOrIntstances[0] instanceof SuperClass;
}
