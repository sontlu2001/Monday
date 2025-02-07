import { Form, FormItemProps, Input, InputProps, Select } from "antd";
import { memo } from "react";
import { Controller, FieldValues } from "react-hook-form";
import { formatCurrency } from "../../utils/utils";

interface ICurrencyInputFieldProps<TFormValues extends FieldValues>
	extends FormItemProps {
	control: any;
	name: keyof TFormValues;
	currencyCode: string;
	label: string;
	layout?: FormItemProps["layout"];
	inputProps?: InputProps;
	required?: boolean;
	placeHolder?: string;
	disabled?: boolean;
}

const CurrencyInputField = <TFormValues extends Record<string, any>>({
	control,
	name,
	currencyCode,
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
						addonBefore={currencyCode}
					/>
				</Form.Item>
			)}
		/>
	);
};

export default memo(CurrencyInputField) ;
