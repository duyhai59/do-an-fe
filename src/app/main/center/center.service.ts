import { HttpUtilService } from './../../shares/services/http-util.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CenterService {

  constructor(private httpUtilService:HttpUtilService) { }
  private readonly API_URL = this.httpUtilService.api.customercare;

  public async getAll(params: any){
    return await this.httpUtilService.callAPI(this.API_URL + "/center/get-all", params).toPromise();
  }
}
