import {ApplicationRef, Component, ComponentRef, Inject, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {ModalComponent} from './modal/modal.component';
import {ModalOptions} from './modal-options';
import {ComponentResolverService} from './component-resolver.service';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private activeComponents: {ref: ComponentRef<ModalComponent>, component: Component}[];
  private renderer: Renderer2;

  constructor(private componentResolverService: ComponentResolverService,
              rendererFactory: RendererFactory2,
              @Inject(DOCUMENT) private document,
              private applicationRef: ApplicationRef) {
    this.activeComponents = [];
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  /**
   * Display a Modal instance
   * @param component The Component to be displayed
   * @param options Configuration options for the Modal instance
   */

  display(component: any, options: ModalOptions = {
    data: {},
    dismissibleMask: true,
    canClose: true,
    styles: {}
  }): void {
    if (!this.isActive(component)) {
      this.lockBody();
      const ref = this.componentResolverService.resolveComponent(this.applicationRef, ModalComponent, {
        component,
        options
      });
      this.activeComponents.push({ref, component});
      ref.onDestroy(() => {
        this.activeComponents.splice(this.activeComponents.indexOf(component), 1);
        this.unlockBodyIfNeeded();
      });
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
    this.unlockBodyIfNeeded();
  }

  /**
   * Closes all open Components
   */

  closeAll(): void {
    this.activeComponents.forEach(i => i.ref.destroy());
    this.activeComponents = [];
    this.unlockBody();
  }

  /**
   * Determines if the given Component is currently being displayed
   */

  isActive(component: any): boolean {
    return this.activeComponents.findIndex(i => i.component === component) !== -1;
  }

  /**
   * Locks to body to prevent scrolling while instances of Modal are present
   */

  private lockBody(): void {
    this.renderer.setStyle(this.document.body, 'position', 'fixed');
  }

  /**
   * Unlocks the body once all Modal instances are destroyed
   */

  private unlockBody(): void {
    this.renderer.setStyle(this.document.body, 'position', 'relative');
  }

  private unlockBodyIfNeeded(): void {
    if (this.activeComponents.length === 0) {
      this.unlockBody();
    }
  }

}
