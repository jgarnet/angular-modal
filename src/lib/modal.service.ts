import {ApplicationRef, Component, ComponentRef, Inject, Injectable, Renderer2, RendererFactory2, ViewContainerRef} from '@angular/core';
import {ModalComponent} from './modal/modal.component';
import {ModalOptions} from './modal-options';
import {ComponentResolverService} from './component-resolver.service';
import {DOCUMENT} from '@angular/common';

@Injectable()
export class ModalService {

  private activeComponents: {ref: ComponentRef<ModalComponent>, component: Component}[];
  private renderer: Renderer2;
  private viewContainerRef: ViewContainerRef;
  private defaultOptions: ModalOptions;
  private scrollPosition: number;

  constructor(private componentResolverService: ComponentResolverService,
              rendererFactory: RendererFactory2,
              @Inject(DOCUMENT) private document,
              @Inject('WINDOW') private window,
              private applicationRef: ApplicationRef) {
    this.activeComponents = [];
    this.renderer = rendererFactory.createRenderer(null, null);
    this.defaultOptions = {};
  }

  /**
   * Allows a custom ViewContainerRef to be used to inject Modals into
   */

  setViewContainerRef(viewContainerRef: ViewContainerRef): void {
    this.viewContainerRef = viewContainerRef;
  }

  /**
   * Sets global default options for each new Modal instance
   */

  setDefaultOptions(options: ModalOptions): void {
    this.defaultOptions = options;
  }

  /**
   * Display a Modal instance
   * @param component The Component to be displayed
   * @param options Configuration options for the Modal instance
   */

  display(component: any, options: ModalOptions = {}): void {
    if (!this.isActive(component)) {
      this.lockBody();
      for (const key of Object.keys(this.defaultOptions)) {
        if (!!!options[key]) {
          options[key] = this.defaultOptions[key];
        }
      }
      const ref = this.componentResolverService.resolveComponent(this.getHostView(), ModalComponent, {
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

  private setScrollPositionIfNeeded(): void {
    if (!!!this.scrollPosition && this.scrollPosition !== 0) {
      this.scrollPosition = this.document.body.scrollTop || this.document.documentElement.scrollTop;
    }
  }

  private getHostView(): ViewContainerRef | ApplicationRef {
    return this.viewContainerRef || this.applicationRef;
  }

  /**
   * Closes the Component if it is open
   * @param component The Component to close
   */

  close(component: any): void {
    const index = this.activeComponents.findIndex(i => i.component === component);
    this.activeComponents[index].ref.instance.close();
    this.activeComponents.splice(index, 1);
    this.unlockBodyIfNeeded();
  }

  /**
   * Closes all open Components
   */

  closeAll(): void {
    this.activeComponents.forEach(i => i.ref.instance.close());
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
    this.setScrollPositionIfNeeded();
    this.renderer.setStyle(this.document.body, 'position', 'fixed');
    this.renderer.setStyle(this.document.body, 'top', `-${this.scrollPosition}px`);
  }

  /**
   * Unlocks the body once all Modal instances are destroyed
   */

  private unlockBody(): void {
    const scrollY = this.document.body.style.top;
    this.renderer.setStyle(this.document.body, 'position', '');
    this.renderer.setStyle(this.document.body, 'top', '0');
    // tslint:disable-next-line:radix
    this.window.scrollTo(0, parseInt(scrollY || '0') * -1);
    this.scrollPosition = null;
  }

  private unlockBodyIfNeeded(): void {
    if (this.activeComponents.length === 0) {
      this.unlockBody();
    }
  }

}
