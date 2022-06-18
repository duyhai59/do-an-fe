import { Injectable, Inject, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

import { CoreMenu } from "@core/types";
import { CoreMenuService } from '@core/components/core-menu/core-menu.service';

import { User, Role } from 'app/auth/models';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TokenStorage } from 'app/shares/services/token-storage.service';
import jwtDecode from 'jwt-decode';
import { HttpUtilService } from 'app/shares/services/http-util.service';
import { MenuService } from '../../menu/menu.service'
import Swal from 'sweetalert2';
import { AuthService } from '../wso2/auth.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  //public
  public currentUser: Observable<User>;

  //private
  private currentUserSubject: BehaviorSubject<User>;

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
 
   */
  constructor(
    // private coreMenuService: CoreMenuService,
    private _http: HttpClient,
    private _toastrService: ToastrService,
    private router: Router,
    private tokenStorage: TokenStorage,
    private httpUtilService: HttpUtilService,
    private menuService: MenuService,
    private oauthService: OAuthService,

  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    // console.log('currenUserValue: ')
    // console.log(this.currentUserSubject.value)
    return this.currentUserSubject.value;
  }

  /**
   *  Confirms if user is admin
   */
  // get isAdmin() {
  //   return this.currentUser && this.currentUserSubject.value.role === Role.Admin;
  // }

  /**
   *  Confirms if user is client
   */
  // get isClient() {
  //   return this.currentUser && this.currentUserSubject.value.role === Role.Client;
  // }

  menu1: any;
  /**
   * User login
   *
   * @param username
   * @param password
   * @returns user
   */
  private saveAccessData(accessData: any, token: string) {
    if (accessData) {
      var _token = token;
      const tokenArr = token.split(' ');
      if (tokenArr.length > 1) {
        _token = tokenArr[tokenArr.length - 1];
      }
      this.tokenStorage
        .setLoginType(accessData.iss)
        .setAccessToken(_token)
        .setUserType(accessData.type)
        .setUserRoles(accessData.groups)
        .setUsername(accessData.name)
        // DatND
        .setUserLoginId(accessData.sub);
    }
  }
  private readonly BASE_URL = this.httpUtilService.BASE_URL + this.httpUtilService.api.auth;
  login(params) {
    return this._http
      .post<any>(`${this.BASE_URL}/login`, params)
      .pipe(
        map(user => {
          let userx = user;
          // if (user && user.token) {
          if (user.code == 0 || user.code == '0') {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            console.log('User: ' + user)
            // Display welcome toast!
            // if(user.header.get("authorization")){

            if (user.content['Bearer']) {
              // var token = user.header.get("authorization");
              var token = user.content['Bearer'];

              var decode = jwtDecode(token);
              this.saveAccessData(decode, token);
              var currentLoginId = localStorage.getItem('loginId')
              var oldLoginId = localStorage.getItem('oldLoginAccount')
              localStorage.setItem('oldLoginAccount', params.username);

              // console.log('Token: ' + token)
              console.log('User AuthRole: ' + this.tokenStorage.getUserRole())
              if (localStorage.getItem('checkMenuCall') == null)
                console.log('Menu call at least: false')
              if (localStorage.getItem('checkMenuCall'))
                console.log('===> Not request GET menu')
              if ((localStorage.getItem('checkMenuCall') != 'true')
                || (currentLoginId != oldLoginId)) {
                localStorage.setItem('checkMenuCall', 'true');
                this.getMenus()
              }
            }

            setTimeout(() => {
              this._toastrService.success(
                'You have successfully logged in',
                '👋 Welcome ' + '!',
                { toastClass: 'toast ngx-toastr', closeButton: true }
              );
            }, 2500);
            // notify
            this.currentUserSubject.next(userx);
          }
          this.getMenus();
          return userx;
        })
      );
  }

  getUser(user) {
    let userx = user;
    // if (user && user.token) {
    if (user.code == 0 || user.code == '0') {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user));
      console.log('User: ' + user)
      // Display welcome toast!
      // if(user.header.get("authorization")){
      if (user.content['Bearer']) {
        // var token = user.header.get("authorization");
        var token = user.content['Bearer'];

        var decode = jwtDecode(token);
        this.saveAccessData(decode, token);
        console.log('Token: ' + token)
        console.log('User AuthRole: ' + this.tokenStorage.getUserRole())
        if (localStorage.getItem('checkMenuCall') == null)
          console.log('Menu call at least: false')
        if (localStorage.getItem('checkMenuCall'))
          console.log('===> Not request GET menu')
        var currentLoginId = localStorage.getItem('loginId')
        var oldLoginId = localStorage.getItem('oldLoginAccount')
        // Set old LoginId
        localStorage.setItem('oldLoginAccount', user.username);

        if ((localStorage.getItem('checkMenuCall') != 'true')
          || (currentLoginId != oldLoginId)) {
          localStorage.setItem('checkMenuCall', 'true');
          this.getMenus1();
        }
        // this.getMenus();
      }
      setTimeout(() => {
        this._toastrService.success(
          'You have successfully logged in',
          '👋 Welcome ' + '!',
          { toastClass: 'toast ngx-toastr', closeButton: true }
        );
      }, 2500);
      // notify
      this.currentUserSubject.next(userx);
    }
    return userx;
  }

  /**
   * User logout
   *
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('accessToken');
    const user = localStorage.getItem('currentUser');
    localStorage.removeItem('currentUser');
    if (user) {
      if (this.tokenStorage.getLoginType()) {
        const token = this.oauthService.getAccessToken();
        if (token) {
          if (this.oauthService.tokenEndpoint) {
            const revocationUrl = this.oauthService.tokenEndpoint.replace(/\/token$/, '/revoke');
            const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            let urlSearchParams = new URLSearchParams();
            urlSearchParams.append('token', token);
            urlSearchParams.append('token_type_hint', 'access_token');
            urlSearchParams.append('client_id', this.oauthService.clientId);
            this._http.post(revocationUrl, urlSearchParams.toString(), { headers })
              .subscribe(result => {
                console.log('Access token and related refresh token (if any) have been successfully revoked');
              }, (error) => {
                console.error('Something went wrong on token revocation');
                //this.oidcSecurityService.handleError(error);
                return throwError(error);
              });
          }
        }
        this.oauthService.logOut();
      }
    }

    // notify
    this.currentUserSubject.next(null);
  }

  checkCall = false
  menuTest: CoreMenu[];
  menu: CoreMenu[];

  getMenus() {
    // this.menu = [
    //   {
    //     id: 'customer-info',
    //     type: 'section',
    //     title: 'Tra cứu Thông tin Khách hàng',
    //     translate: 'Tra cứu Thông tin Khách hàng',
    //     icon: 'bar-chart-2',
    //     children: [
    //       {
    //         id: 'customer-service-history',
    //         title: 'Tra cứu thông tin thuê bao',
    //         translate: 'Tra cứu thông tin thuê bao',
    //         icon: 'map',
    //         type: 'item',
    //         url: 'customer-info-subcribe'
    //       },
    //       {
    //         id: 'customer-service-history',
    //         title: 'Tra cứu lịch sử sử dụng dịch vụ số',
    //         translate: 'Tra cứu lịch sử sử dụng dịch vụ số',
    //         icon: 'map',
    //         type: 'item',
    //         url: 'customer-service-history'
    //       }
    //     ]
    //   }
    // ]
    var roleId = this.tokenStorage.getUserRole();
    this.menuService.getAllMenuPublished().then(response => {
      if (response.code == 0) {
        this.menuTest = response.content
        localStorage.removeItem("cskh-menu")
        localStorage.setItem("cskh-menu", JSON.stringify(this.menuTest))
        // Required reload page after login, because can't call Request to server to get Menu before Login in
        location.reload()
        // Bo sung them loop menu cap 4 tu day(Neu co)
      } else
        Swal.fire('Cannot get Menus data');
    })
    this.checkCall = true
  }

  getMenus1() {
    var loginId = this.tokenStorage.getUserLoginId()
    this.menuService.getListMenuPublished1(loginId).then(response => {
     
      if (response.code == 0) {
        this.menuTest = response.content
        localStorage.removeItem("cskh-menu")
        localStorage.setItem("cskh-menu", JSON.stringify(this.menuTest))
        // Required reload page after login, because can't call Request to server to get Menu before Login in
        location.reload()
        // Bo sung them loop menu cap 4 tu day(Neu co)
      } else
        Swal.fire('Cannot get Menus data');
    })
    this.checkCall = true
  }
}
