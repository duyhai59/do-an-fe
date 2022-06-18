import {BaseResponse} from './base-response';

export class ErrorResponse extends BaseResponse {
  status?: number;

  constructor(status: number,  message: string) {
    super();
    this.status = status;
    this.message = message;
  }
}
