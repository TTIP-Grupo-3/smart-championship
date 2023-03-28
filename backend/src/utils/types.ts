export type Class<T> = { new (...args: any[]): T };
export type AbstractClass<T> = (abstract new () => T) & { prototype: T };
export type SuperClass<T> = AbstractClass<T> | Class<T>;
export type Instanciable<T> = T | Class<T>;
export type InstanciableArray<T> = Array<T> | Array<Class<T>>;
export type Diff<T, U> = T extends U ? never : T;
export type GenericFunction<T, R extends any[] = any[]> = (...args: R) => T;
export type MethodDecoratorTarget<T> = { constructor: T };
export type MethodComposer<T, R extends any[] = any[], S = any> = (
  fn: GenericFunction<T, R> | undefined,
  thisArg: any,
  target: MethodDecoratorTarget<S> | undefined,
  propertyKey: string,
  ...args: R
) => T;
export type DescriptorMethodDecorator<T = any, R = any> = (
  target: MethodDecoratorTarget<R> | undefined,
  propertyKey: string,
  descriptor?: TypedPropertyDescriptor<GenericFunction<T>>,
) => TypedPropertyDescriptor<GenericFunction<T>>;
export type TargetClassDecorator<T extends Class<T> = Class<any>> = (target: T) => T;
export type MetadataEntry = { key: any; value: any };
