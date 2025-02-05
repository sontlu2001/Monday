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
	TOAST_MESSAGE,
} from "../../constants/general.constant";
import { ApplicationProvider } from "../../context/ApplicationDetailContext";
import { IApplicationDetail } from "../../interface/application.interface";
import { IOption } from "../../interface/general.interface";
import ApplicationInfo from "./components/applicationDetail/ApplicationInfo";
import BorrowerInfo from "./components/applicationDetail/BorrowerInfo";
import DueDiligence from "./components/applicationDetail/DueDiligence";
import LoanOffer from "./components/applicationDetail/LoanOffer";
import ApplicationTag from "./components/ApplicationTag";
import { INITIAL_APPLICATION_DETAIL } from "./constant/application.constant";

const ApplicationDetail = () => {
	const paramsUrl = useParams();

	const [applicationDetail, setApplicationDetail] = useState<IApplicationDetail>(
		INITIAL_APPLICATION_DETAIL
	);

	const [loading, setLoading] = useState(true);
	const [configOptions, setConfigOptions] = useState<{
		listPhoneNumber: IOption<string>[];
		listNationalities: IOption<string>[];
		listLoanType: IOption<string>[];
	}>({
		listPhoneNumber: [],
		listNationalities: [],
		listLoanType: [],
	});

	useEffect(() => {
		getCommonConfig();
	}, []);

	useEffect(() => {
		fetchApplicationDetail();
	}, [paramsUrl.slug]);

	const getCommonConfig = async () => {
		const configKeys = [
			{ key: COMMON_CONFIG_KEYS.nationalities, field: "listNationalities" },
			{ key: COMMON_CONFIG_KEYS.phoneCodes, field: "listPhoneNumber" },
			{ key: COMMON_CONFIG_KEYS.loanType, field: "listLoanType" },
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
			setLoading(false);
		} catch (error) {
			console.error("Failed to fetch application detail:", error);
			setLoading(false);
		}
	};

	if (loading) return <SkeletonLoading></SkeletonLoading>;

	return (
		<ApplicationProvider value={{ applicationDetail, configOptions }}>
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

					{applicationDetail?.applicationStatus === APPLICATION_STATUS.APPROVED && (
						<div className="flex justify-end">
							<Button type="primary" color="blue">
								Commence Disbursement
							</Button>
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
						status="process"
						className="application-step py-4"
						current={1}
						items={[
							{
								title: "Pending",
								icon: <CheckCircleFilled />,
							},
							{
								title: "Approved",
								icon: <CheckCircleFilled />,
							},
							{
								title: "Offer Review",
								icon: <CheckCircleFilled />,
							},
							{
								title: "Commence Disbursement",
								icon: <CheckCircleFilled />,
							},
							{
								title: "Disbursed",
								icon: <CheckCircleFilled />,
							},
						]}
					/>
				</ConfigProvider>
				<BorrowerInfo />
				<DueDiligence></DueDiligence>

				{applicationDetail?.applicationStatus === APPLICATION_STATUS.APPROVED && (
					<LoanOffer></LoanOffer>
				)}

				<ApplicationInfo />
			</section>
		</ApplicationProvider>
	);
};

export default ApplicationDetail;
