import React, { useEffect, useState, useMemo } from "react";
import { Control, FieldValues, useForm } from "react-hook-form";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";
import borrowerApi from "../../../api/module/borrower.api";
import AutoCompleteInputField from "../../../components/form/AutoCompleteField";
import useDebounce from "../../../hooks/useDebounce";
import { IBorrower } from "../../../interface/borrower.interface";
import { ROUTES } from "../../../constants/routes.constant";
import { MESSAGE_BORROWER } from "../constants/borrower.constant";
import { APPLICATION_SEARCH_TYPE } from "../../../constants/general.constant";

interface IIdNumberOptions {
	borrower: IBorrower;
	value: string;
	label: React.ReactNode;
}

interface IdNumberProps<TFormValues extends FieldValues> {
	control: Control<TFormValues>;
}

const IdNumber = <TFormValues extends FieldValues>({
	control
}: IdNumberProps<TFormValues>) => {
	const [options, setOptions] = useState<IIdNumberOptions[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const debouncedSearchQuery = useDebounce(searchQuery, 300);

	const {setError, clearErrors} = useForm<IBorrower>();
	const navigate = useNavigate();

	const handleSearch = (value: string) => setSearchQuery(value);

	const fetchOptions = async (query: string) => {
		try {
			const borrowerResults = await borrowerApi.searchBorrower(query, APPLICATION_SEARCH_TYPE.CONTAINS);
			const newOptions = borrowerResults.map(
				(borrower: IBorrower): IIdNumberOptions => ({
					borrower,
					value: borrower.idNo,
					label: <div key={borrower.id}>{`${borrower.idNo} - ${borrower.fullName}`}</div>,
				})
			);
			setOptions(newOptions);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (debouncedSearchQuery) {
			fetchOptions(debouncedSearchQuery);
		} else {
			setOptions([]);
		}
	}, [debouncedSearchQuery]);

	// const checkIfIdExists = useMemo(
	// 	() => () => {
	// 		const idExists = options.some((option) => option.value === searchQuery);

	// 		if (searchQuery && idExists) {
	// 			setError("idNo", { type: "manual", message: MESSAGE_BORROWER.CREATED_EXISTS });
	// 		} else {
	// 			clearErrors("idNo");
	// 		}
	// 	},
	// 	[searchQuery, options, setError, clearErrors]
	// );

	// useEffect(() => {
	// 	checkIfIdExists();
	// }, [checkIfIdExists]);

	const handleSelect = (_: string, option: any) => {
		const selectedOption = option as IIdNumberOptions;

		clearErrors("idNo");
		navigate(ROUTES.BORROWER_DETAIL(selectedOption.borrower.id));
	};

	return (
		<AutoCompleteInputField
			name={"idNo" as any}
			control={control}
			onSearch={handleSearch}
			options={options}
			onSelect={handleSelect}
			required
			label="ID Number"
			layout="vertical"
		>
			<Input.Search
				className="z-50"
				placeholder="ID Number"
				enterButton="Search DNB"
				onSearch={() => console.log("Search triggered")}
			/>
		</AutoCompleteInputField>
	);
};

export default IdNumber;
