import { assert } from "is-any-type";

export interface ApiResponse {
  statusCode: number;
  statusMessage: string;
  data?: any;
}

export function apiResponse(code: number, message: string, data?: any): ApiResponse {
  if (assert.isNull(data as any)) {
    return {
      statusCode: code,
      statusMessage: message,
    };
  } else {
    return {
      statusCode: code,
      statusMessage: message,
      data,
    };
  }
}
