import { DefaultOptionType } from "antd/es/select";
import { IApplication } from "./application.interface";
import { IBorrower } from "./borrower.interface";

export interface IGlobalSearch {
  application: IApplication[],
  borrower: IBorrower[]
}

export interface ISearchOption extends DefaultOptionType {
	value: any;
	label: JSX.Element;
	path: string;
}

export interface IGroupedOption {
	label: JSX.Element;
	options: ISearchOption[];
}