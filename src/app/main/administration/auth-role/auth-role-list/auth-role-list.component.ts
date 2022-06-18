import { Component, OnInit } from '@angular/core';
import { AuthRoleService } from '../auth-role-service';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth-role-list',
  templateUrl: './auth-role-list.component.html',
  styleUrls: ['./auth-role-list.component.scss']
})
export class AuthRoleListComponent implements OnInit {

  constructor(
    private mainService: AuthRoleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllAuthRole()
  }

  keyWord = ''
  roleList: any
  async getAllAuthRole() {
    Swal.fire('Đang lấy dữ liệu danh sách quyền của người dùng....')
    Swal.showLoading();
    this.mainService.getAllAuthRole(this.keyWord).then(
      async response => {
        console.log(response)
        if (response.code == 0) {
          this.roleList = response.content
          Swal.close()
        } else {
          Swal.fire(this.roleList.errorMessages)
        }
      },
      error => {
        console.log(error);
      });
  }

  deleteRole(roleId: number) {
    Swal.fire({
      icon: 'question',
      title: 'Bạn có chắc chắn muốn xóa Quyền ?',
      showDenyButton: true,
      confirmButtonText: 'Có',
      denyButtonText: 'Không',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.showLoading()
        this.mainService.deleteAuthRole(roleId).then(
          async response => {
            if (response.code == 0) {
              Swal.fire('Xóa thành công').then(res => this.getAllAuthRole())
            } else if (response.code == 4) {
              Swal.fire(response.data[0].message)
            } else {
              console.log(response)
              Swal.fire('Error')
            }
          },
          error => {
            console.log(error);
          });
      }
    })
  }

  goAuthRoleAdd() {
    this.router.navigate(['/auth-role-add']);
  }

  goDetail(id: string) {
    localStorage.removeItem("auth-role-id")
    localStorage.setItem("auth-role-id", id)
    this.router.navigate(['/auth-role-detail']);
  }

}
