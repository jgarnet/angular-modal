import {Component, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ModalOptions} from '../modal-options';
import {ComponentResolverService} from '../component-resolver.service';

@Component({
  selector: 'ngm-modal-instance',
  templateUrl: './modal-instance.component.html',
  styleUrls: ['./modal-instance.component.css']
})
export class ModalInstanceComponent implements OnInit {
  @Input() component: Component;
  @Input() options: ModalOptions;
  @Input() ref: ComponentRef<Component>;
  @ViewChild('content', {
    static: true,
    read: ViewContainerRef
  }) viewContainerRef: ViewContainerRef;

  constructor(private componentResolverService: ComponentResolverService) { }

  ngOnInit(): void {
    this.componentResolverService.resolveComponent(this.viewContainerRef, this.component, this.options.data);
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
}
