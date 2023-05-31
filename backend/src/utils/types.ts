import { Socket } from 'socket.io';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/enums/role.enum';

export type UserRequestInfo = { user?: User; role?: Role };
export type UserSocket = Socket & UserRequestInfo;
export type NoPromise = Diff<any, Promise<any>>;
export type MaybeArray<T> = T | Array<T>;
export type Methods<T> = jest.FunctionPropertyNames<Required<T>>;
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
export type DeepPartial<T> =
  | T
  | (T extends Array<infer U>
      ? DeepPartial<U>[]
      : T extends Map<infer K, infer V>
      ? Map<DeepPartial<K>, DeepPartial<V>>
      : T extends Set<infer M>
      ? Set<DeepPartial<M>>
      : T extends object
      ? {
          [K in keyof T]?: DeepPartial<T[K]>;
        }
      : T);
export type UserPayload = {
  id: number;
  username: string;
  iat: number;
  exp: number;
};
