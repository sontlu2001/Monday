export interface IMeta {
	code: number;
	message: string;
}

export interface IResponse<T> {
	type: string;
	title: string;
	status: number;
	instance: string;
	message: string;
	params: string;
	path: string;
	detail: T;
}
export interface IErrorsResponse {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  properties: {
    message: string;
    params: string;
    path: string;
  };
  cause: string | null;
}

