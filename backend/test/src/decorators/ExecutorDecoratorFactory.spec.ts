/* eslint-disable @typescript-eslint/no-empty-function */
import { ExecutorDecoratorFactory } from 'src/decorators/ExecutorDecoratorFactory';
import { MethodExecutor } from 'src/executors/MethodExecutor';
import { InstanciableArray, MethodDecoratorTarget, TargetClassDecorator } from 'src/utils/types';
import { executeTotal, getMethods } from 'test/utils/tests';
import { errorMessage } from '../../data/src/decorators/ExecutorDecoratorFactory.spect.data.json';

describe('ExecutorDecoratorFactory', () => {
  function applyClassDecorator(ClassDecorator: TargetClassDecorator) {
    @ClassDecorator
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    class AuxDecoratedClass {
      method() {}
    }
  }
  function ClassExecutorDecorator(...executors: InstanciableArray<MethodExecutor>) {
    return ExecutorDecoratorFactory.classDecorator(MethodDecoratorFactory, ...executors);
  }
  function MethodDecoratorFactory(...executors: InstanciableArray<MethodExecutor>) {
    return ExecutorDecoratorFactory.methodDecorator(...executors);
  }
  class Executor extends MethodExecutor {
    before<S>(target: MethodDecoratorTarget<S>, propertyKey: string, ...args: any[]) {
      beforeSubmethod();
    }
    after<T, S, R>(
      berforeResult: T,
      result: R,
      target: MethodDecoratorTarget<S>,
      propertyKey: string,
      ...args: any[]
    ): void {
      afterSubmethod();
    }
    onError<T, S>(
      berforeResult: T,
      error: any,
      target: MethodDecoratorTarget<S>,
      propertyKey: string,
      ...args: any[]
    ): void {
      onErrorSubmethod();
    }
  }
  @ClassExecutorDecorator(Executor)
  class DecoratedClass {
    constructor() {}

    method1() {}

    method2() {}

    method3() {}

    method4() {}

    method5() {}
  }
  const beforeSubmethod = jest.fn();
  const afterSubmethod = jest.fn();
  const onErrorSubmethod = jest.fn();
  let decoratedInstance: DecoratedClass;

  beforeEach(() => {
    jest.resetAllMocks();
    decoratedInstance = new DecoratedClass();
  });

  describe('ClassDecorator', () => {
    it('should apply decorator to methods', () => {
      const methods = getMethods(DecoratedClass);
      methods.forEach((method) => decoratedInstance[method]());
      expect(beforeSubmethod).toBeCalledTimes(methods.length);
    });

    it("shouldn't apply decorator to constructor", () => {
      new DecoratedClass();
      expect(beforeSubmethod).not.toBeCalled();
    });

    it('should create executor method decorator', () => {
      const decoratorFactory = jest.fn().mockReturnValue((target, key, descriptor) => descriptor);
      const ClassDecorator = ExecutorDecoratorFactory.classDecorator(decoratorFactory, Executor);
      applyClassDecorator(ClassDecorator);
      expect(decoratorFactory).toBeCalled();
    });
  });

  describe('MethodDecorator', () => {
    const error = new Error(errorMessage);
    const executor = new Executor();
    class DecoratedClass {
      @MethodDecoratorFactory(executor)
      method() {}

      @MethodDecoratorFactory(executor)
      errorMethod() {
        throw error;
      }
    }
    const decoratedInstance = new DecoratedClass();

    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('should execute before hooks', () => {
      const before = jest.spyOn(executor, 'before');
      decoratedInstance.method();
      expect(before).toBeCalled();
    });

    it('should execute after hooks', () => {
      const after = jest.spyOn(executor, 'after');
      decoratedInstance.method();
      expect(after).toBeCalled();
    });

    it('should execute on error hooks', () => {
      const onError = jest.spyOn(executor, 'onError');
      executeTotal(() => decoratedInstance.errorMethod());
      expect(onError).toBeCalled();
    });
  });
});
