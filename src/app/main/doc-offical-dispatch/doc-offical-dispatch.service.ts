import { Injectable } from '@angular/core';
import { HttpUtilService } from 'app/shares/services/http-util.service';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';

@Injectable({
  providedIn: 'root'
})
export class DocOfficalDispatchService {

  constructor(private i18n: NzI18nService,private httpUtilService:HttpUtilService) { }
  private readonly API_URL = this.httpUtilService.api.customercare;

  switchLanguage() {
    this.i18n.setLocale(en_US);
  }

  formatDate(dates:any){
    let dateAfterFormat = '';
    if(dates != null && dates != undefined && dates != ''){

      let date = new Date(dates);

      let year = date.getFullYear().toString();
      let month = (date.getMonth().toString().length < 2)?('0'+ date.getMonth().toString()):date.getMonth().toString();
      let dateOfMonth = (date.getDate().toString().length < 2)?('0'+date.getDate().toString()):(date.getDate().toString());
      let hours = (date.getHours().toString().length < 2)?('0'+date.getHours().toString()):(date.getHours().toString());
      let minutes = (date.getMinutes().toString().length < 2)?('0'+date.getMinutes().toString()):(date.getMinutes().toString());

      dateAfterFormat = year+"-"+month+"-"+dateOfMonth+"T"+hours+":"+minutes;
    }
    return dateAfterFormat;
  }

  doSearchDocumentOfficalDispatch(params:any):Promise<any>{
    return this.httpUtilService.callAPI(this.API_URL+"/document",params).toPromise();
  }

  doCreateDocumentOfficalDispatch(formData:any,params:any):Promise<any>{
    return this.httpUtilService.uploadMultipartFileCustom(this.API_URL+"/document",formData,params).toPromise();
  }

  doRetrieveDocumentOfficalDispatch(params:any,id:any):Promise<any>{
    return this.httpUtilService.callAPI(this.API_URL+"/document/"+id,params).toPromise();
  }

  doUpdateDocumentOfficalDispatch(params:any,id:any,formData:FormData):Promise<any>{
    return this.httpUtilService.uploadMultipartFileCustom(this.API_URL+"/document/"+id,formData,params).toPromise();
  }

  doDeleteDocumentOfficalDispatch(params:any,id:any):Promise<any>{
    return this.httpUtilService.callAPI(this.API_URL+"/document/"+id,params).toPromise();
  }

  uploadFileExcel(params:any,file:File):Promise<any>{
    return this.httpUtilService.uploadMultipartFileWithFormData(this.API_URL+"/document/upload-file",file,params).toPromise();
  }

  exportFileExcel(params:any):Promise<any>{
    return this.httpUtilService.callAPI(this.API_URL+"/document/export-file",params,'blob').toPromise();
  }
}
