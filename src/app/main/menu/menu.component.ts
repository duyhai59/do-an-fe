import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { MenuService } from './menu.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  showSearch: boolean = false;



  showSearchForm() {
    this.showSearch = !this.showSearch
  }

  files: TreeNode[];

  cols: any[];

  constructor(private primengConfig: PrimeNGConfig,
    private menuService: MenuService,
    private toastr: ToastrService,
    private notification: NzNotificationService) { }
  hello = 'hello';
  ngOnInit() {
    this.getAllMenu();

    // this.files = [];
    // for (let i = 0; i < 50; i++) {
    //   let node = {
    //     leaf: true,
    //     data: {

    //       name: 'Item ' + i,
    //       size: Math.floor(Math.random() * 1000) + 1 + 'kb',
    //       type: 'Type ' + i
    //     },
    //     children: [
    //       {
    //         expanded: true,
    //         data: {
    //           name: 'Item ' + i + ' - 0',
    //           size: Math.floor(Math.random() * 1000) + 1 + 'kb',
    //           type: 'Type ' + i
    //         },
    //         children: [
    //           {

    //             data: {
    //               name: 'Item ' + i + ' - 0',
    //               size: Math.floor(Math.random() * 1000) + 1 + 'kb',
    //               type: 'Type ' + i
    //             }
    //           }]
    //       }
    //     ]
    //   };

    //   this.files.push(node);
    // }


  }

  getAllMenu() {
    this.menuService.getAllMenu({
      method: 'GET'
    }).then(
      res => {
        console.log(res);
        if (res.code == 0) {
          this.listOfData = JSON.parse(JSON.stringify(res.content));

        }
      }

    )
  }

  loading = false;
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: any = [];
  listOfData: any = [];
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: any): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  show() {
    this.notification.create(
      'error',
      'Có lỗi xảy ra',
      ''
    );

    this.toastr.error('Có lỗi xảy ra');
  }

  sortFn = (a: any, b: any) => a.cName.localeCompare(b.cName);
}
