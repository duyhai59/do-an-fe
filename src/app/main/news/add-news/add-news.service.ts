import { Injectable } from '@angular/core';
import { HttpUtilService } from 'app/shares/services/http-util.service';

@Injectable({
  providedIn: 'root'
})
export class AddNewsService {

  private readonly API_URL = this.httpUtilService.api.customercare;
  constructor(
    private httpUtilService: HttpUtilService,
) {

}

async addNews(params: any): Promise<any> {
  return await this.httpUtilService.callAPI(this.API_URL + "/news/add", params).toPromise();
}
}
