import { Injector, Type, InjectionToken, AbstractType, InjectFlags } from '@angular/core';

export class MockInjector extends Injector {
    private instance: any;
    get<T>(token: Type<T> | InjectionToken<T> | AbstractType<T>, notFoundValue?: T, flags?: InjectFlags): T;
    get(token: any, notFoundValue?: any): any;
    get(token: any, notFoundValue?: any, flags?: any): any {
        return this.instance;
    }
    setInstance(instance: any): void {
      this.instance = instance;
    }
}
