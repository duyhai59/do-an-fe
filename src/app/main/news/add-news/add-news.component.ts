
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { BaseResponse } from 'app/shares/models/base-response';
import { AccountService } from 'app/main/account/list/account.service';
import { AuthRoleService } from 'app/main/administration/auth-role/auth-role-service';
import { AddNewsService } from './add-news.service';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddNewsComponent implements OnInit {
  public editorValue: string = '';
  base: BaseResponse;

  spinnerName="sp1";
  spinnerType="ball-spin-clockwise";
  constructor(private userService: AccountService, private formBuilder: FormBuilder,private router: Router,
    private spinner:NgxSpinnerService,private ref: ChangeDetectorRef, private role: AuthRoleService,
    private addNewsService: AddNewsService
  ) { }

  relatedInfo = [
    {
      text: 'Lấy danh sách bản tin liên quan',
      imgPath: 'assets\\images\\card-img\\news.png'
    },
    {
      text: 'Lấy danh sách công văn liên quan',
      imgPath: 'assets\\images\\card-img\\document.png'
    },
    {
      text: 'Lấy danh sách thông báo liên quan',
      imgPath: 'assets\\images\\card-img\\notification.png'
    },
    {
      text: 'Lấy danh sách khuyến mại liên quan',
      imgPath: 'assets\\images\\card-img\\promotion.png'
    }
  ];

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

  expandKeys = ['1', '10'];

  ngOnInit(): void {
    this.createForm();
    this.spinner.hide(this.spinnerName);
  }

  newsAddingForm: FormGroup

  createForm(){
    this.newsAddingForm = this.formBuilder.group({
      title: '',
      newsViewType: '1',
      newsGroup: '',
      publicStartDate: '',
      newsType: '',
      specialNote: '1',
      startDate: '',
      endDate: '',
      allowComment: '',
      searchPriority: '',
      isShowOnHomePage1: [{value: true, disabled: true}],
      isHotNews1: [{value: false, disabled: true}],
      note: '',
      description: '',
      blocks: this.formBuilder.array([this.formBuilder.group({
        title: '',
        content: ''
      })]),
      header: '',
      footer: ''
    })
  }

  get blocks(){
    return this.newsAddingForm.controls["blocks"] as FormArray;
  }
  
  showMoreBlocks(){
    this.blocks.push(this.formBuilder.group({
      title: '',
      content: ''
   }));
    console.log(this.newsAddingForm.value.dates)
  }

  hideMoreBlocks(blockIndex){
    this.blocks.removeAt(blockIndex);
    console.log(this.newsAddingForm.value.dates)
  }

  addNews(){
    let blockArray = [];
    for (let i =0;i< this.blocks.length;i++) {
      const block = this.blocks.at(i).value;
      blockArray.push(block);
  }
    let params = {
      title: this.newsAddingForm.value.title,
      newsViewType: this.newsAddingForm.value.newsViewType,
      newsGroup: this.newsAddingForm.value.newsGroup,
      publicStartDate: this.newsAddingForm.value.publicStartDate,
      newsType: this.newsAddingForm.value.newsType,
      specialNote: this.newsAddingForm.value.specialNote,
      startOfSpecialNote: this.newsAddingForm.value.startOfSpecialNote,
      endOfSpecialNote: this.newsAddingForm.value.endOfSpecialNote,
      allowComment: this.newsAddingForm.value.allowComment ? 1 : 0,
      searchPriority: this.newsAddingForm.value.searchPriority ? 1 : 0,
      isDisplayOnHomepage: this.newsAddingForm.value.isShowOnHomePage1 ? 1 : 0,
      isHotNews: this.newsAddingForm.value.isHotNews1 ? 1 : 0,
      note: this.newsAddingForm.value.note,
      subContent: this.newsAddingForm.value.description,
      newExts: blockArray
    }
    console.log(params)
    this.addNewsService.addNews(params).then(res => {
      if(res.code == 0){
        console.log("add successfully")
      } else {
        console.log("add fail")
      }
    }).catch(e => {
      console.log("Error: " + e)
    })
  }

  stepIndex = 0;

  onIndexChange(event: number): void {
    this.stepIndex = event;
  }
}
