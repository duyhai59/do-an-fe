import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilService } from 'app/shares/services/http-util.service';
import { TokenStorage } from 'app/shares/token-storage.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UploadImgService {
  private readonly API_URL = this.httpUtilService.api.customercare;
  constructor(
    private httpUtilService: HttpUtilService,
) {

}

  async uploadMultiImages(params: any, file: File[]): Promise<any> {
    return await this.httpUtilService.uploadMultipartFilesWithFormData(this.API_URL + "/manage-image/upload", file, params).toPromise();
}
}
