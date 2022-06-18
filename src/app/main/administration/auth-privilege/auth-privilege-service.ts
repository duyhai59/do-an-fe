import { Injectable } from '@angular/core';
import { HttpUtilService } from '../../../shares/services/http-util.service';

@Injectable({
    providedIn: 'root'
})
export class AuthPrivilegeService {
    constructor(
        private httpUtilService: HttpUtilService,
    ) { }

    private readonly API_URL = this.httpUtilService.api.auth;

}