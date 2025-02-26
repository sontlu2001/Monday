import { CheckCircleFilled, CloseCircleFilled, LeftOutlined } from "@ant-design/icons";
import { Breadcrumb, Card, ConfigProvider, Steps } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import applicationApi from "../../api/module/application.api";
import masterDataApi from "../../api/module/master-data.api";
import inprogressCircleIconSVG from "../../assets/imgs/circle-icon.svg";
import SkeletonLoading from "../../components/common/SkeletonLoading";
import {
	APPLICATION_STATUS,
	COMMON_CONFIG_KEYS,
	MAP_APPLICATION_STATUS_STEP,
	TOAST_MESSAGE,
} from "../../constants/general.constant";
import { ApplicationProvider } from "../../context/ApplicationDetailContext";
import { IApplicationDetail, IRepaymentSchedule } from "../../interface/application.interface";
import { IOption } from "../../interface/general.interface";
import ApplicationInfo from "./components/applicationDetail/ApplicationInfo";
import BorrowerInfo from "./components/applicationDetail/BorrowerInfo";
import DocumentESignature from "./components/applicationDetail/DocumentSignature";
import DueDiligence from "./components/applicationDetail/DueDiligence";
import LoanOffer from "./components/applicationDetail/LoanOffer";
import RepaymentSchedule from "./components/applicationDetail/RepaymentSchedule";
import ApplicationTag from "./components/ApplicationTag";
import { INITIAL_APPLICATION_DETAIL } from "./constant/application.constant";
import { INIT_LOAN_OFFER_REPAYMENT_SCHEDULES } from "./constant/loanOffer.constant";

import "./ApplicationDetail.scss";

