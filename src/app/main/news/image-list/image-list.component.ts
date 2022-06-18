import { resolveSanitizationFn } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { ImageListService } from './image-list.service';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<any> | null;
}

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent implements OnInit {
  imgSearchingForm: FormGroup
  listOfColumns: ColumnItem[] = [
    {
      name: 'STT',
      sortOrder: null,
      sortFn: null
      // sortFn: (a: any, b: any) => b.id - a.id,
    },
    {
      name: 'ID',
      sortOrder: null,
      sortFn: null
      // sortFn: (a: any, b: any) => a.id - b.id,
    },
    {
      name: 'Tên ảnh',
      // sortFn: (a: any, b: any) => a.name.localeCompare(b.name),
      sortFn: null,
      sortOrder: null,
    }
  ];
  constructor(private formBuilder: FormBuilder, private imageListService: ImageListService) { }

  checked = false;
  loading = false;
  indeterminate = false;
  listOfData: any[] = [];
  listOfCurrentPageData: readonly any[] = [];
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly any[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(({ disabled }) => !disabled);
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData
      .filter(({ disabled }) => !disabled)
      .forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  sendRequest(): void {
    this.loading = true;
    const imageList = this.listOfData.filter(data => this.setOfCheckedId.has(data.id));
    console.log(imageList);
    const params = {
      imageList: imageList
    };
    this.imageListService.deleteImage(params).then(res => {
      if(res.code == 0) {
        console.log("delete successfully");
        this.getImageList();
      } else {
        console.log("delete failed");
      }
    })
    setTimeout(() => {
      this.setOfCheckedId.clear();
      this.refreshCheckedStatus();
      this.loading = false;
    }, 1000);
  }

  ngOnInit(): void {
    this.imgSearchingForm = this.formBuilder.group({
      id: '',
      name: '',
      albumId: ''
    })
    this.getImageList();
    // this.listOfData = [
    //   {
    //     id: 55358,
    //     name: 'ketoan.jpg',
    //     path: 'assets/images/news-img/12189065_527502110749732_3576020883888001235_n.jpg'
    //   },
    //   {
    //     id: 55357,
    //     name: 'bao-hiem-bao-viet-an-gia-3.jpg',
    //     path: 'assets/images/news-img/abc.jpg'
    //   }
    // ]
    
  }

  getImageList(){
    const params = {
      method: 'GET',
      id: this.imgSearchingForm.value.id,
      name: this.imgSearchingForm.value.name,
      albumId: this.imgSearchingForm.value.albumId
    }
    console.log("params", params)
    this.imageListService.getImageList(params).then(res => {
      console.log("data from backend", res);
      this.listOfData = res.content;
    })
  }

  clickedImagePath = "";
  HighlightRow : Number;  
  clickOnRow(index){
    this.HighlightRow = index; 
    console.log("image's path clicked on is: ", this.listOfData[index].path) 
    this.clickedImagePath = this.listOfData[index].path;
  }

  titleImage = ""
  addTitleImage(){
    this.titleImage = this.clickedImagePath;
  }

  removeTitleImage(){
    this.titleImage = ""
  }

  // tree-select
  expandKeys = ['1', '10'];
  value?: string;
  nodes = [
    {
      title: 'parent 1',
      key: '1',
      children: [
        {
          title: 'parent 1-0',
          key: '10',
          isLeaf: true
        },
        {
          title: 'parent 1-1',
          key: '11',
          isLeaf: true
        },
      ],
      
    },
    {
      title: 'parent 2',
      key: '2',
      children: [
        {
          title: 'parent 1-0',
          key: '20',
          isLeaf: true
        },
        {
          title: 'parent 1-1',
          key: '21',
          isLeaf: true,
        },
      ],
    }
  ];

  onChange($event: string): void {
    console.log($event);
  }
}
