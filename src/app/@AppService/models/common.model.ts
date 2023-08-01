
export interface BaseResult {
  result: number;
  message: string;
}

export interface RequestDto<T> {
  language: number;
  requestData: T;
}

