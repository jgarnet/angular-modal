import {Component, ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import {ModalInstanceComponent} from './modal-instance/modal-instance.component';
import {ModalOptions} from './modal-options';
import {ComponentResolverService} from './component-resolver.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private viewContainerRef: ViewContainerRef;
  private activeComponents: {ref: ComponentRef<ModalInstanceComponent>, component: Component}[];

  constructor(private componentResolverService: ComponentResolverService) {
    this.activeComponents = [];
  }

  /**
   * Set the ViewContainerRef in which ModalInstanceComponent instances will be inserted
   * @param viewContainerRef The modal wrapper ViewContainerRef
   */

  setViewContainerRef(viewContainerRef: ViewContainerRef): void {
    this.viewContainerRef = viewContainerRef;
  }

  /**
   * Display a Modal instance
   * @param component The Component to be displayed
   * @param options Configuration options for the Modal instance
   */

  display(component: any, options: ModalOptions = {
    data: {},
    dismissibleMask: true,
    canClose: true
  }): void {
    if (!this.isActive(component)) {
      const ref = this.componentResolverService.resolveComponent(this.viewContainerRef, ModalInstanceComponent, {
        component,
        options
      });
      this.activeComponents.push({ref, component});
      ref.onDestroy(() => this.activeComponents.splice(this.activeComponents.indexOf(component as any), 1));
    }
  }

  /**
   * Closes the Component if it is open
   * @param component The Component to close
   */

  close(component: any): void {
    const index = this.activeComponents.findIndex(i => i.component === component);
    this.activeComponents[index].ref.destroy();
    this.activeComponents.splice(index, 1);
  }

  /**
   * Closes all open Components
   */

  closeAll(): void {
    this.activeComponents.forEach(i => i.ref.destroy());
    this.activeComponents = [];
  }

  isActive(component: any): boolean {
    return this.activeComponents.findIndex(i => i.component === component) !== -1;
  }

}
