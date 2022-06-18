import { Component, OnInit } from '@angular/core';
import { AuthRoleService } from '../auth-role-service'
import Swal from 'sweetalert2';
import { Router } from "@angular/router";


@Component({
  selector: 'app-auth-role-detail',
  templateUrl: './auth-role-detail.component.html',
  styleUrls: ['./auth-role-detail.component.scss']
})
export class AuthRoleDetailComponent implements OnInit {

  constructor(
    private router: Router,
    private mainService: AuthRoleService
  ) { }

  ngOnInit(): void {
    this.doGetInfo()
  }

  roleObj = {
    name: '', roleCode: '', description: '', createdDate: '', menus:
      [
        { listPrivilege: [{ act: '' }] }
      ], createdBy: ''
  }
  async doGetInfo() {
    Swal.fire('Đang lấy dữ liệu Quyền')
    Swal.showLoading();
    let roleId = localStorage.getItem("auth-role-id")
    this.mainService.getRole(parseInt(roleId)).then(
      async response => {
        console.log(response)
        if (response.code == 0) {
          this.roleObj = response.data
          Swal.close() 
        } else if (response.code == 4) {
          Swal.fire('Không có dữ liệu Quyền....')
        } else {
          Swal.fire('Lỗi BackEnd, vui lòng kiểm tra log lỗi hệ thống')
        }
      },
      error => {
        Swal.fire("Có lỗi xảy ra, vui lòng thử lại sau")
        console.warn(error);
      });
  }

  goBack() {
    this.router.navigate(['/auth-role-list']);
  }
}
