export type Class<T> = { new (...args: any[]): T };
export type AbstractClass<T> = (abstract new () => T) & { prototype: T };
export type SuperClass<T> = AbstractClass<T> | Class<T>;
export type Instanciable<T> = T | Class<T>;
export type InstanciableArray<T> = Array<T> | Array<Class<T>>;
export type Diff<T, U> = T extends U ? never : T;
export type GenericFunction<T, R extends any[] = any[]> = (...args: R) => T;
