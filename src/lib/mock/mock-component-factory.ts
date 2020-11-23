import {ComponentFactory, ComponentRef, NgModuleRef, Injector, Type} from '@angular/core';

export class MockComponentFactory extends ComponentFactory<any> {
    private componentRef: ComponentRef<any>;
    get selector(): string {
        throw new Error('Method not implemented.');
    }
    get componentType(): Type<any> {
        throw new Error('Method not implemented.');
    }
    get ngContentSelectors(): string[] {
        throw new Error('Method not implemented.');
    }
    get inputs(): { propName: string; templateName: string; }[] {
        throw new Error('Method not implemented.');
    }
    get outputs(): { propName: string; templateName: string; }[] {
        throw new Error('Method not implemented.');
    }
    create(injector: Injector, projectableNodes?: any[][], rootSelectorOrNode?: any, ngModule?: NgModuleRef<any>): ComponentRef<any> {
        return this.componentRef;
    }
    setComponentRef(componentRef: ComponentRef<any>): void {
      this.componentRef = componentRef;
    }
}
