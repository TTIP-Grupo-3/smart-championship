/* eslint-disable @typescript-eslint/no-empty-function */
import { DecoratorFactory } from 'src/decorators/DecoratorFactory';
import { DescriptorMethodDecorator } from 'src/utils/types';
import { isAsyncFunction } from 'util/types';
import { metadata, errorMessage } from '../../data/src/decorators/DecoratorFactory.spec.data.json';

type ExecutionElement = 'before' | 'method' | 'after' | 'onError';

describe('DecoratorFactory', () => {
  let decoratedInstance;
  let noExecuteDecoratedInstance;
  let throwErrorDecoratedInstance;
  const error = new Error(errorMessage);
  let submethod: jest.Mock<any, any> | (() => void);
  let composeSubmethod: jest.Mock<any, any> | (() => void);
  const MethodDecorator: DescriptorMethodDecorator = DecoratorFactory.methodDecorator(
    (fn, thisArg, target, key, ...args) => {
      composeSubmethod();
      return fn.call(thisArg, ...args);
    },
  );
  const MetadataDecorator: DescriptorMethodDecorator = (target, propertyKey, descriptor) => {
    defineMetadata(descriptor.value, metadata);
    return descriptor;
  };
  const NoExecuteMethodDecorator: DescriptorMethodDecorator = DecoratorFactory.methodDecorator(
    function () {},
  );
  const ThrowErrorMethodDecorator: DescriptorMethodDecorator = DecoratorFactory.methodDecorator<void>(
    function () {
      throw error;
    },
  );

  class DecoratedClass {
    @MethodDecorator
    @MetadataDecorator
    method() {
      submethod(this);
    }

    @MethodDecorator
    @MetadataDecorator
    async asyncMethod() {
      await submethod(this);
    }
  }

  class NoExecuteDecoratedClass {
    @NoExecuteMethodDecorator
    method() {
      submethod(this);
    }

    @NoExecuteMethodDecorator
    async asyncMethod() {
      await submethod(this);
    }
  }

  class ThrowErrorDecoratedClass {
    @ThrowErrorMethodDecorator
    method() {
      submethod(this);
    }

    @ThrowErrorMethodDecorator
    async asyncMethod() {
      await submethod(this);
    }
  }

  function getMetadata<T>(target: T) {
    const keys = Reflect.getMetadataKeys(target);
    return keys.map((key) => ({ key, value: Reflect.getMetadata(key, target) }));
  }
  function defineMetadata<T>(target: T, metadata: Array<{ key: string; value: any }>) {
    metadata.forEach(({ key, value }) => Reflect.defineMetadata(key, value, target));
  }

  beforeEach(() => {
    composeSubmethod = jest.fn().mockReturnValue(undefined);
    decoratedInstance = new DecoratedClass();
    noExecuteDecoratedInstance = new NoExecuteDecoratedClass();
    throwErrorDecoratedInstance = new ThrowErrorDecoratedClass();
  });

  function methodsDescribe(name: string, methodType: 'sync' | 'async') {
    return describe(name, () => {
      const method = methodType === 'sync' ? 'method' : 'asyncMethod';
      beforeEach(() => {
        if (methodType === 'sync') {
          submethod = jest.fn().mockReturnValue(undefined);
        } else {
          submethod = jest.fn().mockResolvedValue(undefined);
        }
      });

      it('should execute method', async () => {
        await decoratedInstance[method]();
        expect(submethod).toBeCalled();
      });

      it("shouldn't execute method", async () => {
        await noExecuteDecoratedInstance[method]();
        expect(submethod).toBeCalledTimes(0);
      });

      it('should preserve method type (sync or async)', () => {
        expect(isAsyncFunction(decoratedInstance[method])).toEqual(methodType === 'async');
      });

      it('should throw error', async () => {
        await expect(async () => await throwErrorDecoratedInstance[method]()).rejects.toEqual(error);
      });

      it('should preserve method name', () => {
        expect(decoratedInstance[method].name).toEqual(method);
      });

      it('should compose method', async () => {
        await decoratedInstance[method]();
        expect(composeSubmethod).toBeCalled();
      });

      it('should preserve method metadata', () => {
        const gotMetadata = getMetadata(DecoratedClass.prototype[method]);
        expect(gotMetadata).toEqual(metadata);
      });

      it("should preserve 'this' method argument", async () => {
        await decoratedInstance[method]();
        expect(submethod).toBeCalledWith(decoratedInstance);
      });
    });
  }

  describe('MethodDecorator', () => {
    methodsDescribe('Sync methods', 'sync');

    methodsDescribe('Async methods', 'async');
  });

  describe('MethodExecutionDecorator', () => {
    let methodDecoratorFunction: jest.SpyInstance;
    let executedOrder: ExecutionElement[];
    const executionOrder: ExecutionElement[] = ['before', 'method', 'after'];
    const errorExecutionOrder: ExecutionElement[] = ['before', 'method', 'onError'];
    const before = jest.fn();
    const after = jest.fn();
    const onError = jest.fn();
    const MethodExecutionDecorator = DecoratorFactory.methodExecutionDecorator(before, after, onError);
    class DecoratedClassExecution {
      @MethodExecutionDecorator
      method() {
        executedOrder.push('method');
      }

      @MethodExecutionDecorator
      errorMethod() {
        executedOrder.push('method');
        throw error;
      }

      @MethodExecutionDecorator
      async asyncMethod() {
        executedOrder.push('method');
      }

      @MethodExecutionDecorator
      async asyncErrorMethod() {
        executedOrder.push('method');
        throw error;
      }
    }

    function executionMethodsDescribe(name: string, methodType: 'sync' | 'async') {
      return describe(name, () => {
        const method = methodType === 'sync' ? 'method' : 'asyncMethod';
        const errorMethod = methodType === 'sync' ? 'errorMethod' : 'asyncErrorMethod';

        it('should execute before', async () => {
          await decoratedInstance[method]();
          expect(before).toBeCalledWith({}, decoratedInstance[method].name);
        });

        it('should execute after', async () => {
          await decoratedInstance[method]();
          expect(after).toBeCalledWith(undefined, {}, decoratedInstance[method].name);
        });

        it('should execute onError', async () => {
          try {
            await decoratedInstance[errorMethod]();
          } catch {}
          expect(onError).toBeCalledWith(error, {}, decoratedInstance[errorMethod].name);
        });

        it('should execute in order', async () => {
          await decoratedInstance[method]();
          expect(executedOrder).toEqual(executionOrder);
        });

        it('should execute in order with error', async () => {
          try {
            await decoratedInstance[errorMethod]();
          } catch {}
          expect(executedOrder).toEqual(errorExecutionOrder);
        });
      });
    }

    beforeEach(() => {
      jest.resetAllMocks();
      before.mockImplementation(() => executedOrder.push('before'));
      after.mockImplementation(() => executedOrder.push('after'));
      onError.mockImplementation((reason) => {
        executedOrder.push('onError');
        throw reason;
      });
      executedOrder = [];
      decoratedInstance = new DecoratedClassExecution();
    });

    it('should return method decorator', () => {
      const mockedResult = (target, propertyKey, descriptor) => descriptor;
      methodDecoratorFunction = jest.spyOn(DecoratorFactory, 'methodDecorator');
      methodDecoratorFunction.mockReturnValue(mockedResult);
      const result = DecoratorFactory.methodExecutionDecorator(before, after, onError);
      expect(result).toEqual(mockedResult);
    });

    executionMethodsDescribe('Sync methods', 'sync');

    executionMethodsDescribe('Async methods', 'async');
  });
});
