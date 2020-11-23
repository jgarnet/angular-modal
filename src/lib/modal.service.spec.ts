import {TestBed} from '@angular/core/testing';

import {ModalService} from './modal.service';
import {ComponentResolver} from './component-resolver';
import {MockComponentResolver} from './mock/mock-component-resolver';
import {ComponentResolverService} from './component-resolver.service';
import {MockComponentRef} from './mock/mock-component-ref';

describe('AngularModalService', () => {
  let service: ModalService;
  const componentResolver = new MockComponentResolver(null, null);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ComponentResolverService, useValue: componentResolver }
      ]
    });
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should not create a new Component instance if one already exists', () => {
    spyOn(service, 'isActive').and.callFake(() => true);
    spyOn(ComponentResolver.prototype, 'resolveComponent');
    service.display({});
    expect(ComponentResolver.prototype.resolveComponent).not.toHaveBeenCalled();
  });
  it('should create a new Component instance if one does not exist', () => {
    componentResolver.setComponentRef(new MockComponentRef());
    spyOn(service, 'isActive').and.callFake(() => false);
    spyOn(componentResolver, 'resolveComponent').and.callFake(() => new MockComponentRef());
    service.display({});
    expect(componentResolver.resolveComponent).toHaveBeenCalled();
  });
  it('should destroy a ComponentRef on close()', () => {
    componentResolver.setComponentRef(new MockComponentRef());
    spyOn(MockComponentRef.prototype, 'destroy');
    service.display('1');
    service.close('1');
    expect(MockComponentRef.prototype.destroy).toHaveBeenCalled();
  });
  it('should class all ComponentRef instances on closeAll()', () => {
    componentResolver.setComponentRef(new MockComponentRef());
    spyOn(MockComponentRef.prototype, 'destroy');
    service.display('1');
    service.display('2');
    service.closeAll();
    expect(MockComponentRef.prototype.destroy).toHaveBeenCalledTimes(2);
  });
  it('should return the proper isActive() status', () => {
    componentResolver.setComponentRef(new MockComponentRef());
    service.display('1');
    expect(service.isActive('1')).toBeTrue();
    service.close('1');
    expect(service.isActive('1')).toBeFalse();
  });
});
