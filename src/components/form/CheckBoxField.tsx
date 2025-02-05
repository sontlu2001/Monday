import { Checkbox, CheckboxProps, Form, FormItemProps } from "antd";
import { Controller, FieldValues } from "react-hook-form";

interface ICheckboxFieldProps<TFormValues extends FieldValues>
	extends Omit<CheckboxProps, "name"> {
	name: keyof TFormValues;
	control: any;
	label: string;
	layout?: FormItemProps["layout"];
}

export const CheckBoxField = <TFormValues extends Record<string, any>>({
	name,
	control,
	label,
	layout = "horizontal",
	...props
}: ICheckboxFieldProps<TFormValues>) => {
	return (
		<Controller
			name={name as string}
			control={control}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<Form.Item
					label={label}
					validateStatus={error ? "error" : ""}
					help={error ? error.message : ""}
					layout={layout}
				>
					<Checkbox onChange={onChange} checked={!!value} {...props} />
				</Form.Item>
			)}
		/>
	);
};

export default CheckBoxField;
