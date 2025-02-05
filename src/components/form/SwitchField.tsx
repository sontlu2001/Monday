import { Controller, FieldValues } from "react-hook-form";
import { Switch, Form, FormItemProps, SwitchProps } from "antd";

interface ISwitchFieldProps<TFormValues extends FieldValues>
	extends SwitchProps {
	name: keyof TFormValues;
	control: any;
	label: string;
	layout?: FormItemProps["layout"];
}

export const SwitchField = <TFormValues extends Record<string, any>>({
	name,
	control,
	label,
	layout = "horizontal",
	...props
}: ISwitchFieldProps<TFormValues> & SwitchProps) => {
	return (
		<Controller
			name={name as string}
			control={control}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<Form.Item
					label={label}
					layout={layout}
					validateStatus={error ? "error" : ""}
					help={error ? error.message : ""}
				>
					<Switch checked={!!value} onChange={onChange} {...props} />
				</Form.Item>
			)}
		/>
	);
};

export default SwitchField;
