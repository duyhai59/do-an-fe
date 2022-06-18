import {NgModule} from '@angular/core';
import {CustomPagingComponent} from './custom-paging.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
// import {NzTableModule} from 'ng-zorro-antd';

@NgModule({
  imports: [
    // FormsModule,
    // CommonModule,
    // NzTableModule
  ],
  declarations: [CustomPagingComponent],
  exports: [CustomPagingComponent]
})
export class PagingModule {
}
