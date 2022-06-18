import { id } from '@swimlane/ngx-datatable';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import Swal from 'sweetalert2';
import { BaseResponse } from 'app/shares/models/base-response';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

import { UserService } from 'app/auth/service/user.service';
import { TokenStorage } from 'app/shares/services/token-storage.service';
import { AccountService } from 'app/main/account/list/account.service';
import { AuthRoleService } from 'app/main/administration/auth-role/auth-role-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  userId:any;
  userData:any;
  response:BaseResponse;
  roleList = [];

  userNameMessage="";
  fullNameMessage="";
  // passwordMessage="";
  emailMessage="";
  addressMessage="";
  countryMessage="";
  regionMessage="";
  subRegionMessage="";
  roleMessage="";
  typeMessage="";
  stateMessage="";
  positionMessage="";

  regionDefault="";
  regionList=[];
  subRegionList=[];
  countryList=[];

  @ViewChild('userNameEdit') userNameElement: ElementRef;
  @ViewChild('fullNameEdit') fullNameElement: ElementRef;
  // @ViewChild('passwordEdit') passwordElement: ElementRef;
  @ViewChild('emailEdit') emailElement: ElementRef;
  @ViewChild('address') addressElement: ElementRef;
  @ViewChild('countryEdit') countryElement: ElementRef;
  @ViewChild('regionEdit') regionElement: ElementRef;
  @ViewChild('subRegionEdit') subRegionElement: ElementRef;
  @ViewChild('roleEdit') roleElement: ElementRef;
  @ViewChild('typeEdit') typeElement: ElementRef;
  @ViewChild('stateEdit') stateElement: ElementRef;

  spinnerName="sp1";
  spinnerType="ball-spin-clockwise";
  constructor(private userInfo: AccountService,private formBuilder: FormBuilder,private router: Router,private spinner:NgxSpinnerService,
    private ref: ChangeDetectorRef, private authRoleService: AuthRoleService,
    private tokenStorageService: TokenStorage,
  ) { }

  ngOnInit(): void {
    this.creteForm();
    this.detailUser();
    this.getListRole();
  }

  // getListRole() {
  //   let param={method:'GET'}
  //   this.roleService.getListRoles(param).then(data => {
  //     if(data.code == 0){
  //       this.roleList = JSON.parse(JSON.stringify(data.content));
  //     }
  //   })
  // }

  creteForm(){
    this.profileForm = this.formBuilder.group({
      loginId: [''],
      name: [''],
      email: [''],
      phoneNumber:[''],
      role: [''],
      departmentId: [''],
      accountType: ['']
    })
  }

  fill(data:any){
    this.profileForm.patchValue({
      loginId: data.loginId,
      name: data.accountName,
      email: data.email,
      phoneNumber: data.phone,
      role: data.role,
      departmentId: data.departmentId,
      accountType: 2,
    })
    this.ref.detectChanges();
  }

  loginId:any;
  detailUser(){
    this.spinner.show(this.spinnerName);
    var params={method:"GET"};
    this.loginId = window.localStorage.getItem("loginId");
    this.userInfo.detail(params,this.loginId).then(data=>{
      this.response = data;
      if(this.response.code == 0){
        this.userData = JSON.parse(JSON.stringify(this.response.content));
      }
      this.fill(this.userData);
    });
    this.spinner.hide(this.spinnerName);
  }

  getListRole() {
    this.authRoleService.getAllAuthRole("").then(data => {
      if(data.code == 0){
        this.roleList = JSON.parse(JSON.stringify(data.content));
      }
    });
  }

  goToChangePassword(){
    this.router.navigate(["/pages/authentication/reset-password-v2"]);
  }

}
