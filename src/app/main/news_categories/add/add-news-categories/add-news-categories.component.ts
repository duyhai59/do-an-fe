import { NewsCategoriesService } from './../../news-categories.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BaseResponse } from './../../../../shares/models/base-response';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-news-categories',
  templateUrl: './add-news-categories.component.html',
  styleUrls: ['./add-news-categories.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddNewsCategoriesComponent implements OnInit {

  formAdd: FormGroup;
  base: BaseResponse;

  viewsOptionMessage="";
  nameCategoriesMessage="";
  linkMessage="";
  parentCategoryMessage="";
  newsTypeMessage="";
  displayViewMessage="";
  maxNewsMessage="";
  displayPositionMessage="";
  showCategoriesMessage="";
  showNewsMessage="";
  showOnHomePageMessage="";
  topMenuMessage="";
  specialCategoryMessage="";

  spinnerName="sp1";
  spinnerType="ball-spin-clockwise";

  constructor(
    private formBuilder: FormBuilder, private notification: NzNotificationService,
    private spinner: NgxSpinnerService, private ref: ChangeDetectorRef,
    private service: NewsCategoriesService) { }

  ngOnInit() {

  }

  createForm(){
    this.formAdd = this.formBuilder.group({
      viewsOption: '',
      nameCategories: '',
      link: '',
      parentCategory: '',
      newsType: '',
      displayView: '',
      maxNews: '',
      displayPosition: 1,
      showCategories: false,
      showNews: false,
      showOnHomePage: false,
      topMenu: false,
      specialCategory: false
    })
  }

  typeList = [
    { label: 'Theo danh mục cha-con', value: '1' },
    { label: 'Theo nhóm', value: '2' },
    { label: 'Theo nội dung', value: '3' },
  ];

  parentCategoryList = [
    { label: 'Không chọn', value: '0' },
    { label: 'Chuyên mục 1', value: '1' },
    { label: 'Chuyên mục 2', value: '2' },
    { label: 'Chuyên mục 3', value: '3' },
  ]

  newsTypeList = [
    { label: 'Tin tức', value: '1' },
    { label: 'Khuyến mãi', value: '2' },
    { label: 'Dịch vụ', value: '3' },
    { label: 'TB/Gói cước', value: '4' },
  ]

  displayViewList = [
    { label: 'Cách 1: Chỉ hiện thị tiêu đề', value: '1' },
    { label: 'Cách 2: Hiển thị tiêu đề và nội dung', value: '2' },
    { label: 'Cách 3: Hiện thị ảnh tiêu đề, tiêu đề và nội dung', value: '3' },
    { label: 'Cách 4: Hiện thị ảnh tiêu đề, tiêu đề và nội dung chia thành 2 cột', value: '4' },
    { label: 'Cách 5: Hiện thị ảnh tiêu đề, tiêu đề và nội dung chia thành 3 cột', value: '5' },
  ]

  isVisible = false;

  showModal(): void {
    this.isVisible = true;
    this.getListCenter();
    this.createForm();
  }

  handleOk(): void {
    this.add();
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  clearViewsOptionMessage() {
    this.viewsOptionMessage = "";
  }
  clearNameCategoriesMessage(){
    this.nameCategoriesMessage = "";
  }
  clearLinkMessage(){
    this.linkMessage = "";
  }
  clearParentCategoryMessage(){
    this.parentCategoryMessage = "";
  }

  validate() {
    var isValid = true;
    var isFocus = false;

    // if(this.formAdd.value.accountType == null || this.formAdd.value.accountType == '') {
    //   this.typeMessage="Bạn chưa chọn loại tài khoản";
    //   isFocus = true;
    //   isValid = false;
    // }
    // if(this.formAdd.value.center == null || this.formAdd.value.center == ''){
    //   this.centerMessage="Bạn chưa chọn khu vực"
    //   isFocus = true;
    //   isValid = false;
    // }
    // if(this.formAdd.value.loginId == null || this.formAdd.value.loginId == '') {
    //   this.userNameMessage="Bạn chưa nhập tên đăng nhập";
    //   this.userNameElement.nativeElement.focus();
    //   isFocus = true;
    //   isValid = false;
    // }
    // if(this.formAdd.value.accountName == null || this.formAdd.value.accountName == '') {
    //   this.fullNameMessage="Bạn chưa nhập tên người dùng";
    //   this.fullNameElement.nativeElement.focus();
    //   isFocus = true;
    //   isValid = false;
    // }
    // if(this.formAdd.value.password == null || this.formAdd.value.password == '') {
    //   this.passwordMessage="Bạn chưa nhập password";
    //   this.passwordElement.nativeElement.focus();
    //   isFocus = true;
    //   isValid = false;
    // }
    // if(this.formAdd.value.email == null || this.formAdd.value.email == '') {
    //   this.emailMessage="Bạn chưa nhập email";
    //   this.emailElement.nativeElement.focus();
    //   isFocus = true;
    //   isValid = false;
    // }
    // if(this.formAdd.value.accountStatus == null || this.formAdd.value.accountStatus == '') {
    //   this.stateMessage="Bạn chưa chọn trạng thái tài khoản";
    //   isFocus = true;
    //   isValid = false;
    // }
    this.spinner.hide(this.spinnerName);
    this.ref.detectChanges();
    return isValid;
  }

  add(){
    if(this.validate()) {
      this.spinner.show(this.spinnerName);
      var param = {
        viewsOption: this.formAdd.value.viewsOption ? this.formAdd.value.viewsOption : '',
        nameCategories: this.formAdd.value.nameCategories.trim(),
        link: this.formAdd.value.link,
        parentCategory: this.formAdd.value.parentCategory ? this.formAdd.value.parentCategory : '',
        newsType: this.formAdd.value.newsType ? this.formAdd.value.newsType : '',
        displayView: this.formAdd.value.displayView ? this.formAdd.value.displayView : '',
        maxNews: this.formAdd.value.maxNews,
        displayPosition: this.formAdd.value.displayPosition,
        showCategories: this.formAdd.value.showCategories ? 1 : 0,
        showNews: this.formAdd.value.showNews ? 1 : 0,
        showOnHomePage: this.formAdd.value.showOnHomePage ? 1 : 0,
        topMenu: this.formAdd.value.topMenu ? 1 : 0,
        specialCategory: this.formAdd.value.specialCategory ? 1 : 0,
      };
      console.log("đây là param", param);
      this.service.add(param).then(data => {
        this.base = data;
        this.spinner.hide(this.spinnerName)
        if(this.base.code === 0){
          this.reset();
          this.createNotification("success");
          this.reload(true);
          this.isVisible = false;
        }
        else{
          Swal.fire({
            title: "Đã xảy ra sự cố, vui lòng kiểm tra và thử lại",
            icon: "error"
          })
        }
      }).catch(function(e){
        console.log("lỗi nhớ",e);
      })
    }
  }

  createNotification(type: string): void {
    if(type=="success"){
      this.notification.create(
        type,
        'Thêm mới thành công',
        ''
      );
    }
    if(type=="error"){
      this.notification.create(
        type,
        'Thêm mới thất bại',
        ''
      );
    }
  }

  reset(){
    this.formAdd.patchValue({
      viewsOption: '',
      nameCategories: '',
      link: '',
      parentCategory: '',
      newsType: '',
      displayView: '',
      maxNews: '',
      displayPosition: 1,
      showCategories: false,
      showNews: false,
      showOnHomePage: false,
      topMenu: false,
      specialCategory: false
    })
  }

  @Output() 
  newItemEvent = new EventEmitter<any>();
  reload(value: boolean) {
    this.newItemEvent.emit(value);
  }

  // expandKeys = ['100', '1001'];

  nodes = [
    // {
    //   title: 'Không chọn',
    //   key: '',
    //   icon: 'folder',
    //   isLeaf: false
    // },
    // {
    //   title: 'parent 1',
    //   key: '',
    //   icon: 'folder-open',
    //   children: [
    //     {
    //       title: 'parent 1-0',
    //       key: '1001',
    //       icon: 'folder-open',
    //       children: [
    //         { 
    //           title: 'leaf 1-0-0', 
    //           key: 6, 
    //           icon: 'folder-open', 
    //           children: [
    //             { title: 'leaf 1-0-0', key: '10011', icon: 'folder', isLeaf: true }
    //           ]
    //         },
    //         { title: 'leaf 1-0-1', key: '10011', icon: 'folder', isLeaf: true, children: [] }
    //       ]
    //     },
    //     {
    //       title: 'parent 1-1',
    //       key: '1002',
    //       icon: 'folder-open',
    //       children: [{ title: 'leaf 1-1-0', key: '10020', icon: 'folder', isLeaf: true }]
    //     }
    //   ]
    // }
  ];

  treeData:any;
  getListCenter(){
    this.service.getAll({method:'GET'}).then(data=>{
      if(data.code==0){
        this.nodes = JSON.parse(JSON.stringify(data.content));
        console.log("đây là tree", this.nodes);
      }
      else{
        this.treeData = [];
      }
    }).catch(e=>{
      this.treeData = [];
    });
  }
}
