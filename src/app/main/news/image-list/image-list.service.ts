import { Injectable } from '@angular/core';
import { HttpUtilService } from 'app/shares/services/http-util.service';

@Injectable({
  providedIn: 'root'
})
export class ImageListService {

  private readonly API_URL = this.httpUtilService.api.customercare;
  constructor(
    private httpUtilService: HttpUtilService,
) {

}

  async getImageList(params: any): Promise<any> {
    return await this.httpUtilService.callAPI(this.API_URL + "/manage-image/get-all", params).toPromise();
}

async deleteImage(params: any): Promise<any> {
  return await this.httpUtilService.callBase2(this.API_URL + "/manage-image/delete-images", 'DELETE' ,params).toPromise();
}
}
