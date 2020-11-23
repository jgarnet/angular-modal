import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalInstanceComponent} from './modal-instance.component';
import {MockComponentRef} from '../mock/mock-component-ref';
import {ComponentResolverService} from '../component-resolver.service';
import {MockComponentResolver} from '../mock/mock-component-resolver';

describe('ModalInstanceComponent', () => {
  let component: ModalInstanceComponent;
  let fixture: ComponentFixture<ModalInstanceComponent>;
  const mockComponentResolver: MockComponentResolver = new MockComponentResolver(null, null);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInstanceComponent ],
      providers: [
        { provide: ComponentResolverService, useValue: mockComponentResolver }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInstanceComponent);
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
  it('should destroy the ComponentRef instance on close()', () => {
    const componentRef = new MockComponentRef();
    spyOn(componentRef, 'destroy');
    component.ref = componentRef;
    component.close();
    expect(componentRef.destroy).toHaveBeenCalled();
  });
  it('should not call close() in processClick() if dismissableMask is disabled', () => {
    spyOn(component, 'close');
    component.options.dismissibleMask = false;
    component.processClick({
      target: {
        getAttribute: (attr) => 'modal-container'
      }
    });
    expect(component.close).not.toHaveBeenCalled();
  });
  it('should call close() in processClick() if dismissableMask is enabled and the mask has been clicked', () => {
    spyOn(component, 'close');
    component.options.dismissibleMask = true;
    component.processClick({
      target: {
        getAttribute: (attr) => 'modal-container'
      }
    });
    expect(component.close).toHaveBeenCalled();
  });
});
