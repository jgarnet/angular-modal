import {NgModule} from '@angular/core';
import {ModalComponent} from './modal/modal.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ModalComponent],
  exports: [],
  providers: [
    { provide: 'WINDOW', useValue: window }
  ]
})
export class AngularModalModule { }
