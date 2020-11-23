import {Renderer2, RendererFactory2, RendererType2} from '@angular/core';
import {MockRenderer2} from './mock-renderer2';

export class MockRendererFactory2 extends RendererFactory2 {
  begin(): void {
  }

  createRenderer(hostElement: any, type: RendererType2 | null): Renderer2 {
    return new MockRenderer2();
  }

  end(): void {
  }

  whenRenderingDone(): Promise<any> {
    return Promise.resolve(undefined);
  }
}
