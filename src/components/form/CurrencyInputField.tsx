import { Form, FormItemProps, Input, InputProps, Select } from "antd";
import { memo } from "react";
import { Controller, FieldValues } from "react-hook-form";
import { IOption } from "../../interface/general.interface";
import { formatCurrency } from "../../utils/utils";

interface ICurrencyInputFieldProps<TFormValues extends FieldValues>
	extends FormItemProps {
	control: any;
	name: keyof TFormValues;
	currencyName: keyof TFormValues;
	options: IOption<string>[];
	label: string;
	layout?: FormItemProps["layout"];
	inputProps?: InputProps;
	required?: boolean;
	placeHolder?: string;
	defaultCurrency?: string;
	disabled?: boolean;
}

const CurrencyInputField = <TFormValues extends Record<string, any>>({
	control,
	options,
	name,
	currencyName,
	inputProps,
	label,
	layout,
	required = false,
	placeHolder,
	disabled = false,
	...props
}: ICurrencyInputFieldProps<TFormValues>) => {
	return (
		<Controller
			name={name as any}
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
						placeholder={placeHolder}
						onChange={(e) => {
							let formattedValue = e.target.value.replace(/,/g, "");
							if (formattedValue.includes(".")) {
								const [integerPart, decimalPart] = formattedValue.split(".");
    						formattedValue = `${integerPart}.${decimalPart.slice(0, 2)}`;
							}
							onChange(formattedValue);
						}}
						value={formatCurrency(value)}
						disabled={disabled}
						addonBefore={
							<Controller
								name={currencyName as any}
								control={control}
								render={({ field: selectField }) => (
									<Select
										value={selectField.value}
										onChange={(value) => selectField.onChange(value)}
										style={{ width: 90 }}
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

export default memo(CurrencyInputField) ;
