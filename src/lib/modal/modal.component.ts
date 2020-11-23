import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import {ModalService} from '../modal.service';

@Component({
  selector: 'ngm-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @ViewChild('content', {
    static: true,
    read: ViewContainerRef
  }) viewContainerRef: ViewContainerRef;

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    this.modalService.setViewContainerRef(this.viewContainerRef);
  }

}
