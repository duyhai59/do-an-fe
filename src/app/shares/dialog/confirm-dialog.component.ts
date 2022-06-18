// import {Component, Input} from "@angular/core";
// import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
// import {TranslateService} from "@ngx-translate/core";
//
// @Component({
//   selector: 'nb-confirm-dialog',
//   template: `
//     <div class="modal-header">
//       <h5 class="modal-title" [innerText]="this.header|translate"></h5>
//       <button type="button" class="close" aria-label="Close" (click)="ngBModal.dismiss()">
//         <span aria-hidden="true">&times;</span>
//       </button>
//     </div>
//     <div class="modal-body">
//       <p [innerText]="title"></p>
//     </div>
//     <div class="modal-footer">
//       <button type="button" class="btn btn-light" (click)="ngBModal.dismiss()" translate="COMMON.LABEL.CLOSE"></button>
//       <button type="button"
//               [hidden]="!this.data.type"
//               class="btn btn-danger"
//               (click)="this.clickConfirm()"
//               [innerText]="this.header|translate"></button>
//
//       <button type="button"
//               [hidden]="this.data.type === this.getTypeCancel()"
//               class="btn btn-primary"
//               (click)="this.clickConfirm()"
//               [innerText]="this.header|translate"></button>
//     </div>
//   `,
//   styles: [],
// })
// export class ConfirmDialogComponent {
//   header: string;
//   @Input() title: string;
//   @Input() data: any;
//
//   constructor(public ngBModal: NgbActiveModal,
//               public translate: TranslateService,) {
//   }
//
//   ngOnInit() {
//     if (!this.data.type) {
//       this.header = ('COMMON.LABEL.CONFIRM');
//     }else if (this.data.type === DIALOG_TYPE.CANCEL){
//       this.header = ('COMMON.LABEL.CANCEL');
//     }
//   }
//
//   clickConfirm() {
//     this.ngBModal.dismiss(true);
//   }
//
//   getTypeCancel(){
//     return DIALOG_TYPE.CANCEL;
//   }
// }
//
// export enum DIALOG_TYPE {
//   CONFIRM = 1,
//   CANCEL = 2,
// }
