import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ModalService} from '../modal.service';

@Component({
  selector: 'ngm-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.css']
})
export class ModalContainerComponent implements OnInit {

  @ViewChild('content', {
    static: true,
    read: ViewContainerRef
  }) viewContainerRef: ViewContainerRef;

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    this.modalService.setViewContainerRef(this.viewContainerRef);
  }

}
