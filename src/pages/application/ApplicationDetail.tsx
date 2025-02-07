import { CheckCircleFilled } from "@ant-design/icons";
import { Breadcrumb, Button, ConfigProvider, Steps } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import applicationApi from "../../api/module/application.api";
import masterDataApi from "../../api/module/master-data.api";
import SkeletonLoading from "../../components/common/SkeletonLoading";
import {
	APPLICATION_STATUS,
	COMMON_CONFIG_KEYS,
	MAP_APPLICATION_STATUS_STEP,
	TOAST_MESSAGE,
} from "../../constants/general.constant";
import { ApplicationProvider } from "../../context/ApplicationDetailContext";
import { IApplicationDetail, IDueDiligence, IRepaymentSchedule } from "../../interface/application.interface";
import { IOption } from "../../interface/general.interface";
import ApplicationInfo from "./components/applicationDetail/ApplicationInfo";
import BorrowerInfo from "./components/applicationDetail/BorrowerInfo";
import DueDiligence from "./components/applicationDetail/DueDiligence";
import LoanOffer from "./components/applicationDetail/LoanOffer";
import ApplicationTag from "./components/ApplicationTag";
import { INITIAL_APPLICATION_DETAIL } from "./constant/application.constant";
import RepaymentSchedule from "./components/applicationDetail/RepaymentSchedule";
import loanOfferApi from "../../api/module/loanOffer.api";

