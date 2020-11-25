import {TestBed} from '@angular/core/testing';

import {ModalService} from './modal.service';
import {ComponentResolver} from './component-resolver';
import {MockComponentResolver} from './mock/mock-component-resolver';
import {ComponentResolverService} from './component-resolver.service';
import {MockComponentRef} from './mock/mock-component-ref';
import {RendererFactory2} from '@angular/core';
import {MockRendererFactory2} from './mock/mock-renderer-factory2';
import {MockRenderer2} from "./mock/mock-renderer2";
import { DOCUMENT } from '@angular/common';

describe('AngularModalService', () => {
  let service: ModalService;
  const mockComponentResolver = new MockComponentResolver(null, null);
  const mockDocument = { body: {} };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: RendererFactory2, useClass: MockRendererFactory2 },
        { provide: ComponentResolverService, useValue: mockComponentResolver },
        { provide: DOCUMENT, useValue: mockDocument }
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
    mockComponentResolver.setComponentRef(new MockComponentRef());
    spyOn(service, 'isActive').and.callFake(() => false);
    spyOn(mockComponentResolver, 'resolveComponent').and.callFake(() => new MockComponentRef());
    service.display({});
    expect(mockComponentResolver.resolveComponent).toHaveBeenCalled();
  });
  it('should destroy a ComponentRef on close()', () => {
    mockComponentResolver.setComponentRef(new MockComponentRef());
    spyOn(MockComponentRef.prototype, 'destroy');
    service.display('1');
    service.close('1');
    expect(MockComponentRef.prototype.destroy).toHaveBeenCalled();
  });
  it('should class all ComponentRef instances on closeAll()', () => {
    mockComponentResolver.setComponentRef(new MockComponentRef());
    spyOn(MockComponentRef.prototype, 'destroy');
    service.display('1');
    service.display('2');
    service.closeAll();
    expect(MockComponentRef.prototype.destroy).toHaveBeenCalledTimes(2);
  });
  it('should return the proper isActive() status', () => {
    mockComponentResolver.setComponentRef(new MockComponentRef());
    service.display('1');
    expect(service.isActive('1')).toBeTrue();
    service.close('1');
    expect(service.isActive('1')).toBeFalse();
  });

  it('should lock the body when a modal is displayed', () => {
    mockComponentResolver.setComponentRef(new MockComponentRef());
    spyOn(MockRenderer2.prototype, 'setStyle');
    service.display('1');
    expect(MockRenderer2.prototype.setStyle).toHaveBeenCalledWith(mockDocument.body, 'position', 'fixed');
  });
  it('should unlock the body when all modals are closed', () => {
    spyOn(MockRenderer2.prototype, 'setStyle');
    service.closeAll();
    expect(MockRenderer2.prototype.setStyle).toHaveBeenCalledWith(mockDocument.body, 'position', 'relative');
  });
  it('should only unlock the body when the last modal is closed', () => {
    mockComponentResolver.setComponentRef(new MockComponentRef());
    spyOn(MockRenderer2.prototype, 'setStyle');
    service.display('1');
    service.display('2');
    service.close('1');
    expect(MockRenderer2.prototype.setStyle).not.toHaveBeenCalledWith(mockDocument.body, 'position', 'relative');
    service.close('2');
    expect(MockRenderer2.prototype.setStyle).toHaveBeenCalledWith(mockDocument.body, 'position', 'relative');
  });
});
