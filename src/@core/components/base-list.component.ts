import * as moment from 'moment';
import {isBoolean} from 'util';
import {delay, tap} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {TokenStorage} from '../../shares/services/token-storage.service';
import {BaseService} from '../services/base.service';
import {BaseComponent} from './base.component';
import {BehaviorSubject, of} from 'rxjs';
import {ToastService} from '../../shares/services/toast.service';

export class PagingInput {
  pageNum: number;
  pageSize: number;

  constructor(pageNum = 1, pageSize = 10) {
    this.pageNum = pageNum;
    this.pageSize = pageSize;
  }
}

export interface GetListPayload {
  keyword: string;
}

export class Paging {
  listOfData: Array<any>;
  sizeOfData: number;
  pageNum: number;
  pageSize: number;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.listOfData = [];
    this.sizeOfData = 0;
    this.pageNum = 1;
    this.pageSize = 10;
  }
}

export abstract class BaseListComponent extends BaseComponent {
  public page$: BehaviorSubject<Paging> = new BehaviorSubject<Paging>(new Paging());

  protected constructor(public httpSv: BaseService,
                        public translate: TranslateService,
                        public message: ToastService,
                        // public modalService: NzModalService,
                        public storage: TokenStorage) {
    super(httpSv, translate, message,/* modalService, */ storage);
    this.page$.subscribe(p => {
      this.search(p);
    });
  }

  get page(): Paging {
    return this.page$.getValue();
  }

  /**
   * Use when you want to keep current PageSize, PageNum
   */
  search(page?: Paging): void {
    this.loadingSubject.next(true);
    const rq = this.formatPayload();
    if (page) {
      rq.pageNum = page.pageNum;
      rq.pageSize = page.pageSize;
    } else {
      rq.pageNum = 1;
      rq.pageSize = 10;
    }
    this.httpSv.getList(rq).pipe(
      tap((data) => {
        this.loadingSubject.next(false);
        this.passListData(data);
      }),
      tap(() => this.onUpdateView())
    ).subscribe();
  }

  /**
   * Use when you want to reset PageSize, PageNum
   */
  newSearch(): void {
    const p: Paging = this.page$.getValue();
    p.pageNum = 1;
    this.page$.next(p);
  }

  onPageIndexChange(pageIndex): void {
    this.page.pageNum = pageIndex;
    this.page$.next(this.page);
  }

  onPageSizeChange(pageSize): void {
    this.page.pageSize = pageSize;
    this.page$.next(this.page);
  }

  abstract passListData(data: any): void;

  abstract getListPayload(): GetListPayload;

  formatPayload(): any {
    const rq = this.getListPayload();
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
    return rq;
  }

  findById(id, obj?: any): void {
    if (id) {
      this.btnLoadingSubject.next(true);
      this.httpSv.findById(id, obj).pipe(
        delay(50),
        tap(res => {
          if (res && res.code === '200') {
            this.passFindByIdData(res.data.rs[0], obj);
          }
          return of(this.throwFindByIdException());
        }),
        tap(() => this.btnLoadingSubject.next(false)),
        tap(() => this.onUpdateView())
      ).subscribe();
    } else {
      this.throwFindByIdException();
    }
  }

  deleteById(id): void {
    if (id) {
      this.btnLoadingSubject.next(true);
      this.httpSv.deleteById(id).pipe(
        delay(50),
        tap(res => {
          this.btnLoadingSubject.next(false);
          if (res && res.code === '200') {
            this.createMessage(res.message);
            return this.search(this.page);
          }
          return of(this.throwFindByIdException());
        }),
      ).subscribe(() => {
      }, error => {
        this.btnLoadingSubject.next(false);
        this.showServerErrorMsg(error);
      });
    } else {
      this.throwFindByIdException();
    }
  }

  showModalConfirmDelete(id: any): void {
    // this.modalService.error({
    //   nzTitle: this.translate.instant('COMMON.LABEL.CONFIRM_DELETE'),
    //   nzOkText: this.translate.instant('COMMON.LABEL.YES'),
    //   nzOkType: 'danger',
    //   nzOnOk: () => this.deleteById(id),
    //   nzCancelText: this.translate.instant('COMMON.LABEL.NO'),
    //   nzOnCancel: () => console.log('Cancel')
    // });
  }

  public getColName(column, row): void {
    // const txtActive = this.translate.instant('COMMON.LABEL.ACTIVE');
    // const txtDeactivate = this.translate.instant('COMMON.LABEL.DEACTIVATE');
    // const txtWaitingActive = this.translate.instant('COMMON.LABEL.WAITING_ACTIVE');
    // const active = `<span class="badge badge-primary badge-pill">${txtActive}</span>`;
    // const deactivate = `<span class="badge badge-danger badge-pill">${txtDeactivate}</span>`;
    // const waitingActive = `<span class="badge badge-warning badge-pill">${txtWaitingActive}</span>`;
    switch (column.name) {
      // case 'D_CREATED_DATE' :
      //   return this.mFormatDate.transform(row[column.name], 'dd/MM/yyyy');
      // case 'D_HARVEST_DATE' :
      //   return this.mFormatDate.transform(row[column.name], 'dd/MM/yyyy');
      // case 'D_REQUEST_DATE' :
      //   return this.mFormatDate.transform(row[column.name], 'dd/MM/yyyy');
      // case 'S_STATUS' :
      //   const status = row[column.name];
      //   if (status === 'A') {
      //     return active;
      //   } else if (status === 'WA') {
      //     return waitingActive;
      //   }
      //   return deactivate;
      // case 'N_STATUS' :
      //   const ss = row[column.name];
      //   if (ss === 1 || ss === '1') {
      //     return active;
      //   }
      //   return deactivate;
      // case 'S_TYPE_OB' :
      //   const rs = row[column.name];
      //   if (rs) {
      //     const arr: any[] = JSON.parse(rs);
      //     return arr.map(item => item.S_NAME).join(', ');
      //   }
      //   return rs;
      default:
        return row[column.name];
    }
  }

}
