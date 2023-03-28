import { InstanciableArray, SuperClass } from 'src/utils/types';

export class Instanciator {
  getInstances<T>(SuperClass: SuperClass<T>, classesOrIntstances: InstanciableArray<T>): Array<T> {
    return this.isInstancesArray(SuperClass, classesOrIntstances)
      ? classesOrIntstances
      : classesOrIntstances.map((Constructor) => new Constructor());
  }

  private isInstancesArray<T>(
    SuperClass: SuperClass<T>,
    classesOrIntstances: InstanciableArray<T>,
  ): classesOrIntstances is Array<T> {
    return classesOrIntstances.length === 0 || classesOrIntstances[0] instanceof SuperClass;
  }
}
