import { Breadcrumb, Button, Tabs, TabsProps } from "antd";
import { memo, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import borrowerApi from "../../api/module/borrower.api";
import SkeletonLoading from "../../components/common/SkeletonLoading";
import { APPLICATION_TYPE, TOAST_MESSAGE } from "../../constants/general.constant";
import { useBorrowerDetailContext } from "../../context/BorrowerDetailContext";
import { IBorrowerDetail } from "../../interface/borrower.interface";
import BorrowerDetailsTabContent from "./components/BorrowerDetailsTabContent";
import BorrowerInfo from "./components/BorrowerInfo";
import BorrowerStatusTag from "./components/BorrowerStatusTag";
import { formatDate, getCurrencyCode } from "../../utils/utils";

const BorrowerDetail = () => {
	const {
		loading,
		borrowerDetails,
		setBorrowerDetails,
		setEditMode,
		isEditMode,
	} = useBorrowerDetailContext();

	const methods = useForm<IBorrowerDetail>({});

	useEffect(() => {
		updateFormValue(borrowerDetails);
	}, [borrowerDetails, loading, setBorrowerDetails]);

	const updateFormValue = (formData: IBorrowerDetail) => {
		methods.reset({
			...formData,
		});
	};

	const onSaveBorrower = async (formData: IBorrowerDetail) => {
		const borrowerData = {
			...formData,
			yearOfNoa: formatDate(formData.yearOfNoa, "YYYY"),
			sprFlag: formData.idType === APPLICATION_TYPE.NRIC,
			currency: getCurrencyCode(formData.nationality),
		}
		try {
			const response = await borrowerApi.updateBorrower(borrowerData);
			setBorrowerDetails(response)
			toast.success(TOAST_MESSAGE.SUCCESS);
		} catch (error) {
			console.log(error);
		}
		setEditMode(!isEditMode);
	};

	const tabsItems: TabsProps["items"] = [
		{
			key: "1",
			label: "Borrower Details",
			children: <BorrowerDetailsTabContent />,
		},
		{
			key: "2",
			label: "Audit Log",
			children: "Content of Tab Pane 2",
		},
	];

	if (loading) {
		return <SkeletonLoading></SkeletonLoading>;
	}

	return (
		<>
			<section className="p-4">
				<Breadcrumb
					items={[
						{ title: "Home" },
						{ title: "Borrower Management" },
						{ title: "View Borrower" },
					]}
					className="mb-4"
				/>
				<FormProvider {...methods}>
					<div className="flex justify-between items-center mb-4">
						<div className="flex items-end gap-4 justify-end">
							<span className="text-2xl font-semibold">
								{methods.getValues().fullName}
							</span>
							<BorrowerStatusTag status={methods.getValues().borrowerStatus}></BorrowerStatusTag>
						</div>
						{/* <div>
							<Button type="primary" color="danger" variant="solid">
								Create New Borrower
							</Button>
						</div> */}
					</div>
					<BorrowerInfo />
					<Tabs
						className="mt-4"
						defaultActiveKey="1"
						items={tabsItems}
						tabBarExtraContent={
							isEditMode ? (
								<Button
									type="primary"
									color="green"
									variant="solid"
									onClick={methods.handleSubmit(onSaveBorrower)}
								>
									Save
								</Button>
							) : (
								<Button type="primary" onClick={() => setEditMode(!isEditMode)}>
									Edit
								</Button>
							)
						}
					/>
				</FormProvider>
			</section>
		</>
	);
};

export default memo(BorrowerDetail);
