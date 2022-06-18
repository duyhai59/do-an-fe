import { Injectable } from '@angular/core';
import { HttpUtilService } from '../shares/services/http-util.service';
import { CoreMenu } from "@core/types";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(
    private httpUtilService: HttpUtilService,
  ) { }

  private readonly API_URL = this.httpUtilService.api.auth;
  public backEndError = 'Có lỗi xảy ra, vui lòng thử lại sau!';

  menuTest: CoreMenu[] = [
  ];

  // Function return List<MenuDTO>
  async getListMenuPublished(roleId: number) {
    return this.httpUtilService.callAPI(
      this.API_URL + '/webapi/menu/get-menu?roleId=' + roleId, { method: 'GET' }).toPromise()
  }

  async getListMenuPublished1(loginId: any) {
    return this.httpUtilService.callAPI(
      this.API_URL + '/webapi/menu/get-menu1?loginId=' + loginId, { method: 'GET' }).toPromise()
  }

  // Function return List<Menu>
  async getAllMenuPublished() {
    return this.httpUtilService.callAPI(
      this.API_URL + '/webapi/menu/get-all-menu', { method: 'GET' }).toPromise()
  }

}
