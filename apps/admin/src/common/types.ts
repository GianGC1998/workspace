import { AxiosError } from 'axios';

export declare type LiteralUnion<T extends U, U> = T | (U & {});

export type ApiErrorResponse = {
  message: string;
};

export type ApiAxiosError = AxiosError<ApiErrorResponse>;
