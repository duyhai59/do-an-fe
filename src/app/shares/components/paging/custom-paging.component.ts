import {Component, Input} from '@angular/core';

@Component({
    templateUrl: './custom-paging.component.html',
    selector: 'lng-paging'
  },
)
export class CustomPagingComponent {
  @Input() isLoading: boolean;
  @Input() listOfData: any[];
  @Input() sizeOfData: number;
  @Input() pageIndex: number;
  @Input() pageSize: number;

  constructor() {
  }

  onPageIndexChange() {

  }

  onPageSizeChange() {

  }
}
