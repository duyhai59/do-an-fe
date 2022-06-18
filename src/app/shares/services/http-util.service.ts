import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
// import {Md5} from 'ts-md5';
import { catchError } from 'rxjs/operators';
import { ApiContext } from './api-context';
import { TokenStorage } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpUtilService extends ApiContext {

  constructor(public http: HttpClient, private tokenStorage: TokenStorage) {
    super();
  }

  callAPI(url: string, data: any, responseType?: any): Observable<any> {
    url = this.BASE_URL + url;
    if (!responseType) {
      responseType = 'json';
    }
    data.responseType = responseType;
    return this.callBase(url, data);
  }

  callAPI2(url: string, data: any, responseType?: any): Observable<any> {
    url = this.BASE_URL + url;
    if (!responseType) {
      responseType = 'json';
    }
    data.responseType = responseType;
    return this.callBase3(url, data);
  }

  public callBase3(url: string, data: any): Observable<any> {
    let method = 'POST';
    let responseType: any = 'json';
    console.log('run callBase')
    if (data.method) {
      method = data.method;
      delete data.method;
    }
    if (data.responseType) {
      responseType = data.responseType;
      delete data.responseType;
    }
    let headers: any;
    // truyen authorization len phuong thuc get
    if (data && data.authorizationParams) {
      headers = new HttpHeaders({ 'Authorization': 'Bearer ' + data.authorizationParams });
      headers.append('Content-Type', 'application/json; charset=utf-8');
    } else if (this.tokenStorage.getTokenStr()) {
      headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.tokenStorage.getTokenStr() });
      headers.append('Content-Type', 'application/json; charset=utf-8');
    }
    const requestParam = Object.assign({}, data);
    const fullDate = new Date();
    const datePipe = new DatePipe('en-US');
    const currentDate = datePipe.transform(fullDate, 'dd/MM/yyyy');
    let signature = '';
    const param = Object.keys(requestParam);
    for (let i = 0; i < param.length; i++) {
      if (requestParam[param[i]] || requestParam[param[i]] === 0) {
        signature = signature + requestParam[param[i]];
      }
    }
    signature = signature + 'web' + 'EJVsEmpnoqStUZbTSnEwdCpZsoGgIm' + currentDate;
    // requestParam.partner = 'web';
    // requestParam.signature = Md5.hashStr(signature) as string;
    let params = {};
    let body = {};
    if (method === 'GET') {
      params = requestParam;
    } else {
      body = requestParam;
    }
    const ops = {
      body,
      headers,
      params,
      responseType: 'blob' as 'json'
    };
    return this.http.request(method, url, ops).pipe(catchError(this.handleError)
    );
  }

  public callBase(url: string, data: any): Observable<any> {
    let method = 'POST';
    let responseType: any = 'json';
    console.log('run callBase')
    if (data.method) {
      method = data.method;
      delete data.method;
    }
    if (data.responseType) {
      responseType = data.responseType;
      delete data.responseType;
    }
    let headers: any;
    // truyen authorization len phuong thuc get
    if (data && data.authorizationParams) {
      headers = new HttpHeaders({ 'Authorization': 'Bearer ' + data.authorizationParams });
      headers.append('Content-Type', 'application/json; charset=utf-8');
    } else if (this.tokenStorage.getTokenStr()) {
      headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.tokenStorage.getTokenStr() });
      headers.append('Content-Type', 'application/json; charset=utf-8');
    }
    const requestParam = Object.assign({}, data);
    const fullDate = new Date();
    const datePipe = new DatePipe('en-US');
    const currentDate = datePipe.transform(fullDate, 'dd/MM/yyyy');
    let signature = '';
    const param = Object.keys(requestParam);
    for (let i = 0; i < param.length; i++) {
      if (requestParam[param[i]] || requestParam[param[i]] === 0) {
        signature = signature + requestParam[param[i]];
      }
    }
    signature = signature + 'web' + 'EJVsEmpnoqStUZbTSnEwdCpZsoGgIm' + currentDate;
    // requestParam.partner = 'web';
    // requestParam.signature = Md5.hashStr(signature) as string;
    let params = {};
    let body = {};
    if (method === 'GET') {
      params = requestParam;
    } else {
      body = requestParam;
    }
    const ops = {
      body,
      headers,
      params,
      responseType
    };
    return this.http.request(method, url, ops).pipe(catchError(this.handleError)
    );
  }

  public handleError(error) {
    console.log(error);
    return throwError(error);
  }

  public callBase2(url: string, method: string, data: any): Observable<any> {
    let responseType: any = 'json';
    if (data.responseType) {
      responseType = data.responseType;
      delete data.responseType;
    }
    let headers: any;
    // truyen authorization len phuong thuc get
    if (data && data.authorizationParams) {
      headers = new HttpHeaders({ 'Authorization': 'Bearer ' + data.authorizationParams });
      headers.append('Content-Type', 'application/json; charset=utf-8');
    } else if (this.tokenStorage.getTokenStr()) {
      headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.tokenStorage.getTokenStr() });
      headers.append('Content-Type', 'application/json; charset=utf-8');
    }
    const requestParam = Object.assign({}, data);
    const fullDate = new Date();
    const datePipe = new DatePipe('en-US');
    const currentDate = datePipe.transform(fullDate, 'dd/MM/yyyy');
    let signature = '';
    const param = Object.keys(requestParam);
    for (let i = 0; i < param.length; i++) {
      if (requestParam[param[i]] || requestParam[param[i]] === 0) {
        signature = signature + requestParam[param[i]];
      }
    }
    signature = signature + 'web' + 'EJVsEmpnoqStUZbTSnEwdCpZsoGgIm' + currentDate;
    // requestParam.partner = 'web';
    // requestParam.signature = Md5.hashStr(signature) as string;
    let params = {};
    let body = {};
    if (method === 'GET') {
      params = requestParam;
    } else {
      body = requestParam;
    }
    const ops = {
      body,
      headers,
      params,
      responseType
    };
    return this.http.request(method, this.BASE_URL + url, ops).pipe(catchError(this.handleError)
    );
  }

  public uploadMultipartFile(url: string, file: File, param: any): Observable<any> {
    let responseType: any = 'json';
    let headers: any;
    // truyen authorization len phuong thuc get
    if (this.tokenStorage.getTokenStr()) {
      headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.tokenStorage.getTokenStr() });
      headers.append('Content-Type', 'application/json; charset=utf-8');
    }
    const requestParam = Object.assign({}, param);
    let body = requestParam;
    let params = new HttpParams();
    params = param;
    const ops = {
      headers,
      body,
      params,
      responseType
    };
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', this.BASE_URL + url, formData, ops);
    return this.http.request(req).pipe(catchError(this.handleError));
  }

  public uploadMultipartFileCustom(url: string, formData:FormData, param: any): Observable<any> {
    let method = 'POST';
    let responseType: any = 'json';
    let headers: any;
    if (param.method) {
      method = param.method;
      delete param.method;
    }
    // truyen authorization len phuong thuc get
    if (this.tokenStorage.getTokenStr()) {
      headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.tokenStorage.getTokenStr() });
      headers.append('Content-Type', 'application/json; charset=utf-8');
    }
    const requestParam = Object.assign({}, param);
    let body = requestParam;
    const ops = {
      headers,
      body,
      responseType
    };

    const req = new HttpRequest(method, this.BASE_URL + url, formData, ops);
    return this.http.request(req).pipe(catchError(this.handleError));
  }

  public uploadMultipartFile1(url: string, file: File, param: any): Observable<any> {
    let responseType: any = 'json';
    let headers: any;
    // truyen authorization len phuong thuc get
    if (this.tokenStorage.getTokenStr()) {
      headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.tokenStorage.getTokenStr() });
      headers.append('Content-Type', 'application/json; charset=utf-8');
    }
    const requestParam = Object.assign({}, param);
    let body = requestParam;
    const ops = {
      headers,
      body,
      responseType
    };
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', this.BASE_URL + url, formData, ops);
    return this.http.request(req).pipe(catchError(this.handleError));
  }

  public uploadMultipartFileWithFormData(url: string, file: File, param: any): Observable<any> {
    let method = 'POST';
    let responseType: any = 'json';
    let headers: any;
    if (param.method) {
      method = param.method;
      delete param.method;
    }
    // truyen authorization len phuong thuc get
    if (this.tokenStorage.getTokenStr()) {
      headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.tokenStorage.getTokenStr() });
      headers.append('Content-Type', 'application/json; charset=utf-8');
    }
    const requestParam = Object.assign({}, param);
    let body = requestParam;
    const ops = {
      headers,
      body,
      responseType
    };
    const formData: FormData = new FormData();
    if(file){
      formData.append('file', file);
    }
    if(param.content){
      Object.keys(param.content).forEach(key => formData.append(key, param.content[key]));
    }
    const req = new HttpRequest(method, this.BASE_URL + url, formData, ops);
    return this.http.request(req).pipe(catchError(this.handleError));
  }

  public uploadMultipartFilesWithFormData(url: string, files: File[], param: any): Observable<any> {
    let method = 'POST';
    let responseType: any = 'json';
    let headers: any;
    if (param.method) {
      method = param.method;
      delete param.method;
    }
    // truyen authorization len phuong thuc get
    if (this.tokenStorage.getTokenStr()) {
      headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.tokenStorage.getTokenStr() });
      headers.append('Content-Type', 'application/json; charset=utf-8');
    }
    const requestParam = Object.assign({}, param);
    let body = requestParam;
    const ops = {
      headers,
      body,
      responseType
    };
    const formData: FormData = new FormData();
    if(files){
      for(var i =  0; i <  files.length; i++)  {  
        formData.append('files', files[i]);
      }
    }
    if(param.content){
      Object.keys(param.content).forEach(key => formData.append(key, param.content[key]));
    }
    const req = new HttpRequest(method, this.BASE_URL + url, formData, ops);
    return this.http.request(req).pipe(catchError(this.handleError));
  }

  public downloadFile(url: string, fileName: string): void{
    let headers: any;
    if (this.tokenStorage.getTokenStr()) {
      headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.tokenStorage.getTokenStr() });
      headers.append('Content-Type', 'application/json; charset=utf-8');
    }
    this.http.get(this.BASE_URL + url, {headers, responseType: 'blob' as 'json'}).subscribe(
        (response: any) =>{
          console.log(response);
            let dataType = response.type;
            let binaryData = [];
            binaryData.push(response);
            let downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
            document.body.appendChild(downloadLink);
            downloadLink.setAttribute('download', fileName);
            downloadLink.click();
        }
    )
}
}
