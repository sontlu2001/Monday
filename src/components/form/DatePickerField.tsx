import { DatePicker, DatePickerProps, Form, FormItemProps } from "antd";
import { Control, Controller, FieldValues } from "react-hook-form";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";

dayjs.extend(utc);
interface IDatePickerFieldProps<TFormValues extends FieldValues>
	extends Omit<DatePickerProps, "name"> {
	control: Control<TFormValues>;
	name: keyof TFormValues;
	label?: string;
	layout?: FormItemProps["layout"];
	required?: boolean;
}

const DatePickerField = <TFormValues extends FieldValues>({
	control,
	name,
	label,
	layout = "vertical",
	required = false,
	...props
}: IDatePickerFieldProps<TFormValues>) => (
	<Controller
		name={name as any}
		control={control}
		render={({ field: { onChange, value }, fieldState: { error } }) => (
			<Form.Item
				validateStatus={error ? "error" : ""}
				help={error ? error.message : ""}
				label={label}
				layout={layout}
				required={required}
			>
				<DatePicker
					className="w-full"
					{...props}
					value={value ? dayjs(value) : null}
					onChange={(date) => {
						const utcDate = date ? date.utc().format() : null;
						onChange(utcDate);
					}}
				/>
			</Form.Item>
		)}
	/>
);

export default DatePickerField;
