import {DatePipe} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {TokenStorage} from '../../shares/services/token-storage.service';
import {BaseService} from '../services/base.service';
import {BehaviorSubject} from 'rxjs';
import {ToastService} from '../../shares/services/toast.service';

export enum MESSAGE_TYPE {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
}

export class QueryParam {
  queryParams: object;

  constructor(queryParams: any) {
    this.queryParams = queryParams;
  }
}

export abstract class BaseComponent {
  protected mFormatDate: DatePipe = new DatePipe('en-US');
  loadingSubject = new BehaviorSubject<boolean>(false);
  btnLoadingSubject = new BehaviorSubject<boolean>(false);

  protected constructor(public httpSv: BaseService,
                        public translate: TranslateService,
                        public message: ToastService,
                        // public modalService: NzModalService,
                        public storage: TokenStorage,
  ) {
  }

  get loading() {
    return this.loadingSubject.getValue();
  }

  get loading$() {
    return this.loadingSubject.asObservable();
  }

  get btnLoading() {
    return this.btnLoadingSubject.getValue();
  }

  get btnLoading$() {
    return this.btnLoadingSubject.asObservable();
  }


  abstract onUpdateView(): void;

  createMessage(msg: string, type?: MESSAGE_TYPE): void {
    this.message.showMessage(msg, type);
  }

  showSystemErrorMsg(): void {
    this.createMessage('COMMON.ERROR.SYSTEM_ERROR', MESSAGE_TYPE.ERROR);
  }

  showServerErrorMsg(err: any): void {
    this.createMessage(err.error.message, MESSAGE_TYPE.ERROR);
  }

  abstract passFindByIdData(item: any, type?: any): void;

  abstract throwFindByIdException(data?): void;

  abstract findById(id, obj?: any): void;
}
