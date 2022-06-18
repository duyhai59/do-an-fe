import { Injectable } from '@angular/core';
import { HttpUtilService } from 'app/shares/services/http-util.service';
import { BaseResponse } from 'app/shares/models/base-response';

@Injectable({
  providedIn: 'root'
})
export class SelectBoxFeedbackService {

  private readonly API_URL = this.httpUtilService.api.customercare;

  constructor(private httpUtilService: HttpUtilService,) { }

  async getNetworkType(): Promise<BaseResponse> {
    let params = { method: 'GET', type: 'FB_NETWORK_TYPE'}
    return await this.httpUtilService.callAPI(this.API_URL + "/ap-domain/", params).toPromise();
  }

  async getCusType(): Promise<BaseResponse> {
    let params = { method: 'GET', type: 'FB_CUST_TYPE'}
    return await this.httpUtilService.callAPI(this.API_URL + "/ap-domain/", params).toPromise();
  }

  async getCallBackMethod(): Promise<BaseResponse> {
    let params = { method: 'GET', type: 'FB_CALL_BACK_METHOD'}
    return await this.httpUtilService.callAPI(this.API_URL + "/ap-domain/", params).toPromise();
  }

  async getCallBackReason(): Promise<BaseResponse> {
    let params = { method: 'GET', type: 'FB_CALL_BACK_REASON'}
    return await this.httpUtilService.callAPI(this.API_URL + "/ap-domain/", params).toPromise();
  }

  async getConfirmContact(): Promise<BaseResponse> {
    let params = { method: 'GET', type: 'FB_CONFIRM_CONTACT'}
    return await this.httpUtilService.callAPI(this.API_URL + "/ap-domain/", params).toPromise();
  }
  
  async getSatisfiedLevel(): Promise<BaseResponse> {
    let params = { method: 'GET', type: 'FB_SATISFIED_LEVEL'}
    return await this.httpUtilService.callAPI(this.API_URL + "/ap-domain/", params).toPromise();
  }

  public async getCenter(){
    let params = { method: 'GET', type: '31'}
    return await this.httpUtilService.callAPI(this.API_URL + "/ap-domain", params).toPromise();
  }

  public async getReceptionType(){
    let params = { method: 'GET', type: 'FB_ACCEPT_TYPE'}
    return await this.httpUtilService.callAPI(this.API_URL + "/ap-domain", params).toPromise();
  }

  public async getCustomerType(){
    let params = { method: 'GET', type: 'FB_VIP'}
    return await this.httpUtilService.callAPI(this.API_URL + "/ap-domain", params).toPromise();
  }

  public async getFeedbackStatus(){
    let params = { method: 'GET', type: 'FB_STATUS'}
    return await this.httpUtilService.callAPI(this.API_URL + "/ap-domain", params).toPromise();
  }

  async getNetworkIssue(): Promise<BaseResponse> {
    let params = { method: 'GET', type: 'FB_NETWORK_ISSUE'}
    return await this.httpUtilService.callAPI(this.API_URL + "/ap-domain/", params).toPromise();
  }
}