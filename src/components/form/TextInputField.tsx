import { Form, FormItemProps, Input, InputProps } from "antd";
import { ReactNode } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";

interface IInputFieldProps<TFormValues extends FieldValues>
	extends Omit<InputProps, "name"> {
	control: Control<TFormValues>;
	name: keyof TFormValues;
	label: ReactNode;
	required?: boolean;
	layout?: FormItemProps["layout"];
}

export const TextInputField = <TFormValues extends FieldValues>({
	control,
	name,
	layout = "vertical",
	label,
	required = false,
	...props
}: IInputFieldProps<TFormValues>) => {
	return (
		<Controller
			name={name as any}
			control={control}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<Form.Item
					validateStatus={error ? "error" : ""}
					help={error ? error.message : ""}
					label={label}
					layout={layout}
					required={required}
				>
					<Input onChange={onChange} value={value} {...props}/>
				</Form.Item>
			)}
		/>
	);
};
