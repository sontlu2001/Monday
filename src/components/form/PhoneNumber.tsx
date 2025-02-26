import {
	Form,
	FormItemProps,
	Input,
	InputProps,
	InputRef,
	Select,
	SelectProps,
} from "antd";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { useRef } from "react";

interface IInputPhoneNumberProps<TFormValues extends FieldValues>
	extends SelectProps {
	control: Control<TFormValues>;
	phoneCode: Path<TFormValues>;
	phoneName: Path<TFormValues>;
	label: string;
	required?: boolean;
	layout?: FormItemProps["layout"];
	inputProps?: InputProps;
}

const PhoneNumberInput = <TFormValues extends FieldValues>({
	control,
	phoneCode,
	options,
	phoneName,
	inputProps,
	label,
	layout = "vertical",
	required = false,
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
					colon={false}
					label={label}
					layout={layout}
					required={required}
				>
					<Input
						{...inputProps}
						ref={inputRef}
						onChange={onChange}
						value={value}
						addonBefore={
							<Controller
								name={phoneCode}
								control={control}
								render={({ field: selectField }) => (
									<Select
										showSearch
										value={selectField.value}
										onChange={(value) => {
											selectField.onChange(value);
											inputRef.current?.focus();
										}}
										popupMatchSelectWidth={90}
										labelRender={(option) => <span>+{option.label}</span>}
										optionRender={(option) => <span>+{option.label}</span>}
										filterOption={(input, option) => {
											const searchValue = input.replace(/^\+|\s+/g, '').toLowerCase();
											return String(option?.label).toLowerCase().includes(searchValue);
										}}
										{...props}
										options={options}
									/>
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
