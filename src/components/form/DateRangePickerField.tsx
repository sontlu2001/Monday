import { DatePicker, Form, FormItemProps } from "antd";
import { Control, Controller, FieldValues } from "react-hook-form";
import utc from "dayjs/plugin/utc";
import dayjs, { Dayjs } from "dayjs";

dayjs.extend(utc);

const { RangePicker } = DatePicker;

interface IDateRangePickerFieldProps<TFormValues extends FieldValues> {
  control: Control<TFormValues>;
  name: keyof TFormValues;
  label?: string;
  layout?: FormItemProps["layout"];
  required?: boolean;
}

const DateRangePickerField = <TFormValues extends FieldValues>({
  control,
  name,
  label,
  layout = "vertical",
  required = false,
}: IDateRangePickerFieldProps<TFormValues>) => (
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
        <RangePicker
          className="w-full"
          value={value ? [dayjs(value[0]), dayjs(value[1])] as [Dayjs, Dayjs] : null}
          onChange={(dates) => {
            const utcDates = dates
              ? (dates as [Dayjs, Dayjs]).map((date) =>
                  date ? date.utc().format() : null
                )
              : null;
            onChange(utcDates);
          }}
        />
      </Form.Item>
    )}
  />
);

export default DateRangePickerField;
