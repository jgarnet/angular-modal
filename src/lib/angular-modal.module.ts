import {NgModule} from '@angular/core';
import {ModalComponent} from './modal/modal.component';
import {CommonModule} from '@angular/common';
import {ModalService} from './modal.service';

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
export class AngularModalModule {
  // tslint:disable-next-line:typedef
  static forRoot() {
    return {
      ngModule: AngularModalModule,
      providers: [ModalService]
    };
  }
}
