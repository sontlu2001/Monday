import { Form, FormItemProps, Input } from "antd";
import { TextAreaProps } from "antd/es/input/TextArea";
import { Control, Controller, FieldValues } from "react-hook-form";

interface ITextAreaFieldProps<TFormValues extends FieldValues>
	extends Omit<TextAreaProps, "name"> {
	control: Control<TFormValues>;
	name: keyof TFormValues;
	label: string;
	layout?: FormItemProps["layout"];
}

export const TextAreaField = <TFormValues extends FieldValues>({
	control,
	name,
	layout = "vertical",
	label,
	...props
}: ITextAreaFieldProps<TFormValues>) => {
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
				>
					<Input.TextArea onChange={onChange} value={value} {...props} />
				</Form.Item>
			)}
		/>
	);
};
