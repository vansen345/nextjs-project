export interface BaseResponse<T> {
  status: string;
  timesv: string;
  total: number;
  limit: number;
  offset: number;
  elements: T;
}

export interface BaseResponseObject<T> {
  status: string;
  timesv: string;
  total: number;
  limit: number;
  offset: number;
  elements: T;
}

export type TResponseStatus =
    | 'success' // db
    | 'error' // db
    | 'fail'; // axios

export interface IResponse<T> {
    status: TResponseStatus;
    elements?: T;
    message?: string;
}
