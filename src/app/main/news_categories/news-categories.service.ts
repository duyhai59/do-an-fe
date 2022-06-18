import { BaseResponse } from './../../shares/models/base-response';
import { HttpUtilService } from './../../shares/services/http-util.service';
import { Injectable } from '@angular/core';
import { TreeviewItem } from 'ngx-treeview';
@Injectable({
  providedIn: 'root'
})
export class NewsCategoriesService {

  constructor(private httpUtilService:HttpUtilService) { }
  private readonly API_URL_AUTH = this.httpUtilService.api.auth;
  private readonly API_URL = this.httpUtilService.api.customercare;

  add(params):Promise<BaseResponse>{
    return this.httpUtilService.callBase2(this.API_URL+"/news-categories/add", "POST" ,params).toPromise();
  }

  getAll(params: any){
    return this.httpUtilService.callAPI(this.API_URL + "/news-categories/get-tree", params).toPromise();
  }

}
