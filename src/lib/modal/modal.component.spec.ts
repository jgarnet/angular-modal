import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {ModalComponent} from './modal.component';
import {MockComponentRef} from '../mock/mock-component-ref';
import {ComponentResolverService} from '../component-resolver.service';
import {MockComponentResolver} from '../mock/mock-component-resolver';
import {ModalOptions} from '../modal-options';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('ModalInstanceComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  const mockComponentResolver: MockComponentResolver = new MockComponentResolver(null, null);
  const modalContainerClickEvent = {
    target: {
      classList: {
        contains: (className) => true
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalComponent ],
      imports: [
        BrowserAnimationsModule
      ],
      providers: [
        { provide: ComponentResolverService, useValue: mockComponentResolver }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    component.options = {
      data: {}
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create a Modal instance on instantiation', () => {
    spyOn(MockComponentResolver.prototype, 'resolveComponent');
    component.ngOnInit();
    expect(MockComponentResolver.prototype.resolveComponent).toHaveBeenCalled();
  });
  it('should destroy the ComponentRef instance on close()', fakeAsync(() => {
    const componentRef = new MockComponentRef();
    spyOn(componentRef, 'destroy');
    component.ref = componentRef;
    fixture.detectChanges();
    component.close();
    tick(200);
    expect(componentRef.destroy).toHaveBeenCalled();
  }));
  it('should not call close() in processClick() if dismissableMask is disabled', () => {
    spyOn(component, 'close');
    component.options.dismissibleMask = false;
    fixture.detectChanges();
    component.populateOptions();
    component.dismissMask(modalContainerClickEvent);
    expect(component.close).not.toHaveBeenCalled();
  });
  it('should call close() in processClick() if dismissableMask is enabled and the mask has been clicked', () => {
    spyOn(component, 'close');
    component.options.dismissibleMask = true;
    fixture.detectChanges();
    component.populateOptions();
    component.dismissMask(modalContainerClickEvent);
    expect(component.close).toHaveBeenCalled();
  });
  it('should destroy ComponentRef on close()', () => {
    spyOn(MockComponentRef.prototype, 'destroy');
    component.ref = new MockComponentRef();
    fixture.detectChanges();
    component.close();
    expect(MockComponentRef.prototype.destroy).toHaveBeenCalled();
  });
  it('should allow the Modal to be closed according to ModalOptions', () => {
    component.options.canClose = false;
    fixture.detectChanges();
    component.populateOptions();
    expect(component.canClose).toBeFalse();
    component.options.canClose = true;
    fixture.detectChanges();
    component.populateOptions();
    expect(component.canClose).toBeTrue();
  });
  it('should use default options if not supplied', () => {
    component.options = {};
    fixture.detectChanges();
    component.populateOptions();
    expect(component.zIndex).toBe(0);
    expect(component.customStyles).toEqual({});
  });
  it('should use the provided options if supplied', () => {
    const options: ModalOptions = {
      zIndex: 5,
      styles: { backgroundColor: '#eee' },
      canClose: false,
      dismissibleMask: false
    };
    component.options = options;
    fixture.detectChanges();
    component.populateOptions();
    expect(component.zIndex).toBe(5);
  });
});