const ApplicationDetail = () => {
	const paramsUrl = useParams();
	const [currentStep, setCurrentStep] = useState<number>(0);
	const [applicationDetail, setApplicationDetail] = useState<IApplicationDetail>(
		INITIAL_APPLICATION_DETAIL
	);
	const [dueDiligence, setDueDiligence] = useState<IDueDiligence[]>([]);
	const [repaymentSchedule, setRepaymentSchedule] = useState<IRepaymentSchedule[]>([]);
	const [visibleLoanOffer, setVisibleLoanOffer] = useState<boolean>(false);
	const [isRequestNewOffer, setIsRequestNewOffer] = useState<boolean>(false);
	const [loading, setLoading] = useState(true);
	const [configOptions, setConfigOptions] = useState<{
		listPhoneNumber: IOption<string>[];
		listNationalities: IOption<string>[];
		listLoanType: IOption<string>[];
		listInterestCalculationMethod: IOption<string>[];
		listPaymentType: IOption<string>[];
		listInstallmentFrequency: IOption<string>[];
		listLoanInterestFrequency: IOption<string>[];
	}>({
		listPhoneNumber: [],
		listNationalities: [],
		listLoanType: [],
		listInterestCalculationMethod: [],
		listPaymentType: [],
		listInstallmentFrequency: [],
		listLoanInterestFrequency: [],
	});
	const isDisableNextButton = applicationDetail?.applicationStatus === APPLICATION_STATUS.EDIT_PENDING || isRequestNewOffer;

	
	useEffect(() => {
		getCommonConfig();
	}, []);

	useEffect(() => {
		const fetchApplicationData = async () => {			
			await fetchApplicationDetail();
		}
		fetchApplicationData();
	}, [paramsUrl.slug]);


	const getCommonConfig = async () => {
		const configKeys = [
			{ key: COMMON_CONFIG_KEYS.nationalities, field: "listNationalities" },
			{ key: COMMON_CONFIG_KEYS.phoneCodes, field: "listPhoneNumber" },
			{ key: COMMON_CONFIG_KEYS.loanType, field: "listLoanType" },
			{ key: COMMON_CONFIG_KEYS.interestCalculationMethod, field: "listInterestCalculationMethod" },
			{ key: COMMON_CONFIG_KEYS.paymentType, field: "listPaymentType"},
			{ key: COMMON_CONFIG_KEYS.installmentFrequency, field: "listInstallmentFrequency"},
			{ key: COMMON_CONFIG_KEYS.loanInterestFrequency, field: "listLoanInterestFrequency"},
		];

		try {
			const configResults = await Promise.all(
				configKeys.map(async ({ key }) => {
					const response = await masterDataApi.getConfig({ key });
					return response.map((item) => ({
						value: item.code,
						label: item.name,
						name: item.name,
					}));
				})
			);

			const newConfigOptions = configKeys.reduce((acc, { field }, index) => {
				acc[field as keyof typeof configOptions] = configResults[index];
				return acc;
			}, {} as typeof configOptions);

			setConfigOptions(newConfigOptions);
		} catch (error) {
			console.error(error);
		}
	};

	const fetchApplicationDetail = async () => {
		try {
			const response = await applicationApi.getDetailApplication({
				id: paramsUrl.slug,
			});
			if (!response) {
				setLoading(false);
				toast.error(TOAST_MESSAGE.ERROR);
			}
			setApplicationDetail(response);
			setCurrentStep(MAP_APPLICATION_STATUS_STEP.get(response.applicationStatus) || 0);
			if(response.applicationStatus === APPLICATION_STATUS.EDIT_PENDING){
				setVisibleLoanOffer(true);
			}
			setLoading(false);
		} catch (error) {
			console.error("Failed to fetch application detail:", error);
			setLoading(false);
		}
	};

	if (loading) return <SkeletonLoading></SkeletonLoading>;

	return (
		<ApplicationProvider value={{ applicationDetail, configOptions, fetchApplicationDetail}}>
			<section className="p-4 flex flex-col gap-8">
				<Breadcrumb
					items={[
						{ title: "Application Management" },
						{ title: "Application Dashboard" },
						{ title: "View Application" },
					]}
				/>
				<div className="grid grid-cols-1 md:grid-cols-2 items-center  ">
					<div className="flex  items-center  gap-4">
						<span className="text-xl font-bold">{applicationDetail?.id}</span>
						<span>|</span>
						<span className=" text-xl font-bold text-[#1890FF] underline">
							{applicationDetail?.borrower.fullName}
						</span>
						<ApplicationTag
							status={applicationDetail?.applicationStatus || "RJ"}
							className="px-4 py-1 font-bold"
						></ApplicationTag>
					</div>

					{APPLICATION_STATUS.APPROVED === applicationDetail?.applicationStatus && !visibleLoanOffer && (
						<div className="flex justify-end">
							<button className="p-2 rounded-md p-2 text-white bg-[#14AE5C]" onClick={() => setVisibleLoanOffer(true)}>
								Commence Disbursement
							</button>
						</div>
					)}
					{[
						APPLICATION_STATUS.APPROVED,
						APPLICATION_STATUS.EDIT_PENDING,
					].includes(applicationDetail?.applicationStatus as "AP" | "EP") && visibleLoanOffer && (
						<div className="flex justify-end">
							<button 
									className={`px-4 rounded-md p-2 text-white ${isDisableNextButton ? 'bg-gray-400' : 'bg-[#14AE5C]'} `} 
									disabled={isDisableNextButton}>
								Next
							</button>
						</div>
					)}
				</div>
				<ConfigProvider
					theme={{
						token: {
							colorPrimary: "#25B474",
						},
					}}
				>
					<Steps
						labelPlacement="vertical"
						status={applicationDetail?.applicationStatus === APPLICATION_STATUS.REJECTED ? "error" : "process"}
						className="application-step py-4"
						current={currentStep}
						items={[
							{
								title: "Pending",
							},
							{
								title: "Approved",
							},
							{
								title: "Offer Review",
							},
							{
								title: "Commence Disbursement",
							},
							{
								title: "Disbursed",
							},
						]}
					/>
				</ConfigProvider>
				<BorrowerInfo />
				<DueDiligence></DueDiligence>

				{[
					APPLICATION_STATUS.APPROVED,
					APPLICATION_STATUS.EDIT_PENDING,
				].includes(applicationDetail?.applicationStatus as "AP" | "EP") && visibleLoanOffer && (
					<LoanOffer 
						isRequestNewOffer={isRequestNewOffer}
						setIsRequestNewOffer={setIsRequestNewOffer}
					/>
				)}

				{applicationDetail?.applicationStatus === APPLICATION_STATUS.APPROVED && !visibleLoanOffer && (
					<ApplicationInfo></ApplicationInfo>
				)}

				{[
					APPLICATION_STATUS.APPROVED,
					APPLICATION_STATUS.REJECTED,
					APPLICATION_STATUS.PENDING,
					APPLICATION_STATUS.EDIT_PENDING,
				].includes(applicationDetail?.applicationStatus as "PD" | "AP" | "RJ"| "EP") && visibleLoanOffer  && (
					<RepaymentSchedule></RepaymentSchedule>
				)}            
			</section>
		</ApplicationProvider>
	);
};

export default ApplicationDetail;
