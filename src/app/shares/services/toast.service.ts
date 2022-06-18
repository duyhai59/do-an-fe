import {Injectable, TemplateRef} from '@angular/core';
import { MESSAGE_TYPE } from '@core/components/base.component';
@Injectable({providedIn: 'root'})
export class ToastService {
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}): void {
    this.toasts.push({textOrTpl, ...options});
  }

  remove(toast): void {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  showMessage(textOrTpl, msgType: MESSAGE_TYPE): void {
    this.toasts.push({
      textOrTpl, classname: this.getMessageType(msgType),
      delay: 5000
    });
  }

  private getMessageType(msgType: MESSAGE_TYPE): string {
    switch (msgType) {
      case MESSAGE_TYPE.ERROR:
        return 'bg-danger text-light';
      case MESSAGE_TYPE.WARNING:
        return 'bg-warring text-light';
      default:
        return 'bg-success text-light';
    }
  }

  showStandard(textOrTpl): void {
    this.toasts.push({textOrTpl});
  }

  showSuccess(textOrTpl): void {
    this.toasts.push({textOrTpl, classname: 'bg-success text-light', delay: 5000});
  }

  showDanger(textOrTpl): void {
    this.toasts.push({textOrTpl, classname: 'bg-danger text-light', delay: 5000});
  }
}
