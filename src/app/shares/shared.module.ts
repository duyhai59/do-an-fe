import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {TrimDirective} from './directives/trim.directive';
import {SafeHtmlPipe} from './pipes/safe-html';
import {ErrorMessageComponent} from './validation/error-messages.component';
import {Base64UploadComponent} from './components/base64-upload.component';
import {HttpUtilService} from './services/http-util.service';
import {TokenStorage} from './services/token-storage.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastService} from './services/toast.service';
import {ToastContainer} from './components/toast-container.component';
import {RequiredPipe} from './pipes/required.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  entryComponents: [
    // DeleteDialogComponent,
    // ConfirmDialogComponent,
    // NotificationDialogComponent
  ],
  declarations: [
    // DeleteDialogComponent,
    // ConfirmDialogComponent,
    // NotificationDialogComponent,

    RequiredPipe,
    ToastContainer,
    ErrorMessageComponent,
    Base64UploadComponent,
    TrimDirective,
    SafeHtmlPipe
  ],
  exports: [
    // DeleteDialogComponent,
    // ConfirmDialogComponent,
    // NotificationDialogComponent,
    RequiredPipe,
    ToastContainer,
    ErrorMessageComponent,
    Base64UploadComponent,
    TrimDirective,
    SafeHtmlPipe],
  providers: [
    ToastService,
    HttpUtilService,
    TokenStorage,
  ]

})
export class SharedModule {
}
