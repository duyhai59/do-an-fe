// import {Component, EventEmitter, Input} from "@angular/core";
// import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
// import {TranslateService} from "@ngx-translate/core";
//
// @Component({
//   selector: 'nb-delete-dialog',
//   template: `
//     <div class="modal-header">
//       <h5 class="modal-title" [innerText]="title"></h5>
//       <button type="button" class="close" aria-label="Close" (click)="ngBModal.dismiss()">
//         <span aria-hidden="true">&times;</span>
//       </button>
//     </div>
//     <div class="modal-body" translate="COMMON.LABEL.CONFIRM_DELETE">
//
//     </div>
//     <div class="modal-footer">
//       <button type="button" class="btn btn-light" (click)="ngBModal.dismiss()" translate="COMMON.LABEL.CLOSE"></button>
//       <button type="button" class="btn btn-danger" (click)="this.clickDelete()"
//               translate="COMMON.LABEL.DELETE"></button>
//     </div>
//   `,
//   styles: [],
// })
// export class DeleteDialogComponent {
//   @Input() type: string;
//   @Input() title: string;
//   @Input() subTitle: string;
//   @Input() item: any;
//   onAdd = new EventEmitter();
//
//   constructor(public ngBModal: NgbActiveModal,
//               public translate: TranslateService,) {
//   }
//
//   ngOnInit() {
//   }
//
//   clickDelete() {
//     this.ngBModal.dismiss(true);
//   }
//
// }
