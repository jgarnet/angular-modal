import { MockComponentFactory } from './mock-component-factory';

describe('MockComponentFactory', () => {
  it('should create an instance', () => {
    expect(new MockComponentFactory()).toBeTruthy();
  });
});
