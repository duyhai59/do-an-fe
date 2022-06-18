import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { User } from 'app/auth/models';
import { HttpUtilService } from '../../shares/services/http-util.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  /**
   *
   * @param {HttpClient} _http
   */
  constructor(private _http: HttpClient,
    private httpUtilService: HttpUtilService,) { }

  private readonly API_URL = this.httpUtilService.api.wwf;


  /**
   * Get all users
   */
  getAll() {
    return this._http.get<User[]>(`${environment.apiUrl}/users`);
  }

  /**
   * Get user by id
   */
  getById(id: number) {
    return this._http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  /**
   * DatND : 29/11
   * Get user by Login ID
   */
  getByLoginId(loginId: string) {
    return this.httpUtilService.callAPI(
      this.API_URL + '/user-info/' + loginId, { method: 'GET' }).toPromise()
  }
}