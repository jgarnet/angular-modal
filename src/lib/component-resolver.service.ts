import {ComponentFactoryResolver, Inject, Injectable, Injector} from '@angular/core';
import {ComponentResolver} from './component-resolver';

@Injectable({
  providedIn: 'root'
})
export class ComponentResolverService extends ComponentResolver {

  constructor(@Inject(ComponentFactoryResolver) protected factoryResolver,
              protected injector: Injector) {
    super(factoryResolver, injector);
  }
}
