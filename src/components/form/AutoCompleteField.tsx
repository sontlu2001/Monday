import type { AutoCompleteProps } from "antd";
import { AutoComplete, Form } from "antd";
import { FormItemLayout } from "antd/es/form/Form";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface AutoCompleteComponentProps<T extends FieldValues>
	extends AutoCompleteProps {
	name: Path<T>;
	control: Control<T>;
	label: string;
	layout: FormItemLayout;
	required?: boolean;
}

const AutoCompleteInputField = <T extends FieldValues>({
	name,
	control,
	label,
	layout,
	required= false,
	...props
}: AutoCompleteComponentProps<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<Form.Item
					label={label}
					layout={layout}
					validateStatus={error ? "error" : ""}
					help={ error?.message || ''}
					required= {required}
				>
					<AutoComplete { ...field} {...props}>
						{props.children}
					</AutoComplete>
				</Form.Item>
			)}
		/>
	);
};

export default AutoCompleteInputField;
