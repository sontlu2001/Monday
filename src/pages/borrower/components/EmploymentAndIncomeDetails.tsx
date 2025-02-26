import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import CurrencyInputField from "../../../components/form/CurrencyInputField";
import DatePickerField from "../../../components/form/DatePickerField";
import { useBorrowerDetailContext } from "../../../context/BorrowerDetailContext";
import { calculateAverage, calcYearlyAverage, calcYearlyIncome, getCurrencyCode } from "../../../utils/utils";
import SelectInputField from "../../../components/form/SelectInputField";
import { TextInputField } from "../../../components/form/TextInputField";
import { countries } from "../constants/borrower.constant";

export default function EmploymentAndIncomeDetails() {
	const { control, setValue } = useFormContext();
	const [currencyCode, setCurrencyCode] = useState<string>("");

	const { configOptions } = useBorrowerDetailContext();

	const month1Income = useWatch({
		control,
		name: "month1Income",
		defaultValue: 0,
	});

	const month2Income = useWatch({
		control,
		name: "month2Income",
		defaultValue: 0,
	});

	const month3Income = useWatch({
		control,
		name: "month3Income",
		defaultValue: 0,
	});

	const amountOfNoa = useWatch({
		control,
		name: "amountOfNoa",
		defaultValue: 0,
	});

	const nationality = useWatch({
		control,
		name: "nationality",
	});

	const countryAddress = useWatch({
    control,
    name: "countryAddress",
  });

	useEffect(() => {
		if (month1Income || month2Income || month3Income) {
			const grossMonthlyIncome = calculateAverage([month1Income, month2Income, month3Income]);
			setValue("grossMonthlyIncome", grossMonthlyIncome);
			setValue("annualIncome", calcYearlyIncome(grossMonthlyIncome));
		}
		else {
			setValue("annualIncome", amountOfNoa);
			setValue("grossMonthlyIncome", calcYearlyAverage(amountOfNoa));
		}
	}, [month1Income, month2Income, month3Income, amountOfNoa, setValue]);

	useEffect(() => {
		if (nationality){
			setCurrencyCode(getCurrencyCode(nationality));
		}
	}, [nationality]);
	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-2">
			<SelectInputField
				control={control}
				name="employeeStatus"
				options={configOptions.listEmploymentStatus}
				label="Employment Status"
				placeholder="Select Employment Status"
				required={countryAddress === countries.SINGAPORE}
			/>
			<TextInputField
				control={control}
				name="currEmployer"
				label="Current Employer Name"
				placeholder="Enter Employer Name"
			/>
			<SelectInputField
				control={control}
				name="specialization"
				options={configOptions.listSpecialisations}
				label="Specialization"
				placeholder="Select Specialization"
			/>
			<SelectInputField
				control={control}
				name="position"
				options={configOptions.listPositions}
				label="Position"
				placeholder="Select Employment Status"
			/>
			<div></div>
			<div></div>
			<SelectInputField
				control={control}
				name="incomeDocType"
				options={configOptions.listIncomeDocumentTypes}
				label="Income Document Type"
				placeholder="Select Income Document Type"
			/>
			<CurrencyInputField
				control={control}
				name="amountOfNoa"
				currencyCode={currencyCode}
				label="Amount of NOA"
				placeHolder="Enter Amount of NOA"
				layout="vertical"
			/>
			<DatePickerField
				control={control}
				label="Year of NOA"
				placeholder="Select Year of NOA"
				name="yearOfNoa"
				layout="vertical"
				picker="year"
			/>
			<div className="col-span-3 font-bold">
				<p>Past 3 Months Income</p>
			</div>
			<CurrencyInputField
				control={control}
				name="month1Income"
				currencyCode={currencyCode}
				placeHolder="Enter Month 1 Income"
				label="Month 1"
				layout="vertical"
			/>
			<CurrencyInputField
				control={control}
				name="grossMonthlyIncome"
				currencyCode={currencyCode}
				label="Gross Monthly Income"
				layout="vertical"
				disabled
			/>
			<br />
			<CurrencyInputField
				control={control}
				name="month2Income"
				currencyCode={currencyCode}
				placeHolder="Enter Month 2 Income"
				label="Month 2"
				layout="vertical"
			/>
			<CurrencyInputField
				control={control}
				name="annualIncome"
				currencyCode={currencyCode}
				label="Annual Income"
				layout="vertical"
				disabled
			/>
			<br />
			<CurrencyInputField
				control={control}
				name="month3Income"
				currencyCode={currencyCode}
				placeHolder="Enter Month 3 Income"
				label="Month 3"
				layout="vertical"
			/>
		</div>
	);
}
