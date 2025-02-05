import { Form, Radio, RadioGroupProps } from "antd";
import { Key } from "react";
import { Controller } from "react-hook-form";
import { IOption } from "../../interface/general.interface";

interface IRadioFieldProps<TFormValues, TValue extends Key>
	extends Omit<RadioGroupProps, "name" | "control"> {
	control: any;
	name: keyof TFormValues;
	options: IOption<TValue>[];
}

export const RadioField = <
	TFormValues extends Record<string, any>,
	TValue extends Key
>({
	control,
	name,
	options,
	...props
}: IRadioFieldProps<TFormValues, TValue>) => (
	<Controller
		name={name as string}
		control={control}
		render={({ field: { onChange, value }, fieldState: { error } }) => (
			<Form.Item
				validateStatus={error ? "error" : ""}
				help={error ? error.message : ""}
				{...props}
			>
				<Radio.Group onChange={onChange} value={value}>
					{options.map((option) => (
						<Radio key={option.value.toString()} value={option.value}>
							{option.label}
						</Radio>
					))}
				</Radio.Group>
			</Form.Item>
		)}
	/>
);

export default RadioField;
