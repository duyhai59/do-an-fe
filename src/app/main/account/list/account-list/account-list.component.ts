import { CenterService } from './../../../center/center.service';
import { AccountService } from "./../account.service";
import { NgxSpinnerService } from "ngx-spinner";
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BaseResponse } from "app/shares/models/base-response";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { ColumnMode } from "@swimlane/ngx-datatable";
import * as snippet from "app/main/forms/form-layout/form-layout.snippetcode";

@Component({
  selector: "app-account-list",
  templateUrl: "./account-list.component.html",
  styleUrls: ["./account-list.component.scss"],
})
export class AccountListComponent implements OnInit {
  public _snippetCodeMultiple = snippet.snippetCodeMultiple;
  // public _snippetCodeInlineEditing = snippettable.snippetCodeInlineEditing;
  public contentHeader: object;
  spinnerName = "sp1";
  spinnerType = "ball-spin-clockwise";
  userForm: FormGroup;
  base: BaseResponse;
  userList = [];
  public ColumnMode = ColumnMode;
  public perPage = 5;
  public currentPage = 1;
  public totalFb = 0;
  public maxPage = 1;

  constructor(
    private spinner: NgxSpinnerService,
    private userService: AccountService,
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef,
    private router: Router,
    private centerService: CenterService
  ) {}

  ngOnInit(): void {
    this.searchForm();
    this.getListCenter();
    this.doSearch();
    (document.querySelector("#ngx-datatable-inline-editing .card-header") as HTMLDivElement).style.display='none';
  }

  async doShow() {
    this.doSearch();
  }

  searchForm() {
    this.userForm = this.formBuilder.group({
      userName: '',
      type: '',
      status: '',
      center: ''
    });
  }

  doSearch() {
    this.spinner.show(this.spinnerName);
    var requestParams = {
      method: "GET",
      userName: this.userForm.value.searchUserName
        ? this.userForm.value.searchUserName.trim()
        : "",
      center: this.userForm.value.center ? this.userForm.value.center : "",
      type: this.userForm.value.type ? this.userForm.value.type : "",
      status: this.userForm.value.searchState
        ? this.userForm.value.searchState.trim()
        : "",
    };
    this.userService.searchUserInfo(requestParams).then((data) => {
      this.base = data;
      if (this.base.code === 0) {
        this.userList = JSON.parse(JSON.stringify(this.base.content));
        this.totalFb = JSON.parse(JSON.stringify(this.base.content)).total;
        this.maxPage = Math.ceil(this.totalFb / this.perPage);
        if (this.maxPage < this.currentPage) {
          this.currentPage = 1;
        }
      } else {
        this.userList = [];
        this.totalFb = 0;
        Swal.fire({
          icon: "error",
          title: "Không tìm thấy tài khoản nào!",
          confirmButtonText: "OK",
        });
      }
    });
    this.spinner.hide(this.spinnerName);
  }

  deleteUser(userId: any, loginId: any) {
    Swal.fire({
      icon: "question",
      title: "Bạn có muốn xoá không?",
      showDenyButton: true,
      confirmButtonText: "Có",
      denyButtonText: "Không",
    }).then((result) => {
      if (result.isConfirmed) {
        var params = { method: "DELETE" };
        this.userService.deleteUserInfo(params, userId).then((data) => {
          // this.delete(loginId);
          this.doShow();
          this.base = data;
          if (this.base.code === 0) {
            Swal.fire({
              icon: "success",
              title: "Thành công",
            }).then((result) => {
              this.doShow();
            });
          } else {
            Swal.fire({
              icon: "error",
              text: this.base.errorMessages,
            });
          }
        });
      }
    });
    this.ref.detectChanges();
  }

  delete(loginId: any) {
    var params = { method: "DELETE" };
    this.userService.deleteUser(params, loginId).then((data) => {
      this.base = data;
      if (this.base.code === 0) {
      }
    });
  }

  edit(userId: any, loginId: any) {
    window.localStorage.removeItem("accountId");
    window.localStorage.setItem("accountId", userId);
    window.localStorage.removeItem("loginIdEdit");
    window.localStorage.setItem("loginIdEdit", loginId);
    this.spinner.show(this.spinnerName);
    this.router.navigate(["/configuration/account-edit"]);
  }

  public rows: any;

  onTableDataChange(event: any) {
    this.currentPage = event;
    this.doSearch();
  }

  showSearch: boolean = false;

  checked = false;

  showSearchForm() {
    this.showSearch = !this.showSearch;
  }

  notFound="Không có bản ghi nào được tìm thấy";

  AcTypeList = [
    { label: 'Quản trị viên', value: '1' },
    { label: 'Biên tập viên', value: '2' },
    { label: 'Điện thoại viên', value: '3' },
    { label: 'Cửa hàng và các phòng ban', value: '4' },
    { label: 'Xem công văn', value: '5' }
  ];

  centerList:any;
  getListCenter(){
    this.centerService.getAll({method:'GET'}).then(data=>{
      if(data.code==0){
        this.centerList = JSON.parse(JSON.stringify(data.content));
      }
      else{
        this.centerList = [];
      }
    }).catch(e=>{
      this.centerList = [];
    });
  }

  status = [
    { label: 'Đang hoạt động', value: 'ACTIVE' },
    { label: 'Khoá', value: 'DEACTIVE' }
  ]

  reloadSearch(message: boolean) {
    this.ngOnInit();
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
  }

  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
    console.log("tất cả các id", this.setOfCheckedId);
  }

  deleteUsers(){
    if(this.setOfCheckedId.size == 0){
      Swal.fire({
        title: "Không có bản ghi nào được chọn",
        icon: "warning"
      })
    }
    else{
      const imageList = this.userList.filter(data => this.setOfCheckedId.has(data.accountId));
      console.log("");
      const param = {
        accounts: imageList
      }
      this.userService.deleteUsers(param).then(data=>{
        this.base = data;
        if(this.base.code == 0){
          Swal.fire({
            title: "Thay đổi thành công",
            icon: "success"
          })
          this.doSearch();
        }
        else{
          Swal.fire({
            title: "Tài khoản đã tồn tại",
            icon: "error"
          })
        }
      })
    }
  }
}
