import { AccountService } from './../../list/account.service';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import Swal from 'sweetalert2';
import { BaseResponse } from 'app/shares/models/base-response';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AuthRoleService } from 'app/main/administration/auth-role/auth-role-service';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountEditComponent implements OnInit {
  userEditForm: FormGroup;
  userId:any;
  loginId:any;
  userData:any;
  response:BaseResponse;
  roleList = [];

  @ViewChild('loginId') userNameElement: ElementRef;
  @ViewChild('accountName') fullNameElement: ElementRef;
  @ViewChild('email') emailElement: ElementRef;
  @ViewChild('phone') addressElement: ElementRef;
  @ViewChild('role') roleElement: ElementRef;
  @ViewChild('accountType') typeElement: ElementRef;
  @ViewChild('accountStatus') stateElement: ElementRef;
  @ViewChild('department') departmentElement: ElementRef;
  @ViewChild('employee') employeeElement: ElementRef;

  userNameMessage="";
  fullNameMessage="";
  emailMessage="";
  addressMessage="";
  roleMessage="";
  typeMessage="";
  stateMessage="";
  departmentMessage="";
  employeeMessage="";

  regionDefault="";
  regionList=[];
  subRegionList=[];
  countryList=[];

  spinnerName="sp1";
  spinnerType="ball-spin-clockwise";
  constructor(private userInfo: AccountService,private formBuilder: FormBuilder,private router: Router,
    private spinner:NgxSpinnerService, private ref: ChangeDetectorRef,  private role: AuthRoleService,
    
  ) { }

  ngOnInit(): void {
    this.creteForm();
    this.detailUser();
    this.getListRole();
  }


  creteForm(){
    this.userEditForm = this.formBuilder.group({
      accountId: [''],
      loginId: [''],
      accountName: [''],
      email: [''],
      phone: [''],
      role: [''],
      accountType: [''],
      accountStatus: [''],
      departmentId: [''],
      employeeId: [''],
      modifiedBy: window.localStorage.getItem('loginId')
    })
  }

  getListRole() {
    this.role.getAllAuthRole("").then(data => {
      if(data.code == 0){
        this.roleList = JSON.parse(JSON.stringify(data.content));
      }
    });
  }

  updateUser() {
    if(this.Validate()){
      this.spinner.show(this.spinnerName);
      var param = this.userEditForm.value;
      this.userInfo.editUser(param, this.loginId).then(data=>{
        this.response = data;
        this.spinner.hide(this.spinnerName);
        if(this.response.code == 0){
          this.updateAuthenAccount(param)
        }
        else if(this.response.code == 59){
          Swal.fire({
            title: "Tài khoản đã tồn tại",
            icon: "error"
          })
        }
        else{
          Swal.fire({
            title: "Đã xảy ra sự cố, vui lòng kiểm tra và thử lại",
            icon: "error"
          })
        }
      })
    }
  }

  updateAuthenAccount(param:any){
    this.userInfo.editUserInfo(param).then(data=>{
      this.response = data;
      this.spinner.hide(this.spinnerName);
      if(this.response.code == 0){
        Swal.fire({
          title: "Thay đổi thành công",
          icon: "success"
        }).then(()=>this.router.navigate(["/configuration/account"]))
      }
      else if(this.response.code == 59){
        Swal.fire({
          title: "Tài khoản đã tồn tại",
          icon: "error"
        })
      }
    })
  }

  detailUser(){
    this.spinner.show(this.spinnerName);
    var params={method:"GET"};
    this.userId = window.localStorage.getItem("accountId");
    this.loginId = window.localStorage.getItem("loginIdEdit");
    this.userInfo.detail(params,this.loginId).then(data=>{
      this.response = data;
      if(this.response.code == 0){
        this.userData = JSON.parse(JSON.stringify(this.response.content));
      }
      this.fill(this.userData);
    });
    window.localStorage.removeItem("accountId");
    window.localStorage.removeItem("loginIdEdit");
    this.spinner.hide(this.spinnerName);
  }

  fill(data:any){
    this.userEditForm.patchValue({
      accountId: this.userId,
      loginId: data.loginId,
      accountName: data.accountName,
      email: data.email,
      phone: data.phone,
      accountType: 2,
      accountStatus: data.accountStatus,
      role: data.role,
      departmentId: data.departmentId,
      // employeeId: data.employeeId
    });
    // this.getListEmployee();
    this.ref.detectChanges();
  }

  Validate() {
    var isValid = true;
    var isFocus = false;
    var regexPassword = new RegExp ('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$');
    var regexEmail = new RegExp('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}');
    if(this.userEditForm.value.loginId == null || this.userEditForm.value.loginId == '') {
      this.userNameMessage="Bạn chưa nhập tên đăng nhập";
      this.userNameElement.nativeElement.focus();
      isFocus = true;
      isValid = false;
    }
    if(this.userEditForm.value.accountName == null || this.userEditForm.value.accountName == '') {
      this.fullNameMessage="Bạn chưa nhập tên người dùng";
      this.fullNameElement.nativeElement.focus();
      isFocus = true;
      isValid = false;
    }
    if(this.userEditForm.value.email == null || this.userEditForm.value.email == '') {
      this.emailMessage="Bạn chưa nhập email";
      this.emailElement.nativeElement.focus();
      isFocus = true;
      isValid = false;
    }
    if(!regexEmail.test(this.userEditForm.value.email)) {
      this.emailMessage="Sai định dạng của email";
      this.emailElement.nativeElement.focus();
      isFocus = true;
      isValid = false;
    }
    if(this.userEditForm.value.role == null || this.userEditForm.value.role == '') {
      this.roleMessage="Bạn chưa chọn quyền tài khoản";
      isFocus = true;
      isValid = false;
    }
    if(this.userEditForm.value.departmentId == null || this.userEditForm.value.departmentId == '') {
      this.departmentMessage="Bạn chưa chọn phòng ban";
      isFocus = true;
      isValid = false;
    }
    // if(this.userEditForm.value.employeeId == null || this.userEditForm.value.employeeId == '') {
    //   this.employeeMessage="Bạn chưa chọn nhân viên";
    //   this.employeeElement.nativeElement.focus();
    //   isFocus = true;
    //   isValid = false;
    // }
    if(this.userEditForm.value.accountType == null || this.userEditForm.value.accountType == '') {
      this.typeMessage="Bạn chưa chọn loại tài khoản";
      this.typeElement.nativeElement.focus();
      isFocus = true;
      isValid = false;
    }
    if(this.userEditForm.value.accountStatus == null || this.userEditForm.value.accountStatus == '') {
      this.stateMessage="Bạn chưa chọn trạng thái tài khoản";
      this.stateElement.nativeElement.focus();
      isFocus = true;
      isValid = false;
    }
    this.ref.detectChanges();
    return isValid;
  }

  dropdownSettings:IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true,
  };

  clearUserNameMessage() {
    this.userNameMessage = "";
  }
  clearFullNameMessage() {
    this.fullNameMessage = "";
  }
  clearEmailMessage() {
    this.emailMessage = "";
  }
  clearAddressMessage() {
    this.addressMessage = "";
  }
  clearRoleMessage() {
    this.roleMessage = "";
  }
  clearTypeMessage() {
    this.typeMessage = "";
  }
  clearStateMessage() {
    this.stateMessage = "";
  }
  clearDepartmentMessage(){
    this.departmentMessage = "";
  }
  clearEmployeeMessage(){
    this.employeeMessage="";
  }

  back(){
    this.router.navigate(["/configuration/account"]);
  }

}
