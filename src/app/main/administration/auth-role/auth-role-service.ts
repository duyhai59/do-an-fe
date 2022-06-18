import { Injectable } from '@angular/core';
import { HttpUtilService } from '../../../shares/services/http-util.service';

@Injectable({
    providedIn: 'root'
})
export class AuthRoleService {
    constructor(
        private httpUtilService: HttpUtilService,
    ) { }

    private readonly API_URL = this.httpUtilService.api.auth;

    // Get all AuthRole 
    async getAllAuthRole(keyWord: string) {
        return this.httpUtilService.callAPI(
            this.API_URL + '/webapi/role/all?keyWord='+ keyWord, { method: 'GET' }).toPromise()
    }
    async deleteAuthRole(roleId: number) {
        return this.httpUtilService.callAPI(
            this.API_URL + '/webapi/role/' + roleId, { method: 'DELETE' }).toPromise()
    }
    async addAuthRole(roleModel: any) {
        return this.httpUtilService.callAPI(
            this.API_URL + '/webapi/role', roleModel).toPromise()
    }
    async getRole(id: number) {
        return this.httpUtilService.callAPI(
            this.API_URL + '/webapi/role/' + id, { method: 'GET' }).toPromise()
    }
}