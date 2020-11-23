import { NgModule } from '@angular/core';
import { ModalInstanceComponent } from './modal-instance/modal-instance.component';
import {ModalComponent} from './modal/modal.component';



@NgModule({
  declarations: [ModalComponent, ModalInstanceComponent],
  imports: [
  ],
  exports: [ModalComponent]
})
export class AngularModalModule { }
