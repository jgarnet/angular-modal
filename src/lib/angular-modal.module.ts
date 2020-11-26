import {NgModule} from '@angular/core';
import {ModalComponent} from './modal/modal.component';
import {CommonModule} from '@angular/common';
import { ModalContainerComponent } from './modal-container/modal-container.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ModalComponent, ModalContainerComponent],
  exports: [ModalContainerComponent]
})
export class AngularModalModule { }
