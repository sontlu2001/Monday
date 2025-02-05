import { Form, FormItemProps, Input, InputProps, InputRef, Select } from "antd";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { IOption } from "../../interface/general.interface";
import { useRef } from "react";

interface IInputPhoneNumberProps<TFormValues extends FieldValues>
	extends FormItemProps {
	control: Control<TFormValues>;
	phoneCode: Path<TFormValues>;
	phoneName: Path<TFormValues>;
	options: IOption<string>[];
	label: string;
	required?: boolean;
	layout?: FormItemProps["layout"];
	inputProps?: InputProps;
	placeHolder?: string;
}

const PhoneNumberInput = <TFormValues extends Record<string, any>>({
	control,
	phoneCode,
	options,
	phoneName,
	inputProps,
	label,
	layout = "vertical",
	required = false,
	placeHolder,
	...props
}: IInputPhoneNumberProps<TFormValues>) => {
	const inputRef = useRef<InputRef>(null);

	return (
		<Controller
			name={phoneName}
			control={control}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<Form.Item
					validateStatus={error ? "error" : ""}
					help={error ? error.message : ""}
					{...props}
					colon={false}
					label={label}
					layout={layout}
					required={required}
				>
					<Input
						{...inputProps}
						placeholder={placeHolder}
						ref={inputRef}
						onChange={onChange}
						value={value}
						addonBefore={
							<Controller
								name={phoneCode}
								control={control}
								render={({ field: selectField }) => (
									<Select
										{...selectField}
										showSearch
										value={selectField.value}
										onChange={(value) => {
											selectField.onChange(value);
											inputRef.current?.focus();
										}}
										style={{ width: 90 }}
										filterOption={(input, option) =>
											option?.props.children.toLowerCase().includes(input.toLowerCase()) ||
											option?.props.value.toLowerCase().includes(input.toLowerCase())
										}
									>
										{options.map((option) => (
											<Select.Option key={option.value} value={option.value}>
												{option.label}
											</Select.Option>
										))}
									</Select>
								)}
							/>
						}
					/>
				</Form.Item>
			)}
		/>
	);
};

export default PhoneNumberInput;
