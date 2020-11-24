import {Component, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
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
  @ViewChild('content', {
    static: true,
    read: ViewContainerRef
  }) viewContainerRef: ViewContainerRef;
  customClass: string;

  constructor(private componentResolverService: ComponentResolverService) { }

  ngOnInit(): void {
    this.componentResolverService.resolveComponent(this.viewContainerRef, this.component, this.options.data);
    this.customClass = !!this.options.styleClass ? this.options.styleClass : '';
  }

  processClick(event): void {
    // only close the modal-container if we clicked outside the modal
    if (event.target.getAttribute('id') !== 'modal-container' || this.options.dismissibleMask === false) {
      return;
    }
    this.close();
  }

  close(): void {
    this.ref.destroy();
  }

  canClose(): boolean {
    return this.options.canClose === true;
  }

}
