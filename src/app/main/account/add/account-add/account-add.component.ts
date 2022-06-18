import { CenterService } from './../../../center/center.service';
import { AuthRoleService } from './../../../administration/auth-role/auth-role-service';
import { AccountService } from './../../list/account.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseResponse } from './../../../../shares/models/base-response';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountAddComponent implements OnInit {

  userInfo: [];
  base: BaseResponse;
  roleList = [];

  @ViewChild('loginId') userNameElement: ElementRef;
  @ViewChild('accountName') fullNameElement: ElementRef;
  @ViewChild('password') passwordElement: ElementRef;
  @ViewChild('email') emailElement: ElementRef;
  @ViewChild('phone') addressElement: ElementRef;
  @ViewChild('role') roleElement: ElementRef;
  @ViewChild('accountType') accountTypeElement: ElementRef;
  @ViewChild('accountStatus') stateElement: ElementRef;
  @ViewChild('departmentId') departmentIdElement: ElementRef;
  @ViewChild('employee') employeeElement: ElementRef;
  @ViewChild('gender') genderElement: ElementRef;
  @ViewChild('center') centerElement: ElementRef;
  

  userNameMessage="";
  fullNameMessage="";
  passwordMessage="";
  emailMessage="";
  addressMessage="";
  roleMessage="";
  typeMessage="";
  stateMessage="";
  positionMessage="";
  departmentMessage="";
  employeeMessage="";
  phoneMessage="";
  genderMessage="";
  centerMessage=""

  notFound="Không có bản ghi nào được tìm thấy";

  typeList = [
    { label: 'Quản trị viên', value: '1' },
    { label: 'Biên tập viên', value: '2' },
    { label: 'Điện thoại viên', value: '3' },
    { label: 'Cửa hàng và các phòng ban', value: '4' },
    { label: 'Xem công văn', value: '5' }
  ];

  statusList = [
    { label: 'Đang hoạt động', value: 'ACTIVE' },
    { label: 'Khoá', value: 'DEACTIVE' }
  ]

  spinnerName="sp1";
  spinnerType="ball-spin-clockwise";
  constructor(private userService: AccountService, private formBuilder: FormBuilder,private router: Router,
    private spinner:NgxSpinnerService,private ref: ChangeDetectorRef, private role: AuthRoleService,
    private notification: NzNotificationService, private centerService: CenterService
  ) { }

  // log(value: { label: string; value: string}): void {
  //   console.log(value);
  // }

  ngOnInit(): void {
    this.createForm();
    this.spinner.hide(this.spinnerName);
    this.getListCenter();
    // this.getListRole();
    this.showAndHide();
  }

  formAddUser: FormGroup

  getListRole() {
    this.role.getAllAuthRole("").then(data => {
      if(data.code == 0){
        this.roleList = JSON.parse(JSON.stringify(data.content));
      }
    });
  }

  listCenter:any;
  getListCenter(){
    this.centerService.getAll({method:'GET'}).then(data=>{
      if(data.code==0){
        this.listCenter = JSON.parse(JSON.stringify(data.content));
      }
      else{
        this.listCenter = [];
      }
    }).catch(e=>{
      this.listCenter = [];
    });
  }

  createForm(){
    this.formAddUser = this.formBuilder.group({
      loginId: '',
      accountName: '',
      password: '',
      email: '',
      phone: '',
      role: '',
      accountType: '',
      accountStatus: '',
      address: '',
      gender: '',
      center: ''
    })
  }

  addUser(){
    if(this.validate()) {
      this.spinner.show(this.spinnerName);
      var param = {
        loginId: this.formAddUser.value.loginId,
        accountName: this.formAddUser.value.accountName,
        password: this.formAddUser.value.password,
        email: this.formAddUser.value.email,
        phone: this.formAddUser.value.phone,
        accountStatus: this.formAddUser.value.accountStatus,
        accountType: this.formAddUser.value.accountType,
        // role: this.formAddUser.value.role,
        address: this.formAddUser.value.address,
        gender: this.formAddUser.value.gender,
        center: this.formAddUser.value.center
      };
      this.userService.addUserInfo(param).then(data => {
        this.base = data;
        this.spinner.hide(this.spinnerName)
        if(this.base.code === 0){
          this.reset();
          // this.addAuthnAccount(param);
          this.createNotification("success");
          this.reload(true);
          this.isVisible = false;
        }
        else if(this.base.code == 100){
          Swal.fire({
            title: "Tài khoản hoặc email đã tồn tại",
            icon: "error"
          })
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

  autheAccounCheck:boolean
  addAuthnAccount(param){
    this.userService.addUserInfo(param).then(data => {
      this.base = data;
      if(this.base.code === 0){
        this.spinner.hide(this.spinnerName)
        Swal.fire({
          title: "Thành công",
          icon: "success"
        }).then((result)=> (
          this.router.navigate(["/configuration/account"]
        )))
      }
      else{
        this.spinner.hide(this.spinnerName)
        Swal.fire({
          title: "Đã xảy ra sự cố, vui lòng kiểm tra và thử lại",
          icon: "error"
        })
      }
    })
  }

  clearUserNameMessage() {
    this.userNameMessage = "";
  }
  clearFullNameMessage() {
    this.fullNameMessage = "";
  }
  clearPasswordMessage() {
    this.passwordMessage = "";
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
  clearPositionMessage() {
    this.positionMessage = "";
  }
  clearDepartmentMessage(){
    this.departmentMessage = "";
  }
  clearEmployeeMessage(){
    this.employeeMessage = "";
  }
  clearPhoneMessage(){
    this.phoneMessage = "";
  }
  clearCenterMessage(){
    this.centerMessage = "";
  }

  validate() {
    var isValid = true;
    var isFocus = false;
    var regexPassword = new RegExp ('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$');
    var regexEmail = new RegExp('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')
    if(this.formAddUser.value.accountType == null || this.formAddUser.value.accountType == '') {
      this.typeMessage="Bạn chưa chọn loại tài khoản";
      // this.accountTypeElement.nativeElement.focus();
      isFocus = true;
      isValid = false;
    }
    if(this.formAddUser.value.center == null || this.formAddUser.value.center == ''){
      this.centerMessage="Bạn chưa chọn khu vực"
      isFocus = true;
      isValid = false;
    }
    if(this.formAddUser.value.loginId == null || this.formAddUser.value.loginId == '') {
      this.userNameMessage="Bạn chưa nhập tên đăng nhập";
      this.userNameElement.nativeElement.focus();
      isFocus = true;
      isValid = false;
    }
    if(this.formAddUser.value.accountName == null || this.formAddUser.value.accountName == '') {
      this.fullNameMessage="Bạn chưa nhập tên người dùng";
      this.fullNameElement.nativeElement.focus();
      isFocus = true;
      isValid = false;
    }
    if(this.formAddUser.value.password == null || this.formAddUser.value.password == '') {
      this.passwordMessage="Bạn chưa nhập password";
      this.passwordElement.nativeElement.focus();
      isFocus = true;
      isValid = false;
    }
    else if(!regexPassword.test(this.formAddUser.value.password)) {
      this.passwordMessage="Mật khẩu cần: bao gồm cả ký tự viết thường và viết hoa, có ít nhất 8 ký tự và dài một ký tự số hoặc ký hiệu";
      this.passwordElement.nativeElement.focus();
      isFocus = true;
      isValid = false;
    }
    if(this.formAddUser.value.email == null || this.formAddUser.value.email == '') {
      this.emailMessage="Bạn chưa nhập email";
      this.emailElement.nativeElement.focus();
      isFocus = true;
      isValid = false;
    }
    else if(!regexEmail.test(this.formAddUser.value.email)) {
      this.emailMessage="Sai định dạng của email";
      this.emailElement.nativeElement.focus();
      isFocus = true;
      isValid = false;
    }
    // if(this.formAddUser.value.role == null || this.formAddUser.value.role == '') {
    //   this.roleMessage="Bạn chưa chọn quyền tài khoản";
    //   isFocus = true;
    //   isValid = false;
    // }

    if(this.formAddUser.value.accountStatus == null || this.formAddUser.value.accountStatus == '') {
      this.stateMessage="Bạn chưa chọn trạng thái tài khoản";
      // this.stateElement.nativeElement.focus();
      isFocus = true;
      isValid = false;
    }
    this.spinner.hide(this.spinnerName);
    this.ref.detectChanges();
    return isValid;
  }
  
  status: boolean = false;
  showAndHide() {
    this.status = !this.status; 
  }

  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.addUser();
  }

  handleCancel(): void {
    this.isVisible = false;
    this.reset();
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
    this.formAddUser.patchValue({
      loginId: '',
      accountName: '',
      password: '',
      email: '',
      phone: '',
      role: '',
      accountType: '',
      accountStatus: '',
      address: '',
      gender: '',
      center: ''
    })
  }

  @Output() 
  newItemEvent = new EventEmitter<any>();
  reload(value: boolean) {
    this.newItemEvent.emit(value);
  }
}
