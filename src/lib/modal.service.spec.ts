import {TestBed} from '@angular/core/testing';

import {ModalService} from './modal.service';
import {ComponentResolver} from './component-resolver';
import {MockComponentResolver} from './mock/mock-component-resolver';
import {ComponentResolverService} from './component-resolver.service';
import {MockComponentRef} from './mock/mock-component-ref';
import {ApplicationRef, Renderer2, RendererFactory2} from '@angular/core';
import {MockRendererFactory2} from './mock/mock-renderer-factory2';
import {MockRenderer2} from './mock/mock-renderer2';
import {DOCUMENT} from '@angular/common';
import {ModalComponent} from './modal/modal.component';
import {MockViewContainerRef} from './mock/mock-view-container-ref';

describe('AngularModalService', () => {
  let service: ModalService;
  const mockComponentResolver = new MockComponentResolver(null, null);
  const mockDocument = {
    body: {
      style: {
        top: 100
      },
      scrollTop: 100
    },
    documentElement: {
      scrollTop: 100
    }
  };
  const modalMockComponentRef = () => {
    const ref = new MockComponentRef();
    ref.setInstanceRef({
      close: () => {}
    });
    return ref;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ModalService,
        { provide: RendererFactory2, useClass: MockRendererFactory2 },
        { provide: Renderer2, useClass: MockRenderer2 },
        { provide: ComponentResolverService, useValue: mockComponentResolver },
        { provide: DOCUMENT, useValue: mockDocument },
        { provide: ApplicationRef, useValue: {} },
        { provide: 'WINDOW', useValue: window }
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
  it('should call ModalComponent.close() on close()', () => {
    const mockComponentRef = modalMockComponentRef();
    mockComponentResolver.setComponentRef(mockComponentRef);
    spyOn(mockComponentRef.instance, 'close');
    service.display('1');
    service.close('1');
    expect(mockComponentRef.instance.close).toHaveBeenCalled();
  });
  it('should close all ComponentRef instances on closeAll()', () => {
    const mockComponentRef = modalMockComponentRef();
    mockComponentResolver.setComponentRef(mockComponentRef);
    spyOn(mockComponentRef.instance, 'close');
    service.display('1');
    service.display('2');
    service.closeAll();
    expect(mockComponentRef.instance.close).toHaveBeenCalledTimes(2);
  });
  it('should return the proper isActive() status', () => {
    mockComponentResolver.setComponentRef(modalMockComponentRef());
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
    expect(MockRenderer2.prototype.setStyle).toHaveBeenCalledWith(mockDocument.body, 'position', '');
  });
  it('should only unlock the body when the last modal is closed', () => {
    mockComponentResolver.setComponentRef(modalMockComponentRef());
    spyOn(MockRenderer2.prototype, 'setStyle');
    service.display('1');
    service.display('2');
    service.close('1');
    expect(MockRenderer2.prototype.setStyle).not.toHaveBeenCalledWith(mockDocument.body, 'position', '');
    service.close('2');
    expect(MockRenderer2.prototype.setStyle).toHaveBeenCalledWith(mockDocument.body, 'position', '');
  });
  it('should use ApplicationRef when ViewContainerRef is missing', () => {
    const applicationRef = TestBed.inject(ApplicationRef);
    mockComponentResolver.setComponentRef(modalMockComponentRef());
    spyOn(mockComponentResolver, 'resolveComponent').and.callThrough();
    service.setViewContainerRef(null);
    service.display(ModalComponent);
    expect(mockComponentResolver.resolveComponent).toHaveBeenCalledWith(applicationRef, ModalComponent, {
      component: ModalComponent,
      options: {}
    });
  });
  it('should use ViewContainerRef when ApplicationRef is missing', () => {
    const mockViewContainerRef = new MockViewContainerRef();
    mockComponentResolver.setComponentRef(modalMockComponentRef());
    spyOn(mockComponentResolver, 'resolveComponent').and.callThrough();
    service.setViewContainerRef(mockViewContainerRef);
    service.display(ModalComponent);
    expect(mockComponentResolver.resolveComponent).toHaveBeenCalledWith(mockViewContainerRef, ModalComponent, {
      component: ModalComponent,
      options: {}
    });
  });
  it('should use default ModalOptions when no local options are supplied', () => {
    mockComponentResolver.setComponentRef(modalMockComponentRef());
    const mockViewContainerRef = new MockViewContainerRef();
    const options = {
      zIndex: 999,
      dismissibleMask: false
    };
    const expectedOptions = {
      zIndex: 999,
      dismissibleMask: false,
      styles: {
        backgroundColor: '#eee'
      }
    };
    service.setDefaultOptions(options);
    service.setViewContainerRef(mockViewContainerRef);
    spyOn(mockComponentResolver, 'resolveComponent').and.callThrough();
    service.display(ModalComponent, {
      styles: {
        backgroundColor: '#eee'
      }
    });
    expect(mockComponentResolver.resolveComponent).toHaveBeenCalledWith(mockViewContainerRef, ModalComponent, {
      component: ModalComponent,
      options: expectedOptions
    });
  });
  it('should reset the body scroll position when the last Modal is closed', () => {
    const scrollPosition = 500;
    const document = TestBed.inject(DOCUMENT);
    document.body.scrollTop = scrollPosition;
    mockComponentResolver.setComponentRef(modalMockComponentRef());
    spyOn(window, 'scrollTo');
    spyOn(mockComponentResolver, 'resolveComponent').and.callThrough();
    service.display(ModalComponent);
    service.closeAll();
    expect(window.scrollTo).toHaveBeenCalledWith(0, -mockDocument.body.style.top);
    document.body.scrollTop = null;
    document.documentElement.scrollTop = scrollPosition;
    service.display(ModalComponent);
    service.closeAll();
    expect(window.scrollTo).toHaveBeenCalledWith(0, -mockDocument.body.style.top);
  });
});
