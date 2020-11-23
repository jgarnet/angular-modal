import { ComponentFactoryResolver, ComponentFactory, Type } from '@angular/core';

export class MockComponentFactoryResolver extends ComponentFactoryResolver {
  private componentFactory: ComponentFactory<any>;
  resolveComponentFactory<T>(component: Type<T>): ComponentFactory<T> {
        return this.componentFactory;
    }
    setComponentFactory(componentFactory: ComponentFactory<any>): void {
      this.componentFactory = componentFactory;
    }
}
