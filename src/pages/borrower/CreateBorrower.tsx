import { yupResolver } from "@hookform/resolvers/yup";
import { Affix, Breadcrumb, Button, Card, Space, Typography } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { memo } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import borrowerApi from "../../api/module/borrower.api";
import { APPLICATION_SEARCH_TYPE, APPLICATION_TYPE, BORROWER_STATUS } from "../../constants/general.constant";
import { IBorrower } from "../../interface/borrower.interface";
import EmploymentAndIncomeDetails from "./components/EmploymentAndIncomeDetails";
import PersonalInformation from "./components/PersonalInformation";
import { MESSAGE_BORROWER } from "./constants/borrower.constant";
import { createBorrowerSchema } from "./validate/borrowerValidationSchema";
import { formatDate, getCurrencyCode } from "../../utils/utils";

dayjs.extend(customParseFormat);

const CreateBorrower = () => {
	const methods = useForm<IBorrower>({
		resolver: yupResolver(createBorrowerSchema),
		defaultValues: {
			idNo: "",
			idType: undefined,
			idExpiryDate: undefined,
			fullName: "",
			handPhone: "",
			phoneCode: "",
			nationality: undefined,
			email: "",
			gender: undefined,
			dob: undefined,
			ethnicGroup: undefined,
			address: "",
			postalCode: "",
			typeOfResidential: undefined,
			propertyOwnership: undefined,
			month1Income: 0,
			month2Income: 0,
			month3Income: 0,
			grossMonthlyIncome: 0,
			annualIncome: 0,
			specialization: undefined,
			yearOfNoa: "",
			amountOfNoa: 0,
			currency: "",
			source: APPLICATION_TYPE.MONDAY,
		},
	});
	const navigation = useNavigate();

	const onCreateBorrower: SubmitHandler<IBorrower> = async (
		formData: IBorrower
	) => {
		const borrowerData = {
			...formData,
			grossMonthlyIncome: Number(formData.grossMonthlyIncome),
			annualIncome: Number(formData.annualIncome),
			month1Income: Number(formData.month1Income),
			month2Income: Number(formData.month2Income),
			month3Income: Number(formData.month3Income),
			amountOfNoa: Number(formData.amountOfNoa),
			yearOfNoa: formatDate(formData.yearOfNoa, "YYYY"),
			currency: getCurrencyCode(formData.nationality),
			sprFlag: formData.idType === APPLICATION_TYPE.NRIC,
			borrowerStatus: BORROWER_STATUS.ACTIVE,
		} as IBorrower;

		try {
			const resSearchBorrower = await borrowerApi.searchBorrower(borrowerData.idNo, APPLICATION_SEARCH_TYPE.EQUALS);
			if (resSearchBorrower.length > 0) {
				methods.setError("idNo", { type: "manual", message: MESSAGE_BORROWER.CREATED_EXISTS });
				return;
			}
			const response = await borrowerApi.createBorrower(borrowerData);
			if (!response) {
				toast.error(MESSAGE_BORROWER.CREATED_ERROR);
				return;
			}
			toast.success(MESSAGE_BORROWER.CREATED_SUCCESS);
			navigation(`/borrower/detail/${response.id}`);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<section className="p-4">
				<Breadcrumb
					items={[
						{ title: "Home" },
						{ title: "Borrower Management" },
						{ title: "Create Borrower" },
					]}
					className="mb-4"
				/>
				<div className="flex items-center mb-2">
					<Typography.Title className="!mb-0" level={3}>
						Create Borrower
					</Typography.Title>
				</div>

				<FormProvider {...methods}>
					<div className="flex gap-3 flex-col">
						<Card title="Personal Information">
							<PersonalInformation />
						</Card>
						<Card title="Employment and Income Details">
							<EmploymentAndIncomeDetails />
						</Card>
						<Affix offsetBottom={0}>
							<Space className="border rounded-md p-4 w-full flex ml-auto justify-end shadow-sm backdrop-blur-lg ">
								<Button>Discard</Button>
								<Button onClick={methods.handleSubmit(onCreateBorrower)} type="primary">
									Submit
								</Button>
							</Space>
						</Affix>
					</div>
				</FormProvider>
			</section>
		</>
	);
};

export default memo(CreateBorrower);
