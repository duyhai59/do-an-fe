import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../../menu/menu.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth-privilege-list',
  templateUrl: './auth-privilege-list.component.html',
  styleUrls: ['./auth-privilege-list.component.scss']
})
export class AuthPrivilegeListComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.getAllMenu()
  }

  menuChoosen = ''

  allMenu: any
  async getAllMenu() {
    Swal.fire('Đang lấy dữ liệu danh sách Menu....')
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
        Swal.fire(this.menuService.backEndError)
        console.log(error);
      });
  }

  addNew(id: number) {
    Swal.fire(id.toString())
  }

  async submitFormSetTime(formAddNew: any) {

    if (formAddNew.invalid) {
      Swal.fire('Form nhập chưa hợp lệ')
    }

  }

  closeResult: string;
  open(addNewModal: any) {
    // Reset form every time open Modal
    // this.callOutDate = undefined
    // this.callOutDateTime = undefined
    // this.callOutUser = ''
    // this.company = ''
    // this.department = ''
    // this.onDutyGroup = ''
    // this.callOutTime = undefined

    this.modalService.open(addNewModal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    }
    else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    }
    else {
      return `with: ${reason}`;
    }
  }

}
