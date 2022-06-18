import { AccountService } from './../../../account/list/account.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CoreConfigService } from '@core/services/config.service';
import { BaseResponse } from 'app/shares/models/base-response';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-reset-password-v2',
  templateUrl: './auth-reset-password-v2.component.html',
  styleUrls: ['./auth-reset-password-v2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthResetPasswordV2Component implements OnInit {
 // Public
 public coreConfig: any;
 public currentPassword: boolean;
 public passwordTextType: boolean;
 public confPasswordTextType: boolean;
 public resetPasswordForm: FormGroup;
 public submitted = false;

 response:BaseResponse;

 // Private
 private _unsubscribeAll: Subject<any>;

 /**
  * Constructor
  *
  * @param {CoreConfigService} _coreConfigService
  * @param {FormBuilder} _formBuilder
  */
 constructor(private _coreConfigService: CoreConfigService, private _formBuilder: FormBuilder,
     private service: AccountService, private router: Router) {

   this._unsubscribeAll = new Subject();

   // Configure the layout
   this._coreConfigService.config = {
     layout: {
       navbar: {
         hidden: true
       },
       menu: {
         hidden: true
       },
       footer: {
         hidden: true
       },
       customizer: false,
       enableLocalStorage: false
     }
   };
 }

 // convenience getter for easy access to form fields
 get f() {
   return this.resetPasswordForm.controls;
 }

 toggleCurrentPasswordTextType() {
   this.currentPassword = !this.currentPassword;
 }

 /**
  * Toggle password
  */
 togglePasswordTextType() {
   this.passwordTextType = !this.passwordTextType;
 }

 /**
  * Toggle confirm password
  */
 toggleConfPasswordTextType() {
   this.confPasswordTextType = !this.confPasswordTextType;
 }

 /**
  * On Submit
  */
 onSubmit() {
   this.submitted = true;

   // stop here if form is invalid
   if (this.resetPasswordForm.invalid) {
     return;
   }
 }

 // Lifecycle Hooks
 // -----------------------------------------------------------------------------------------------------

 /**
  * On init
  */
 ngOnInit(): void {
   this.resetPasswordForm = this._formBuilder.group({
     userName: [''],
     newPassword: ['', [Validators.required]],
     confirmPassword: ['', [Validators.required]],
     currentPassword: ['', [Validators.required]]
   });

   // Subscribe to config changes
   this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
     this.coreConfig = config;
   });
 }

 /**
  * On destroy
  */
 ngOnDestroy(): void {
   // Unsubscribe from all subscriptions
   this._unsubscribeAll.next();
   this._unsubscribeAll.complete();
 }

 userName: any;
 save() {
   this.userName = window.localStorage.getItem('loginId');
   this.resetPasswordForm.patchValue({
     userName: this.userName
   })
   if(this.validate()){
     var param = this.resetPasswordForm.value;
     this.service.changePassword(param).then(data=>{
       this.response = data;
       if(this.response.code == 0){
         Swal.fire({
           title: "Thay đổi thành công",
           icon: "success"
         }).then(()=>this.router.navigate(["/dashboard/analytics"]))
       }
       else if(this.response.code == 59){
         Swal.fire({
           title: "Mật khẩu hiện tại không chính xác",
           icon: "error"
         })
       }
       else{
         Swal.fire({
           title: "Thay đổi không thành công",
           icon: "error"
         })
       }
     })
   }

 }

 messageNotEqualPassword: boolean;
 messageCheckRegex: boolean
 validate() {
   var isValid = true;
   var isFocus = false;
   var regexPassword = new RegExp ('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$');
   if(!regexPassword.test(this.resetPasswordForm.value.newPassword)) {
     this.messageCheckRegex = true;
     isFocus = true;
     isValid = false;
   }
   else if(this.resetPasswordForm.value.newPassword != '' && this.resetPasswordForm.value.confirmPassword != ''
   && this.resetPasswordForm.value.newPassword != this.resetPasswordForm.value.confirmPassword ){
     this.messageNotEqualPassword = true;
     isFocus = true;
     isValid = false;
   }
   return isValid; 
 }

 clearMessageNewPassword(){
   this.messageCheckRegex = false;
 }

 clearMessageConfirmPassword(){
   this.messageNotEqualPassword = false;
 }
}
