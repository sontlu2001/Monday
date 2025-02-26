import { Button, Form, SelectProps, Space, Tag } from "antd";
import { FC, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import masterDataApi from "../../../api/module/master-data.api";
import SelectInputField from "../../../components/form/SelectInputField";
import { TextInputField } from "../../../components/form/TextInputField";
import { COMMON_CONFIG_KEYS } from "../../../constants/general.constant";
import { IApplicationSearchInput } from "../../../interface/application.interface";
import { IOption } from "../../../interface/general.interface";
import { removeFalsyValues } from "../../../utils/utils";
import DateRangePickerField from "../../../components/form/DateRangePickerField";


interface IApplicationSearchProps {
	eventSearch: (formData: IApplicationSearchInput) => void;
	eventResetForm: () => void;
	isSearchingData: boolean;
}

const ApplicationSearch: FC<IApplicationSearchProps> = ({
	eventSearch,
	isSearchingData,
	eventResetForm,
}) => {
	const { control, handleSubmit, setValue, reset } =
		useForm<IApplicationSearchInput>({
			defaultValues: {
				loanType: "",
				status: [],
			},
		});

	const [configOptions, setConfigOptions] = useState<{
		listApplicationStatus: IOption<string>[];
		listLoanType: IOption<string>[];
	}>({
		listApplicationStatus: [],
		listLoanType: [],
	});

	useEffect(() => {
		setValue('status', ['', ...configOptions.listApplicationStatus.map((option) => option.value)])
	}, [configOptions.listApplicationStatus])

	const status = useWatch<IApplicationSearchInput>({
		control,
		name: "status",
	});

	const handleChange = (value: string[]) => {
		if (
			value.length === configOptions.listApplicationStatus.length ||
			value.includes("")
		) {
			setValue("status", [
				"",
				...configOptions.listApplicationStatus.map((option) => option.value),
			]);
		} else {
			setValue("status", value);
		}
	};

	const onDeselect = (option: string) => {
		if (option === "") {
			setValue("status", []);
			return;
		}

		const updatedStatus = status.filter(
			(statusOption: string) => statusOption !== option && statusOption !== ""
		);

		setValue("status", updatedStatus.length ? updatedStatus : null);
	};

	const eventSearchApplication = (formData: IApplicationSearchInput) => {
		// Because Under Disbursement is just a fake status, which present for these status "DU", "DC", "DR", "DA", "DB", "EA", "EP".
		// Once it's selected, we will remove it from our param, and then insert all those status into the param.
		if (formData && formData.status.includes("UR")) {
			const insertStatuses = ["DU", "DC", "DR", "DA", "DB", "EA", "EP"];
			insertStatuses.forEach(status => formData.status.push(status));
			formData.status = [...formData.status.filter((status: string) => status !== "UR")];
		}

		eventSearch(removeFalsyValues(formData));
	};

	const eventResetFormSearch = () => {
		reset();
		eventResetForm();
	};

	useEffect(() => {
		const getCommonConfig = async () => {
			const configKeys = [
				{ key: COMMON_CONFIG_KEYS.loanType, field: "listLoanType" },
				{ key: COMMON_CONFIG_KEYS.applicationStatus, field: "listApplicationStatus" },
			];

			try {
				const configResults = await Promise.all(
					configKeys.map(async ({ key }) => {
						const response = await masterDataApi.getConfig({ key });
						return response.map((item) => ({
							id: item.id,
							key: item.id,
							value: item.code,
							label: item.name,
						}));
					})
				);

				let newConfigOptions = configKeys.reduce((acc, { field }, index) => {
					acc[field as keyof typeof configOptions] = configResults[index];
					return acc;
				}, {} as typeof configOptions);

				// This code to show only PD, UR, AP, RJ status inside the dropdown
				newConfigOptions = {
					...newConfigOptions,
					listApplicationStatus: newConfigOptions.listApplicationStatus.filter(option => ["PD", "UR", "AP", "RJ"].includes(option.value))
				};

				// This block of code to FAKE the label of UR status into "Under Disbursement", once this status selected, we will submit the following status:
				// "DU", "DC", "DR", "DA", "DB", "EA", "EP"
				const statusIndex = newConfigOptions.listApplicationStatus.findIndex(status => status.value === 'UR');
				if (statusIndex !== -1) {
					newConfigOptions.listApplicationStatus[statusIndex] = {
						...newConfigOptions.listApplicationStatus[statusIndex],
						label: 'Under Disbursement'
					};
				}

				setValue("status", ["", ...newConfigOptions.listApplicationStatus]);
				setConfigOptions(newConfigOptions);
			} catch (error) {
				console.error(error);
			}
		};

		getCommonConfig();
	}, []);

	const tagRender: SelectProps["tagRender"] = (props) => {
		const { closable, onClose } = props;

		const allOptionsSelected = configOptions.listApplicationStatus.every((option) =>
			status?.includes("")
		);

		if (allOptionsSelected) {
			return <Tag closable={false}>All</Tag>;
		}

		return (
			<Tag closable={closable} onClose={onClose}>
				{props.label}
			</Tag>
		);
	};

	return (
		<>
			<div className="p-4 border rounded-md bg-white shadow-sm my-4">
				<Form layout="inline" className="block">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
						<DateRangePickerField<IApplicationSearchInput>
							control={control}
							name="dateRange"
						/>
						{/* <TextInputField<IApplicationSearchInput>
							layout="horizontal"
							control={control}
							label={<span className="font-medium">Application ID</span>}
							name="applicationId"
							allowClear
						/> */}
						<SelectInputField<IApplicationSearchInput>
							layout="horizontal"
							options={[
								{ key: "all", value: "", label: "All" },
								...configOptions.listApplicationStatus,
							]}
							control={control}
							allowClear
							label={<span className="font-medium">Status:</span>}
							name="status"
							mode="multiple"
							onChange={handleChange}
							maxTagCount={
								status && status?.length - 1 === configOptions.listApplicationStatus.length
									? 0
									: 1
							}
							onDeselect={onDeselect}
							tagRender={tagRender}
						/>
						<SelectInputField<IApplicationSearchInput>
							layout="horizontal"
							control={control}
							options={[
								{ key: "all", value: "", label: "All" },
								...configOptions.listLoanType,
							]}
							allowClear
							label={<span className="font-medium">Loan Type:</span>}
							name="loanType"
						/>
						<div className="justify-self-start md:justify-self-end">
							<Form.Item>
								<Space>
									<Button
										variant="filled"
										type="primary"
										onClick={handleSubmit(eventSearchApplication)}
										loading={isSearchingData}
									>
										Search
									</Button>
									<Button
										variant="outlined"
										color="default"
										type="dashed"
										onClick={eventResetFormSearch}
									>
										Reset
									</Button>
								</Space>
							</Form.Item>
						</div>
					</div>
				</Form>
			</div>
		</>
	);
};

export default ApplicationSearch;
