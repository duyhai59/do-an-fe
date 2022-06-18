import { Component, OnInit, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { MenuService } from '../../../../menu/menu.service';
import { Router } from "@angular/router";
import { AuthRoleService } from '../auth-role-service'
import $ from 'jQuery';
import { TokenStorage } from 'app/shares/services/token-storage.service';

@Component({
  selector: 'app-auth-role-add',
  templateUrl: './auth-role-add.component.html',
  styleUrls: ['./auth-role-add.component.scss']
})
export class AuthRoleAddComponent implements OnInit {

  constructor(
    private ref: ElementRef,
    private tokenStorage: TokenStorage,
    private mainService: AuthRoleService,
    private menuService: MenuService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAllMenu()
  }

  allMenu = []
  async getAllMenu() {
    Swal.fire('Đang lấy dữ danh sách quyền theo menu....')
    Swal.showLoading();
    this.menuService.getAllMenuPublished().then(
      async response => {
        if (response.code == 0) {
          this.allMenu = response.content
          Swal.close()
        } else if (response.code == 4) {
          Swal.fire(this.menuService.backEndError)
        }
      },
      error => {
        Swal.close()
        console.log(error);
      });
  }

  convertMenuList(allMenu: any) {
    for (let i = 0; i < allMenu.length; i++) {
      let menu = allMenu[i];
      if (menu.menuLevel == 1) {

      }
    }
  }

  roleCode: string
  roleName: string
  description: string
  listPriviledgeChoose = []
  // id: this.currentRoleIdChoose,
  selectActionForRole(event: any) {
    let eventValue = event.target.value
    let eventValueArr = eventValue.split(",")
    let priviledgeId = parseInt(eventValueArr[0])
    let priviledgeName = eventValueArr[1]
    let menuId = parseInt(eventValueArr[2])

    let priviledgeChoosen = { id: priviledgeId }
    if (event.target.checked)
      this.listPriviledgeChoose.push(priviledgeChoosen)
    else {
      var index = this.listPriviledgeChoose.findIndex(function (o) {
        return o.id == priviledgeId;
      })
      if (index !== -1) this.listPriviledgeChoose.splice(index, 1);
    }
  }

  errorMsg = ''
  submitFormAddNew(formAddNew: any) {
    this.errorMsg = ''
    if (formAddNew.invalid) {
      for (const key of Object.keys(formAddNew.controls)) {
        if (formAddNew.controls[key].invalid) {
          formAddNew.controls[key].touched = true
        }
      }
      for (const key of Object.keys(formAddNew.controls)) {
        if (formAddNew.controls[key].invalid) {
          const invalidControl = this.ref.nativeElement.querySelector('#' + key);
          invalidControl.focus();
          break;
        }
      }
      $("html, body").animate({ scrollTop: 0 }, 500);
      $(".priviledge_table_div").animate({ scrollTop: 0 }, 500);
    } else if (this.listPriviledgeChoose.length == 0) {
      this.errorMsg = 'Vui lòng chọn ít nhất 1 quyền!'
      $("html, body").animate({ scrollTop: 0 }, 500);
      $(".priviledge_table_div").animate({ scrollTop: 0 }, 500);
    }
    else {
      this.doAddNew()
    }
  }

  roleModel: any
  doAddNew() {
    // RoleType and Status is not using currently
    // roleType: 2 => USER. roleType: 1 => ADMIN
    // status: 0
    let createdBy = this.tokenStorage.getUsername()
    this.roleModel = {
      name: this.roleName, roleCode: this.roleCode, description: this.description,
      privileges: this.listPriviledgeChoose, createdBy: createdBy
    }
    Swal.showLoading();
    this.mainService.addAuthRole(this.roleModel).then(
      async response => {
        console.log(response)
        if (response.code == 0) {
          Swal.fire('Tạo mới quyền thành công!').then((res) => (
            this.router.navigate(['/auth-role-list'])
          ))
        } else if (response.code == 4) {
          Swal.fire(response.data[0].message)
          //Swal.fire(this.menuService.backEndError)
        }
      },
      error => {
        Swal.close()
        console.log(error);
      });
  }

  clearForm() {
    this.roleName = undefined
    this.roleCode = undefined
    this.description = undefined
    this.listPriviledgeChoose = []
    $('input[type=checkbox]').prop('checked', false);
    $("html, body").animate({ scrollTop: 0 }, 500);
    $(".priviledge_table_div").animate({ scrollTop: 0 }, 500);
  }

  goBack() {
    this.router.navigate(['/auth-role-list']);
  }

}
