import {TestBed} from '@angular/core/testing';

import {ComponentResolverService} from './component-resolver.service';

describe('ComponentResolverService', () => {
  let service: ComponentResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
