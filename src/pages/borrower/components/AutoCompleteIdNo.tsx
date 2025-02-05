import { AutoComplete, AutoCompleteProps, Button, Form, Input, Spin } from "antd";
import { FormItemProps } from "antd/es/form";
import { Control, Controller, FieldValues } from "react-hook-form";
import { IOption } from "../../../interface/general.interface";


interface IAutocompleteFieldProps<TFormValues extends FieldValues>
	extends Omit<AutoCompleteProps, "options"> {
	control: Control<TFormValues>;
	name: keyof TFormValues;
	label: string;
	layout?: FormItemProps["layout"];
	options: IOption<string>[];
	required?: boolean,
	loading?: boolean;
}

export const AutoCompleteIdNo = <TFormValues extends FieldValues>({
	control,
	name,
	options,
	label,
	layout = "vertical",
	loading,
	required = false,
	...props
}: IAutocompleteFieldProps<TFormValues>) => {

	return (
		<Controller
			name={name as any}
			control={control}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<Form.Item
					label={label}
					style={{ flexGrow: 1 }}
					validateStatus={error ? "error" : ""}
					help={error?.message || ""}
					labelCol={layout === "horizontal" ? { span: 8 } : undefined}
					wrapperCol={layout === "horizontal" ? { span: 16 } : undefined}
					layout={layout}
					required={required}
				>
					<div className="flex">
						<AutoComplete
							{...props}
							options={options}
							className="flex-grow"
							onChange={onChange}
							value={value}
							notFoundContent={loading ? <Spin size="small" /> : "No results"}
						>
						</AutoComplete>
						<Button type="primary">
							Search DNB
						</Button>
					</div>
				</Form.Item>
			)}
		/>
	);
};