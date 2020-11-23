import {ComponentResolver} from './component-resolver';
import {ComponentFactoryResolver, Type} from '@angular/core';
import {MockComponentFactoryResolver} from './mock/mock-component-factory-resolver';
import {MockInjector} from './mock/mock-injector';
import {MockComponentFactory} from './mock/mock-component-factory';
import {MockType} from './mock/mock-type';
import {MockViewContainerRef} from './mock/mock-view-container-ref';
import {MockComponentRef} from './mock/mock-component-ref';

describe('ComponentResolver', () => {
  const createComponentResolver = (instance: any) => {
    const componentFactoryResolver = new MockComponentFactoryResolver();
    const componentFactory = new MockComponentFactory();
    const componentRef = new MockComponentRef();
    componentRef.setInstanceRef(instance);
    componentFactory.setComponentRef(componentRef);
    componentFactoryResolver.setComponentFactory(componentFactory);
    return new ComponentResolver(componentFactoryResolver, new MockInjector());
  };
  it('should create an instance', () => {
    const componentResolver = new ComponentResolver(new MockComponentFactoryResolver(), new MockInjector());
    expect(componentResolver).toBeTruthy();
  });
  it('should create a ComponentFactoryResolver for the given Component', () => {
    const componentResolver = createComponentResolver({});
    spyOn(MockComponentFactoryResolver.prototype, 'resolveComponentFactory').and.callThrough();
    const componentToCreate: Type<any> = new MockType() as Type<any>;
    componentResolver.resolveComponent(new MockViewContainerRef(), componentToCreate, {});
    expect(MockComponentFactoryResolver.prototype.resolveComponentFactory).toHaveBeenCalledWith(componentToCreate);
  });
  it('should set a reference to the ComponentRef in the created Component instance', () => {
    const instance = {};
    const componentResolver = createComponentResolver(instance);
    const componentToCreate: Type<any> = new MockType() as Type<any>;
    const result = componentResolver.resolveComponent(new MockViewContainerRef(), componentToCreate, {});
    expect(result.instance.ref).not.toBeNull();
  });
  it('should populate ComponentRef instance with inputted data', () => {
    const instance = {};
    const componentResolver = createComponentResolver(instance);
    const componentToCreate: Type<any> = new MockType() as Type<any>;
    const result = componentResolver.resolveComponent(new MockViewContainerRef(), componentToCreate, {
      a: 1,
      b: 2
    });
    expect(result.instance.a).toBe(1);
    expect(result.instance.b).toBe(2);
  });
});
