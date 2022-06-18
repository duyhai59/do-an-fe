import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {FormBuilder, FormGroup, Validators,} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'base64-upload',
  styles: ['.hidden {display:none;}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <img [src]="imageSrc || './assets/images/noImage.png'"
           *ngIf="!isHidePreview"
           alt="Avatar" style="max-width: 160px !important; max-height: 160px !important;"/>
      <div class="row ">
        <input type="file" (change)="onFileChange($event)" #fileInput
               accept="image/*"
               nbInput fullWidth>
      </div>
      <div class="row " style="padding-top:8px" *ngIf="!isHideBtn">
        <div class="col-sm-6">
          <div class="form-group">
            <button nbButton (click)="clearFile()" outline status="danger" translate="COMMON.LABEL.CLEAR_FILE"></button>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <button type="submit" [disabled]="form.invalid || loading" nbButton outline status="primary"
                    [ngClass]="{'hidden':isHideSubmitBtn}">{{"COMMON.LABEL.UPLOAD_FILE"|translate}}
              <i class="fa fa-spinner fa-spin fa-fw" *ngIf="loading"></i></button>
          </div>
        </div>
      </div>

      <span *ngIf="!this.form.valid" class="text-danger">{{'COMMON.VALIDATION.UPLOAD_AVATAR' | translate}}</span>
      <!--<control-messages [myElement]="form.controls.avatar"></control-messages>-->

    </form>
  `
})
export class Base64UploadComponent implements OnInit {
  //TODO: imports ReactiveFormsModule to fix error: 'ng: Can't bind to 'formGroup' since it isn't a known property of 'form''
  CONST_FILE_SIZE: number = 1024 * 1024;
  form: FormGroup;
  loading: boolean = false;
  imageSrc: any;
  message: string;
  isValid: boolean = true;
  isHideSubmitBtn: boolean = false;

  // @ts-ignore
  @ViewChild('fileInput') fileInput: ElementRef;
  @Output() callUploader = new EventEmitter<string>();
  @Output() callFileChange = new EventEmitter<any>();
  @Input() isHideBtn: boolean = false;
  @Input() isHidePreview: boolean = false;
  @Input() type: string = 'base64';

  /*@Output()
    callBack = new EventEmitter<string>();*/

  constructor(private fb: FormBuilder,
              protected cd: ChangeDetectorRef,
              public translate: TranslateService,) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      avatar: [null, Validators.required],
      base64: [null]
    });
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file: File = event.target.files[0];
      if (file.size > this.CONST_FILE_SIZE) {
        this.fileInput.nativeElement.value = '';
        this.form.setErrors({'invalid': true});
        return;
      }
      reader.readAsDataURL(file);
      if (this.type === 'file') {
        reader.onloadend = () => {
          this.form.get('avatar').setValue(file);
          this.form.get('base64').setValue(reader.result);
          this.imageSrc = reader.result;
          this.cd.detectChanges();
          this.callFileChange.emit(this.form.value);
        };
      } else {
        reader.onloadend = () => {
          this.imageSrc = reader.result;
          this.form.get('avatar').setValue({
            fileName: file.name,
            fileType: file.type,
            value: reader.result
          });
          this.cd.detectChanges();
          this.callFileChange.emit(this.form.value);
        };
      }
    }
  }

  onSubmit() {
    this.loading = true;
    const formModel = this.form.value;
    this.callUploader.emit(formModel);
  }

  clearFile() {
    this.loading = false;
    this.imageSrc = null;
    this.form.reset();
    this.fileInput.nativeElement.value = '';
  }

  callback() {
    this.loading = false;
    this.isValid = true;
  }

  viewAvatar(avatar) {
    this.imageSrc = avatar;
  }

  getAvatar() {
    return this.form.value;
  }

  hideSubmitBtn() {
    this.isHideSubmitBtn = true;
  }

  showSubmitBtn() {
    this.isHideSubmitBtn = false;
  }
}
