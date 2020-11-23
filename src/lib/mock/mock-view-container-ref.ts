import {
  ComponentFactory,
  ComponentRef, ElementRef,
  EmbeddedViewRef,
  Injector,
  NgModuleRef,
  TemplateRef,
  ViewContainerRef,
  ViewRef
} from '@angular/core';

export class MockViewContainerRef extends ViewContainerRef {
  clear(): void {
  }

  // tslint:disable-next-line:max-line-length
  createComponent<C>(componentFactory: ComponentFactory<C>, index?: number, injector?: Injector, projectableNodes?: any[][], ngModule?: NgModuleRef<any>): ComponentRef<C> {
    return undefined;
  }

  createEmbeddedView<C>(templateRef: TemplateRef<C>, context?: C, index?: number): EmbeddedViewRef<C> {
    return undefined;
  }

  detach(index?: number): ViewRef | null {
    return undefined;
  }

  get element(): ElementRef {
    return undefined;
  }

  get(index: number): ViewRef | null {
    return undefined;
  }

  indexOf(viewRef: ViewRef): number {
    return 0;
  }

  get injector(): Injector {
    return undefined;
  }

  insert(viewRef: ViewRef, index?: number): ViewRef {
    return null;
  }

  get length(): number {
    return 0;
  }

  move(viewRef: ViewRef, currentIndex: number): ViewRef {
    return undefined;
  }

  get parentInjector(): Injector {
    return undefined;
  }

  remove(index?: number): void {
  }
}
