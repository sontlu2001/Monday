import { Form, TimePicker, TimePickerProps } from "antd";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";

interface ITimePickerFieldProps<TFormValues>
	extends Omit<TimePickerProps, "name" | "control"> {
	name: keyof TFormValues;
	control: any;
}

export const TimePickerField = <TFormValues extends Record<string, any>>({
	control,
	name,
	...props
}: ITimePickerFieldProps<TFormValues>) => (
	<Controller
		name={name as string}
		control={control}
		render={({ field: { onChange, value }, fieldState: { error } }) => (
			<Form.Item
				validateStatus={error ? "error" : ""}
				help={error ? error.message : ""}
			>
				<TimePicker
					value={value ? dayjs(value) : null}
					onChange={(time) => onChange(time ? time.format("HH:mm:ss") : null)}
					{...props}
				/>
			</Form.Item>
		)}
	/>
);

export default TimePickerField;
