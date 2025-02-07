import dayjs from "dayjs";
import { tLocalStorageKey, tSessionStorageKey } from "../types/common.type";
import { CURRENCY_REGEX } from "../constants/regex.constant";
import borrowerApi from "../api/module/borrower.api";
import { COMMON_CONFIG_KEYS } from "../constants/general.constant";
import { IOption } from "../interface/general.interface";

export const parseJSON = <T>(value: string | null): T | string | null => {
	try {
		return value ? JSON.parse(value) : null;
	} catch {
		return value;
	}
};

export const getLocalStorage = (key: tLocalStorageKey): any => {
	return parseJSON(localStorage.getItem(key));
};

export const setLocalStorage = (key: tLocalStorageKey, value: any): void => {
	localStorage.setItem(key, JSON.stringify(value ?? ""));
};

export const getSessionStorage = (key: tSessionStorageKey | any): any => {
	return parseJSON(sessionStorage.getItem(key));
};

export const setSessionStorage = (
	key: tSessionStorageKey | any,
	value: any
): void => {
	sessionStorage.setItem(key, JSON.stringify(value ?? ""));
};

export const convertTimeStringToDayjs = (
	date: string,
	format = "YYYY-DD-MM"
) => {
	const convertedDate = dayjs(date, format);
	if (!convertedDate.isValid()) {
		return null;
	}
	return convertedDate;
};

export const convertDayjsToTimeString = (date: any, format = "YYYY-DD-MM") => {
	if (!date || !date.isValid()) {
		return "";
	}
	return date.format(format);
};

export const formatDate = (date?: string, format = "YYYY-MM-DD") => {
	if (!date) return "";
	return dayjs(date).format(format);
};

export const formatCurrency = (value: string| number): string => {
	if (!value) return "0";

	if (typeof value === "number") {
    value = value.toString();
  }
	return value.replace(CURRENCY_REGEX, ',');
}

export const formatPhoneNumber = (phoneCode: string, handPhone: string, listPhoneNumber: IOption<string>[]): string => {
		const phoneCodeValue = listPhoneNumber.find((item) => item.value === phoneCode)?.label || "";
		return `+${phoneCodeValue} ${handPhone}`;
};
export const calculateAverage = (numbers?: (string | number)[]): number => {
  if (!numbers || numbers.length === 0) return 0;

  const numericValues = numbers
    .map((num) => (typeof num === "string" ? parseFloat(num) : num))
    .filter((num) => !isNaN(num));

  if (numericValues.length === 0) return 0;

  const total = numericValues.reduce((sum, num) => sum + num, 0);
  const average = total / numericValues.length;
  return roundToTwoDecimal(average);
};

export const calcYearlyIncome = (value: number): number => {
	return roundToTwoDecimal(value * 12);
}

export const calcYearlyAverage = (value: number): number => {
	return roundToTwoDecimal(value / 12);
}

export const roundToTwoDecimal = (value: number): number => {
  return parseFloat(value.toFixed(2));
};


/**
 * Removes keys with falsy values from an object.
 * @param obj - The object to clean.
 * @returns A new object with falsy values removed.
 */

export const removeFalsyValues = <T extends Record<string, any>>(obj: T): Partial<T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => Boolean(value))
  ) as Partial<T>;
};

export const getMasterDataName = (
	options: IOption<string>[],
	optionValue: string
) => {
	const option = options.find((opt) => opt.value === optionValue);
	return option ? option.name : "";
};

export const getCurrencyCode = (currency: string): string => {
	return currency.split("_")[0].toUpperCase();
};

export const getFutureDate = (days: number, format = "DD/MM/YYYY"): string => {
	return dayjs().add(days, 'day').utc().format();
}

export const calcAdminFee = (loanAmount: number, adminFeeRate: number, currencyCode: string) => {
	return `${currencyCode} ${formatCurrency(loanAmount * adminFeeRate)}`;
}