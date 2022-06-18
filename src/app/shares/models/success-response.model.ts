import {BaseResponse} from './base-response';

export class SuccessResponse extends BaseResponse {
  data: any;
  total: number;
  pages: number;
}
