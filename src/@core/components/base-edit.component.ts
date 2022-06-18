import * as moment from 'moment';
import {isBoolean} from 'util';
import {TranslateService} from '@ngx-translate/core';
import {TokenStorage} from '../../shares/services/token-storage.service';
import {BaseService} from '../services/base.service';
import {BaseComponent} from './base.component';
import {BaseModel} from '../model/base.model';
import {FormGroup} from '@angular/forms';
import {delay, map, tap} from 'rxjs/operators';
import {combineLatest, of} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ToastService} from '../../shares/services/toast.service';

abstract class BaseName {
  abstract setPageTitle(title: string): void;
}

export abstract class BaseEditComponent extends BaseComponent {
  baseForm: FormGroup;
  protected title: string;

  protected constructor(public httpSv: BaseService,
                        public translate: TranslateService,
                        public message: ToastService,
                        // public modalService: NzModalService,
                        public storage: TokenStorage,
                        public activatedRoute: ActivatedRoute) {
    super(httpSv, translate, message, /*modalService,*/ storage);
  }

  setPageTitle(head: string, title: string): void {
    this.title = `${head} ${this.translate.instant(title)}`;
  }

  initialForm(): void {
    combineLatest(this.activatedRoute.queryParams).pipe(
      map(params => {
        const p: any = params[0];
        let titleForm = this.translate.instant('COMMON.LABEL.ADD');
        if (Object.keys(p).length > 0) {
          titleForm = this.translate.instant('COMMON.LABEL.EDIT');
          this.findById(p.id);
        } else {
          this.createForm();
        }
        this.setPageTitle(titleForm, 'USER_TYPE.TITLE');
      })
    ).subscribe();
  }

  abstract createForm(isUpdate?: boolean): void;

  findById(id, obj?: any): void {
    if (id) {
      this.loadingSubject.next(true);
      this.btnLoadingSubject.next(true);
      this.httpSv.findById(id, obj).pipe(
        delay(50),
        tap(response => {
          if (response && response.code === '200') {
            return of(this.passFindByIdData(response.data.rs[0], obj)).pipe(map(() => true));
          }
          return of(this.throwFindByIdException());
        }),
        tap((isUpdate) => {
          if (isUpdate) {
            this.createForm(isUpdate);
          }
          this.loadingSubject.next(false);
          this.btnLoadingSubject.next(false);
        }),
        tap(() => this.onUpdateView())
      ).subscribe();
    } else {
      this.throwFindByIdException();
    }
  }

  createPayload(req: BaseModel, isUpdate?: boolean): any {
    const rq = req;
    const param = Object.keys(rq);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < param.length; i++) {
      if (rq[param[i]] === undefined || rq[param[i]] === null) {
        rq[param[i]] = '';
      } else if (isBoolean(rq[param[i]])) {
        rq[param[i]] = rq[param[i]] ? 1 : 0;
      } else {
        // not null
        if (moment.isMoment(rq[param[i]])) {
          rq[param[i]] = rq[param[i]].format('DD/MM/YYYY');
        }
      }
    }
    if (!isUpdate) {
      delete rq.id;
    }
    return rq;
  }

  onSubmit(isClose?: boolean): void {
    if (this.baseForm.invalid) {
      return;
    }
    const controls = this.baseForm.controls;
    if (this.baseForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    const edited: BaseModel = this.baseForm.getRawValue();
    const isUpdate = edited.id > 0;
    this.loadingSubject.next(true);
    const req = this.createPayload(edited, isUpdate);
    let taskCRUD$ = this.httpSv.create(req);
    if (isUpdate) {
      taskCRUD$ = this.httpSv.update(req);
    }
    taskCRUD$.pipe(
      tap(res => {
        this.loadingSubject.next(false);
        if (res && res.code === '200') {
          this.createMessage(res.message);
          if (!isUpdate) {
            this.baseForm.reset();
          }
        }
      })
    ).subscribe(() => {
      }, error => {
        this.loadingSubject.next(false);
        this.showServerErrorMsg(error);
      }
    );
  }
}
