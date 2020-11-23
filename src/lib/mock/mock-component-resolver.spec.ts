import { MockComponentResolver } from './mock-component-resolver';

describe('MockComponentResolver', () => {
  it('should create an instance', () => {
    expect(new MockComponentResolver(null, null)).toBeTruthy();
  });
});
