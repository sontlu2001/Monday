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
