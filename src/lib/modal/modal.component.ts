import {Component, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {ModalOptions} from '../modal-options';
import {ComponentResolverService} from '../component-resolver.service';

@Component({
  selector: 'ngm-modal-instance',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() component: Component;
  @Input() options: ModalOptions;
  @Input() ref: ComponentRef<Component>;
  @Input() customStyles: {};
  @ViewChild('content', {
    static: true,
    read: ViewContainerRef
  }) viewContainerRef: ViewContainerRef;

  constructor(private componentResolverService: ComponentResolverService) { }

  ngOnInit(): void {
    this.componentResolverService.resolveComponent(this.viewContainerRef, this.component, this.options.data);
    this.customStyles = this.getDefaultOption('styles', {});
  }

  processClick(event): void {
    // only close the modal-container if we clicked outside the modal
    if (!event.target.classList.contains('ngm-modal-container')) {
      return;
    }
    if (this.getDefaultOption<boolean>('dismissibleMask', true) === false) {
      return;
    }
    this.close();
  }

  close(): void {
    this.ref.destroy();
  }

  canClose(): boolean {
    return this.getDefaultOption('canClose', true) === true;
  }

  private getDefaultOption<T>(key: string, value: any): any {
    return (this.options[key] !== null && this.options[key] !== undefined) ? this.options[key] as T : value;
  }

}
