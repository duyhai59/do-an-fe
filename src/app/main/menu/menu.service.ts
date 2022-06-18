import { Injectable } from '@angular/core';
import { HttpUtilService } from 'app/shares/services/http-util.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private httpUtilService: HttpUtilService
  ) { }
  private readonly API_URL = this.httpUtilService.api.auth;

  getAllMenu(params: any): Promise<any> {
    return this.httpUtilService.callAPI(this.API_URL + '/webapi/menu/get-all-menu-normal', params).toPromise()
  }
}
