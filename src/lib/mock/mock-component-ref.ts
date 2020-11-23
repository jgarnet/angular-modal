import {ChangeDetectorRef, ComponentRef, ElementRef, Injector, Type, ViewRef} from '@angular/core';

export class MockComponentRef extends ComponentRef<any> {
    private instanceRef: any;
    get location(): ElementRef<any> {
        throw new Error('Method not implemented.');
    }
    get injector(): Injector {
        throw new Error('Method not implemented.');
    }
    get instance(): any {
        return this.instanceRef;
    }
    get hostView(): ViewRef {
        return null;
    }
    get changeDetectorRef(): ChangeDetectorRef {
        throw new Error('Method not implemented.');
    }
    get componentType(): Type<any> {
        throw new Error('Method not implemented.');
    }
    destroy(): void {}
  // tslint:disable-next-line:ban-types
    onDestroy(callback: Function): void {}
    setInstanceRef(instanceRef: any): void {
      this.instanceRef = instanceRef;
    }

}
