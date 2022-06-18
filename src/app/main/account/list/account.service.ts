import { Injectable } from '@angular/core';
import { BaseResponse } from 'app/shares/models/base-response';
import { HttpUtilService } from 'app/shares/services/http-util.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpUtilService:HttpUtilService) { }
  private readonly API_URL_AUTH = this.httpUtilService.api.auth;
  private readonly API_URL = this.httpUtilService.api.customercare;

  addUserInfo(params):Promise<BaseResponse>{
    return this.httpUtilService.callBase2(this.API_URL+"/account/add", "POST" ,params).toPromise();
  }

  editUserInfo(params):Promise<BaseResponse>{
    return this.httpUtilService.callBase2(this.API_URL+"/account/edit","PUT",params).toPromise();
  }

  deleteUserInfo(params:any,userId:any):Promise<BaseResponse>{
    return this.httpUtilService.callAPI(this.API_URL+"/account/delete/"+userId,params).toPromise();
  }

  searchUserInfo(params): Promise<any>{
    return this.httpUtilService.callAPI(this.API_URL+"/account/search",params).toPromise();
  }

  detailAccount(params,userId:any):Promise<BaseResponse>{
    return this.httpUtilService.callAPI(this.API_URL+"/account/get-user/"+userId,params).toPromise();
  }

  detailUser(params,userId:any):Promise<BaseResponse>{
    return this.httpUtilService.callAPI(this.API_URL+"/account/get/"+userId,params).toPromise();
  }

  searchUser(params): Promise<any>{
    return this.httpUtilService.callAPI(this.API_URL_AUTH+"/webapi/user/search-user",params).toPromise();
  }

  addUser(params):Promise<BaseResponse>{
    return this.httpUtilService.callBase2(this.API_URL_AUTH+"/webapi/user/add-user", "POST" ,params).toPromise();
  }

  deleteUser(params:any,loginId:any):Promise<BaseResponse>{
    return this.httpUtilService.callAPI(this.API_URL_AUTH+"/webapi/user/delete-user/"+loginId,params).toPromise();
  }

  detail(params,loginId:any):Promise<BaseResponse>{
    return this.httpUtilService.callAPI(this.API_URL_AUTH+"/webapi/user/get-user/"+loginId,params).toPromise();
  }

  editUser(params,loginId:any):Promise<BaseResponse>{
    return this.httpUtilService.callBase2(this.API_URL_AUTH+"/webapi/user/edit-user/"+loginId,"PUT",params).toPromise();
  }

  changePassword(params):Promise<BaseResponse>{
    return this.httpUtilService.callBase2(this.API_URL_AUTH+"/webapi/user/change-password-user","PUT",params).toPromise();
  }

  getUserInfo(params,userId:any):Promise<BaseResponse>{
    return this.httpUtilService.callAPI(this.API_URL_AUTH+"/webapi/user/"+userId,params).toPromise();
  }

  deleteUsers(params):Promise<BaseResponse>{
    return this.httpUtilService.callBase2(this.API_URL+"/account/delete-users","DELETE",params).toPromise();
  }

  public async getAll(params: any){
    return await this.httpUtilService.callAPI(this.API_URL + "/account/get-all", params).toPromise();
  }
}
