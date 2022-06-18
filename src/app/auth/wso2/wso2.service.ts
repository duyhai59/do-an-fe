import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilService } from 'app/shares/services/http-util.service';

@Injectable({ providedIn: 'root' })
export class Wso2Service {

  public baseUrl = 'https://wso2.neo:4200';

  public readonly Login = '/oauth2/token';
  
  public readonly CreateUser = '/wso2/scim/Users';

  public readonly CreateRole = '/scim2/Groups';

  constructor(
    private http: HttpClient,
  ) {}

  public async login(params: any){
    const headers = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic NVR0UDNreUZvYmR0SnVrb2RyTHhSYWd4NjdrYTpTczN4a28wc1N3SGxCbHZmU2g0cU1vaDdpaEVh'
      });
      return await this.http.post(this.baseUrl + this.Login, 'grant_type=password&username=admin&password=admin&scope=openid', { headers: headers });
  }

  public async createUser(data: any){
    var params = '{"schemas":[],"name":{"familyName":"${familyName}","givenName":"${givenName}"},"userName":"${username}","password":"${password}","emails":[{"primary":true,"value":"${email}","type":"home"},{"value":"${email}","type":"work"}]}';
    params = params.replace("${familyName}", data.fName);
    params = params.replace("${givenName}", data.lName);
    params = params.replace("${username}", data.username);
    params = params.replace("${password}", data.password);
    params = params.replace("${email}", data.email);
    

    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic YWRtaW46YWRtaW4='
      });
      return await this.http.post(this.baseUrl + this.CreateUser, params, { headers: headers }).toPromise();
  }

  public async createRole(data: any){
    var params = "{ \"schemas\": [ \"urn:ietf:params:scim:schemas:core:2.0:Group\" ], \"displayName\": \"${roleName}\"}";
    params = params.replace("${roleName}", data.role);    

    const headers = new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'accept': 'application/scim+json',
        'Content-Type': 'application/scim+json',
        'Authorization': 'Basic YWRtaW46YWRtaW4=',
      });
      return await this.http.post(this.baseUrl + this.CreateRole, params, { headers: headers }).toPromise();
  }
}