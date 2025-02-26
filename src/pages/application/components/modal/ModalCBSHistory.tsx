import { Skeleton, Table, Typography } from "antd";
import { memo, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import applicationApi from "../../../../api/module/application.api";
import { IDueDiligence } from "../../../../interface/due.dilegence.api";
import { getColorTextDiligence } from "../../../../utils/utils";
import ApplicationModalLayout from "./ApplicationModalLayout";
import { DASH } from "../../../../constants/general.constant";

const ModalCBSHistory = ({ id }: { id: string }) => {
	const paramUrl = useParams();
	const [historyData, setHistoryData] = useState<IDueDiligence[]>([]);
	const [diligenceDetail, setDiligenceDetail] = useState<IDueDiligence>();
	const [currentId, setCurrentId] = useState(id);
	const [isLoading, setIsLoading] = useState(true);

	const getDiligenceDetail = useCallback(async () => {
		const response = await applicationApi.getDiligenceById(currentId);
		setDiligenceDetail(response);
		setIsLoading(false);
	}, [currentId]);

	const getHistoryData = useCallback(async () => {
		const response = await applicationApi.getHistoryDiligence({
			checkType: "CBS",
			applicationId: paramUrl.slug,
		});

		setHistoryData(response);
	}, [paramUrl.slug]);

	useEffect(() => {
		getHistoryData();
	}, []);

	useEffect(() => {
		setIsLoading(true);
		getDiligenceDetail();
	}, [currentId]);

	const columnsCBS = [
		{
			title: "Check Time",
			dataIndex: "checkType",
			key: "checkType",
			render: (_: string, record: IDueDiligence) => (
				<p> {record.data.cbs_check_result?.last_checked || DASH}</p>
			),
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (_: string, record: IDueDiligence) => (
				<Typography.Text
					type={getColorTextDiligence(record.data.cbs_check_result?.cbs_check_status)}
				>
					{record.data.cbs_check_result?.cbs_check_status || DASH}
				</Typography.Text>
			),
		},
		{
			title: "Result",
			dataIndex: "result",
			key: "result",
			render: (_: string, record: IDueDiligence) => (
				<Typography.Text
					type={getColorTextDiligence(record.data.cbs_check_result?.cbs_result_summary)}
				>
					{record.data.cbs_check_result?.cbs_result_summary || DASH}
				</Typography.Text>
			),
		},
	];

	const columnsCBSDetail = [
		{
			title: "Validation Rule",
			dataIndex: "validationRule",
			key: "validationRule",
		},
		{
			title: "Result",
			dataIndex: "result",
			key: "result",
			render: (result: string) => (
				<Typography.Text type={getColorTextDiligence(result)}>{result}</Typography.Text>
			),
		},
		{
			title: "Details",
			dataIndex: "details",
			key: "details",
			render: (result: string) => (
				<Typography.Text type={getColorTextDiligence(result)}>{result}</Typography.Text>
			),
		},
	];

	const diligenceDetailData = [
		{
			key: "1",
			validationRule: "Grade GG or higher (GX is acceptable)",
			result:
				diligenceDetail?.data?.cbs_check_result?.cbs_grade_check?.result || DASH,
			details:
				diligenceDetail?.data?.cbs_check_result?.cbs_grade_check?.value || DASH,
		},
		{
			key: "2",
			validationRule: "No default in payment for the past 12 months",
			result:
				diligenceDetail?.data?.cbs_check_result?.no_default_payment?.result || DASH,
			details:
				diligenceDetail?.data?.cbs_check_result?.no_default_payment?.value || DASH,
		},
		{
			key: "6",
			validationRule: "No bankruptcy proceeding for the past 12 months",
			result:
				diligenceDetail?.data?.cbs_check_result?.no_bankruptcy_proceeding?.result ||
				DASH,
			details:
				diligenceDetail?.data?.cbs_check_result?.no_bankruptcy_proceeding?.value ||
				DASH,
		},
		{
			key: "3",
			validationRule: "Bankruptcy discharged for at least 12 months (if any)",
			result:
				diligenceDetail?.data?.cbs_check_result?.no_bankruptcy_discharged?.result ||
				DASH,
			details:
				diligenceDetail?.data?.cbs_check_result?.no_bankruptcy_discharged?.value ||
				DASH,
		},
		{
			key: "4",
			validationRule: "Not under Debt Consolidation Plan",
			result:
				diligenceDetail?.data?.cbs_check_result?.debt_consolidation_plan?.result ||
				DASH,
			details:
				diligenceDetail?.data?.cbs_check_result?.debt_consolidation_plan?.value || DASH,
		},
		{
			key: "5",
			validationRule: "Not under Debt Management Plan",
			result:
				diligenceDetail?.data?.cbs_check_result?.debt_management_plan?.result || DASH,
			details:
				diligenceDetail?.data?.cbs_check_result?.debt_management_plan?.value || DASH,
		},
		{
			key: "6",
			validationRule: "Adverse Account History (last 12 months)",
			result:
				diligenceDetail?.data?.cbs_check_result?.adverse_account_history?.result ||
				DASH,
			details:
				diligenceDetail?.data?.cbs_check_result?.adverse_account_history?.value || DASH,
		},
	];

	const renderInfoContent = () => {
		return (
			<>
				<div className="flex flex-col gap-2">
					<div className="flex gap-2 ">
						<div className="font-medium">CBS Check Status:</div>
						<Typography.Text
							type={getColorTextDiligence(
								diligenceDetail?.data.cbs_check_result?.cbs_result_summary
							)}
						>
							{diligenceDetail?.data.cbs_check_result?.cbs_result_summary || DASH}
						</Typography.Text>
					</div>
					<div className="flex gap-2">
						<div className="font-medium">Last Checked:</div>
						<div>{diligenceDetail?.data.cbs_check_result?.last_checked || DASH}</div>
					</div>
					<div className="flex gap-2">
						<div className="font-medium">CBS Grade:</div>
						<div>{diligenceDetail?.data.cbs_check_result?.cbs_grade || DASH}</div>
					</div>
					<div className="flex gap-2">
						<div className="font-medium">CBS Score:</div>
						<div>{diligenceDetail?.data.cbs_check_result?.cbs_score || DASH}</div>
					</div>
					<div className="flex gap-2 justify-between">
						<div className="font-medium">
							Total Aggregated Outstanding Balance (Unsecured, Excluding Student Loans)
						</div>
						<div>
							{diligenceDetail?.data.cbs_check_result
								?.aggregated_outstanding_balance_unsecured || DASH}
						</div>
					</div>
					<div className="flex gap-2">
						<div className="font-medium">
							Total Aggregated Monthly Installment for Unsecured Loans (Excluding Student
							Loans)
						</div>
						<div>
							{diligenceDetail?.data.cbs_check_result
								?.aggregated_monthly_installment_unsecured || DASH}
						</div>
					</div>
					<div className="flex gap-2">
						<div className="font-medium">Total Overdue Balance:</div>
						<div>
							{diligenceDetail?.data.cbs_check_result?.total_overdue_balance || DASH}
						</div>
					</div>
					<div className="flex gap-2 flex-col">
						<div className="font-medium">Key Observations:</div>
						<div
							dangerouslySetInnerHTML={{
								__html: diligenceDetail?.data?.cbs_check_result?.key_observations || "",
							}}
						/>
					</div>
				</div>
			</>
		);
	};
	return (
		<ApplicationModalLayout
			leftContent={
				historyData.length ? (
					<Table
						size="small"
						columns={columnsCBS}
						dataSource={historyData}
						pagination={historyData.length > 10 ? undefined : false}
						onRow={(record) => ({
							onClick: () => {
								setCurrentId(record.id);
							},
						})}
						className="cursor-pointer"
					/>
				) : (
					<Skeleton active></Skeleton>
				)
			}
			infoContent={renderInfoContent()}
			tableContent={
				<Table
					bordered={false}
					columns={columnsCBSDetail}
					dataSource={diligenceDetailData}
					rowKey={diligenceDetail?.id}
					key={diligenceDetail?.id}
					pagination={false}
				/>
			}
		/>
	);
};

export default memo(ModalCBSHistory);
