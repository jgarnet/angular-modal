/**
 * This class provides a mechanism for utilizing the ComponentFactoryResolver to resolve Components
 */

import {ComponentFactoryResolver, Injector, ViewContainerRef, ComponentRef, ApplicationRef, EmbeddedViewRef} from '@angular/core';

export class ComponentResolver {

  constructor(protected resolver: ComponentFactoryResolver, protected injector: Injector) {}

  /**
   * This method will resolve the Component and insert it into the provided ViewContainerRef
   * @param {ViewContainerRef} view The ViewContainerRef in which the Component will be inserted
   * @param component The Component to be resolved
   * @param inputData The @Input() fields to be populated in the Component
   */

  resolveComponent(view: ViewContainerRef | ApplicationRef, component: any, inputData: any): ComponentRef<any> {
    const factory = this.resolver.resolveComponentFactory(component);
    const componentRef = factory.create(this.injector);
    if (view instanceof ApplicationRef) {
      view.attachView(componentRef.hostView);
      const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;
      document.body.appendChild(domElem);
    } else {
      view.insert(componentRef.hostView);
    }
    // inject the Component with a reference to its ComponentRef
    // @ts-ignore
    componentRef.instance.ref = componentRef;
    if (!!inputData) {
      for (const key of Object.keys(inputData)) {
        componentRef.instance[key] = inputData[key];
      }
    }
    return componentRef;
  }
}
