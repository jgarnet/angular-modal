import {ComponentResolver} from '../component-resolver';
import {ApplicationRef, ComponentRef, ViewContainerRef} from '@angular/core';

export class MockComponentResolver extends ComponentResolver {
  private componentRef: ComponentRef<any>;
  resolveComponent(view: ViewContainerRef | ApplicationRef, component: any, inputData: any): ComponentRef<any> {
    return this.componentRef;
  }
  setComponentRef(componentRef: ComponentRef<any>): void {
    this.componentRef = componentRef;
  }
}
