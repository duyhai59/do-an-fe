// import {Component, Input} from "@angular/core";
// import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
// import {TranslateService} from "@ngx-translate/core";
//
// @Component({
//   selector: 'nb-notification-dialog',
//   template: `
//     <div class="modal-header">
//       <h5 class="modal-title">{{data.title}}</h5>
//       <button type="button" class="close" aria-label="Close" (click)="ngBModal.dismiss()">
//         <span aria-hidden="true">&times;</span>
//       </button>
//     </div>
//     <div class="modal-body" >
//        <p [innerText]="data.content"></p>
//     </div>
//     <div class="modal-footer">
//       <button type="button" class="btn btn-primary" (click)="ngBModal.dismiss()" translate="COMMON.LABEL.CLOSE"></button>
//     </div>
//   `,
//   styles: [],
// })
// export class NotificationDialogComponent {
//   @Input() data: any;
//
//   constructor(public ngBModal: NgbActiveModal,
//               public translate: TranslateService,) {
//   }
//
//   ngOnInit() {
//   }
//
//   clickConfirm() {
//     this.ngBModal.dismiss(true);
//   }
//
// }
