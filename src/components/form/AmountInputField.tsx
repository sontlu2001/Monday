import { FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { Controller } from "react-hook-form";
import { IAmountInputFieldProps } from "../../interface/form.interface";

export const AmountInputField = ({
  control,
  name,
  rules,
  ...props
}: IAmountInputFieldProps) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field: { onChange, value }, fieldState: { error } }) => {
      const formatCurrency = (amount: string) => {
        const numericValue = parseFloat(amount.replace(/[^\d.-]/g, ""));
        if (isNaN(numericValue)) return "";
        return numericValue.toFixed(2);
      };

      const handleFocus = () => {
        if (value) {
          onChange(value.toString().replace(/[^\d.-]/g, ""));
        }
      };

      const handleBlur = () => {
        if (value) {
          onChange(formatCurrency(value.toString()));
        }
      };

      return (
        <FormControl fullWidth error={!!error}>
        <InputLabel htmlFor={`filled-adornment-${name}`}>{props.label}</InputLabel>
        <OutlinedInput
          size="small"
          {...props}
          id={`filled-adornment-${name}`}
          value={value || props?.defaultValue}
          onChange={(e) => {
            const rawValue = e.target.value.replace(/[^\d.-]/g, "");
            onChange(rawValue);
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
        {error && <FormHelperText>{error.message}</FormHelperText>}
      </FormControl>
      )
    }}
  />
);

