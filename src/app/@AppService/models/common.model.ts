
export interface BaseResult {
  result: number;
  message: string;
}

export interface RequestDto<T> {
  language: number;
  requestData: T;
}

export interface rate {
  code: string;
  exchanger: bigint | number;
}

export interface currencySymbol {
  code: string;
  text: string;
}

