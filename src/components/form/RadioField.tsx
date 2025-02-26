import { Form, FormItemProps, Radio, RadioGroupProps } from "antd";
import { ReactNode } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface IRadioFieldProps<TFormValues extends FieldValues>
	extends RadioGroupProps {
	control: Control<TFormValues>;
	name: Path<TFormValues>;
	label: ReactNode;
	required?: boolean;
	layout?: FormItemProps["layout"];
}

export const RadioField = <TFormValues extends FieldValues>({
	control,
	name,
	options,
	label,
	layout = "vertical",
	required = false,
	...props
}: IRadioFieldProps<TFormValues>) => (
	<Controller
		name={name}
		control={control}
		render={({ field: { onChange, value }, fieldState: { error } }) => (
			<Form.Item
				validateStatus={error ? "error" : ""}
				help={error ? error.message : ""}
				layout={layout}
				required={required}
				label={label}

			>
				<Radio.Group
					onChange={onChange}
					value={value}
					options={options}
					{...props}
				/>
			</Form.Item>
		)}
	/>
);

export default RadioField;
