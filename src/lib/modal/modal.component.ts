import {Component, ComponentRef, ElementRef, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ModalOptions} from '../modal-options';
import {ComponentResolverService} from '../component-resolver.service';
import {FadeGrow} from '../animations/animation-fadeGrow';

@Component({
  selector: 'ngm-modal-instance',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  animations: [FadeGrow.container, FadeGrow.modal]
})
export class ModalComponent implements OnInit {
  @Input() component: Component;
  @Input() options: ModalOptions;
  @Input() ref: ComponentRef<Component>;
  @ViewChild('content', {
    static: true,
    read: ViewContainerRef
  }) viewContainerRef: ViewContainerRef;
  @ViewChild('modal') modal: ElementRef;
  customStyles: {};
  zIndex: number;
  dismissibleMask: boolean;
  canClose: boolean;

  constructor(private componentResolverService: ComponentResolverService) { }

  ngOnInit(): void {
    this.componentResolverService.resolveComponent(this.viewContainerRef, this.component, this.options.data);
    this.populateOptions();
  }

  populateOptions(): void {
    this.customStyles = this.getDefaultOption('styles', {});
    this.zIndex = this.getDefaultOption('zIndex', 0);
    this.dismissibleMask = this.getDefaultOption('dismissibleMask', true);
    this.canClose = this.getDefaultOption('canClose', true);
  }

  dismissMask(event): void {
    if (!event.target.classList.contains('ngm-modal-container') || this.dismissibleMask === false) {
      return;
    }
    this.close();
  }

  close(): void {
    this.ref.destroy();
  }

  private getDefaultOption<T>(key: string, value: any): any {
    return (this.options[key] !== null && this.options[key] !== undefined) ? this.options[key] as T : value;
  }

}
