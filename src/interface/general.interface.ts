import { ReactNode } from "react";

export interface IOption<tValue = any> {
	id?: number;
	value: tValue;
	label: ReactNode;
	name?: string;
}

export interface IValidationRule {
	required?: boolean | string;
	pattern?: RegExp | { value: RegExp; message: string };
	maxLength?: number | { value: number; message: string };
	minLength?: number | { value: number; message: string };
}