const ApplicationDetail = () => {
	const paramsUrl = useParams();
	const navigate = useNavigate();
	const [currentStep, setCurrentStep] = useState<number>(0);
	const [lastStep, setLastStep] = useState<number>(0);
	const [applicationDetail, setApplicationDetail] = useState<IApplicationDetail>(
		INITIAL_APPLICATION_DETAIL
	);
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
		listIdType: IOption<string>[];
	}>({
		listPhoneNumber: [],
		listNationalities: [],
		listLoanType: [],
		listInterestCalculationMethod: [],
		listPaymentType: [],
		listInstallmentFrequency: [],
		listLoanInterestFrequency: [],
		listIdType: [],
	});
	const isDisableNextButton = applicationDetail?.applicationStatus === APPLICATION_STATUS.EDIT_PENDING || isRequestNewOffer;

	const isDisableCommenceButton = [
		APPLICATION_STATUS.APPROVED
	].indexOf(applicationDetail?.applicationStatus as "AP") === -1

	useEffect(() => {
		getCommonConfig();
	}, []);

	useEffect(() => {
		if (!paramsUrl?.slug) return;

		fetchApplicationDetail();
	}, [paramsUrl?.slug]);


	const getCommonConfig = async () => {
		const configKeys = [
			{ key: COMMON_CONFIG_KEYS.nationalities, field: "listNationalities" },
			{ key: COMMON_CONFIG_KEYS.phoneCodes, field: "listPhoneNumber" },
			{ key: COMMON_CONFIG_KEYS.loanType, field: "listLoanType" },
			{ key: COMMON_CONFIG_KEYS.interestCalculationMethod, field: "listInterestCalculationMethod" },
			{ key: COMMON_CONFIG_KEYS.paymentType, field: "listPaymentType" },
			{ key: COMMON_CONFIG_KEYS.installmentFrequency, field: "listInstallmentFrequency" },
			{ key: COMMON_CONFIG_KEYS.loanInterestFrequency, field: "listLoanInterestFrequency" },
			{ key: COMMON_CONFIG_KEYS.idTypes, field: "listIdType" },
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
			const response = await applicationApi.getDetailApplicationByLoanOffer({
				id: paramsUrl.slug,
			});
			if (!response) {
				setLoading(false);
				toast.error(TOAST_MESSAGE.ERROR);
			}
			setApplicationDetail(response);

			setCurrentStep(MAP_APPLICATION_STATUS_STEP.get(response.applicationStatus) || 0);
			setLoading(false);
		} catch (error) {
			console.error("Failed to fetch application detail:", error);
			setLoading(false);
		}
	};

	const InprogressCircleIcon = () => <img style={{ marginBottom: "7px" }} src={inprogressCircleIconSVG} />

	const backToLastStep = () => setCurrentStep(lastStep);

	if (loading) return <SkeletonLoading></SkeletonLoading>;

	return (
		<ApplicationProvider value={{ applicationDetail, configOptions, fetchApplicationDetail }}>
			<section className="flex flex-col gap-4">
				<Breadcrumb
					className="application-detail__breadcrum"
					items={[
						{ title: "Application Management" },
						{ title: "Application Dashboard", onClick: () => navigate("/application/dashboard") },
						{ title: "View Application" },
					]}
				/>
				<div className="grid grid-cols-1 md:grid-cols-2 items-center  ">
					<div className="flex items-center gap-4">
						{currentStep === 4 ? <LeftOutlined onClick={backToLastStep} style={{ fontSize: "18px", marginTop: "1px", color: "rgba(0, 0, 0, 0.88)" }} /> : <span style={{ fontSize: "18px", marginTop: "1px", color: "rgba(0, 0, 0, 0.88)", width: "25px" }}>&nbsp;</span>}
						<span className="text-xl font-bold">{applicationDetail?.id}</span>
						<span>|</span>
						<span className=" text-xl font-bold text-[#1890FF] underline" style={{ cursor: "pointer" }} onClick={() => navigate(`/borrower/detail/${applicationDetail?.borrower.id}`)}>
							{applicationDetail?.borrower.fullName}
						</span>
						<ApplicationTag
							status={applicationDetail?.applicationStatus || "RJ"}
							className="px-4 py-1 font-bold"
						></ApplicationTag>
					</div>

					{/* {APPLICATION_STATUS.APPROVED === applicationDetail?.applicationStatus && (
						<div className="flex justify-end">
							<button className="p-2 rounded-md p-2 text-white bg-[#14AE5C]" onClick={() => setVisibleLoanOffer(true)}>
								Commence Disbursement
							</button>
						</div>
					)} */}
					{currentStep < MAP_APPLICATION_STATUS_STEP.get(APPLICATION_STATUS.DISBURSED)! &&
						<div className="flex justify-end">
							<button
								className={`px-4 rounded-md p-2 text-white ${isDisableCommenceButton ? 'bg-gray-400' : 'bg-[#14AE5C]'} `}
								disabled={isDisableCommenceButton}
								onClick={() => {
									setLastStep(currentStep)
									setCurrentStep(4)
								}}>
								Commence Disbursement
							</button>
						</div>
					}
				</div>
				<ConfigProvider
					theme={{
						token: {
							colorPrimary: "#25B474",
						},
					}}
				>
					<Card>
						<Steps
							labelPlacement="vertical"
							status={applicationDetail?.applicationStatus === APPLICATION_STATUS.REJECTED || applicationDetail?.applicationStatus === APPLICATION_STATUS.DISBURSEMENT_CANCEL ? "error" : "process"}
							className="application-step py-4"
							current={currentStep}
							items={[
								{
									title: "Pending",
									icon: currentStep === 0 || currentStep < 6 ? <CheckCircleFilled /> : <InprogressCircleIcon />
								},
								{
									title: "Approved",
									icon: (currentStep === 1 || currentStep < 6 && currentStep > 1) ? ([APPLICATION_STATUS.APPROVED, APPLICATION_STATUS.EDIT_PENDING, APPLICATION_STATUS.DISBURSED, APPLICATION_STATUS.PENDING, APPLICATION_STATUS.UNDER_REVIEW].indexOf(applicationDetail.applicationStatus as typeof APPLICATION_STATUS.APPROVED || APPLICATION_STATUS.EDIT_PENDING || APPLICATION_STATUS.DISBURSED || APPLICATION_STATUS.PENDING || APPLICATION_STATUS.UNDER_REVIEW) !== -1 ? <CheckCircleFilled /> : <CloseCircleFilled />) : <InprogressCircleIcon />,
								},
								{
									title: "Offer Review",
									icon: currentStep === 2 || currentStep === 4 || applicationDetail.applicationStatus === APPLICATION_STATUS.DISBURSED ? <CheckCircleFilled /> : <InprogressCircleIcon />,
								},
								{
									title: "Commence Disbursement",
									icon: currentStep === 3 || currentStep === 4 || applicationDetail.applicationStatus === APPLICATION_STATUS.DISBURSED ? <CheckCircleFilled /> : <InprogressCircleIcon />,
								},
								{
									title: "Disbursed",
									icon: applicationDetail?.applicationStatus === APPLICATION_STATUS.DISBURSED ? <CheckCircleFilled /> : <InprogressCircleIcon />,
								},
							]}
						/>
					</Card>

				</ConfigProvider>

				{(([APPLICATION_STATUS.APPROVED, APPLICATION_STATUS.EDIT_APPROVED, APPLICATION_STATUS.DISBURSEMENT_UNDER_REVIEW, APPLICATION_STATUS.DISBURSEMENT_APPROVED, APPLICATION_STATUS.DISBURSED].includes(applicationDetail?.applicationStatus as "AP" | "EA" | "DU" | "DA" | "DB") && currentStep < MAP_APPLICATION_STATUS_STEP.get(APPLICATION_STATUS.DISBURSED)!) || ([APPLICATION_STATUS.PENDING, APPLICATION_STATUS.UNDER_REVIEW, APPLICATION_STATUS.REJECTED, APPLICATION_STATUS.DISBURSEMENT_RETURN, APPLICATION_STATUS.DISBURSEMENT_CANCEL].includes(applicationDetail?.applicationStatus as "PD" || "UR" || "RJ" || "DR" || "DC"))) && <>
					<BorrowerInfo />
					<DueDiligence />
				</>}

				{
					currentStep < MAP_APPLICATION_STATUS_STEP.get(APPLICATION_STATUS.DISBURSED)! &&
					[
						APPLICATION_STATUS.APPROVED,
						APPLICATION_STATUS.EDIT_PENDING,
						APPLICATION_STATUS.EDIT_APPROVED,
						APPLICATION_STATUS.DISBURSEMENT_UNDER_REVIEW,
						APPLICATION_STATUS.DISBURSEMENT_APPROVED,
						APPLICATION_STATUS.DISBURSED
					].includes(applicationDetail?.applicationStatus as "AP" | "EP" | "EA" | "DU" | "DA" | "DB") && (
						<LoanOffer
							isRequestNewOffer={isRequestNewOffer}
							setIsRequestNewOffer={setIsRequestNewOffer}
						/>
					)
				}

				{[APPLICATION_STATUS.PENDING, APPLICATION_STATUS.UNDER_REVIEW, APPLICATION_STATUS.REJECTED, APPLICATION_STATUS.DISBURSEMENT_RETURN, APPLICATION_STATUS.DISBURSEMENT_CANCEL].includes(applicationDetail?.applicationStatus as "PD" || "UR" || "RJ" || "DR" || "DC") && (
					<ApplicationInfo />
				)}

				{([APPLICATION_STATUS.APPROVED, APPLICATION_STATUS.EDIT_APPROVED, APPLICATION_STATUS.DISBURSEMENT_UNDER_REVIEW, APPLICATION_STATUS.DISBURSEMENT_APPROVED, APPLICATION_STATUS.DISBURSED].includes(applicationDetail?.applicationStatus as "AP" || "EA" || "DU" || "DA" || "DB") && currentStep < MAP_APPLICATION_STATUS_STEP.get(APPLICATION_STATUS.DISBURSED)!) && (
					<RepaymentSchedule listRepaymentSchedules={INIT_LOAN_OFFER_REPAYMENT_SCHEDULES} onlyViewData />
				)}

				{currentStep === MAP_APPLICATION_STATUS_STEP.get(APPLICATION_STATUS.DISBURSED)! && <DocumentESignature applicationDetail={applicationDetail} setApplicationDetail={setApplicationDetail} />}
			</section>
		</ApplicationProvider>
	);
};

export default ApplicationDetail;
