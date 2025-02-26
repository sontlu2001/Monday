import { Skeleton, Table, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import applicationApi from "../../../../api/module/application.api";
import { IDueDiligence } from "../../../../interface/due.dilegence.api";
import { getColorTextDiligence } from "../../../../utils/utils";
import ApplicationModalLayout from "./ApplicationModalLayout";
import { DASH } from "../../../../constants/general.constant";
import { ColumnsType } from "antd/es/table";
interface IMLCBDetail {
	key: string;
	validationRule: string;
	result: string;
	details: string;
}

const ModalMLCBHistory = ({ id }: { id: string }) => {
	const paramUrl = useParams();
	const [historyData, setHistoryData] = useState<IDueDiligence[]>([]);
	const [currentId, setCurrentId] = useState(id);
	const [diligenceDetail, setDiligenceDetail] = useState<IDueDiligence>();

	const getDiligenceDetail = useCallback(async () => {
		const response = await applicationApi.getDiligenceById(currentId);
		setDiligenceDetail(response);
	}, [currentId]);

	const getHistoryData = useCallback(async () => {
		const response = await applicationApi.getHistoryDiligence({
			checkType: "MLCB",
			applicationId: paramUrl.slug,
		});

		setHistoryData(response);
	}, [paramUrl.slug]);

	useEffect(() => {
		getHistoryData();
	}, []);

	useEffect(() => {
		getDiligenceDetail();
	}, [currentId]);

	const columnsMLCB = [
		{
			title: "Check Time",
			dataIndex: "checkType",
			key: "checkType",
			render: (status: string, record: IDueDiligence) => (
				<p> {record.data.mlcb_check_result?.last_checked}</p>
			),
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (status: string, record: IDueDiligence) => (
				<Typography.Text
					type={getColorTextDiligence(record.data.mlcb_check_result?.mlcb_check_status)}
				>
					{record.data.mlcb_check_result?.mlcb_check_status}
				</Typography.Text>
			),
		},
		{
			title: "Result",
			dataIndex: "result",
			key: "result",
			render: (status: string, record: IDueDiligence) => (
				<Typography.Text
					type={getColorTextDiligence(
						record?.data?.mlcb_check_result?.mlcb_result_summary
					)}
				>
					{record.data.mlcb_check_result?.mlcb_result_summary || DASH}
				</Typography.Text>
			),
		},
	];

	const columnMLCBDetail: ColumnsType<IMLCBDetail> = [
		{
			title: "Validation Rule",
			dataIndex: "validationRule",
			key: "validationRule",
		},
		{
			title: "Result",
			dataIndex: "result",
			key: "result",
			align: "center",
			render: (result: string) => (
				<Typography.Text type={getColorTextDiligence(result)}>{result}</Typography.Text>
			),
		},
		{
			title: "Details",
			dataIndex: "details",
			key: "details",
			render: (details: string) => (
				<Typography.Text type={getColorTextDiligence(details)}>{details}</Typography.Text>
			),
		},
	];

	const diligenceDetailData: IMLCBDetail[] = [
		{
			key: "1",
			validationRule: "Self-Exclusion Check",
			result: diligenceDetail?.data?.mlcb_check_result?.self_exclusion?.status || DASH,
			details: diligenceDetail?.data?.mlcb_check_result?.late_repayment?.details || DASH,
		},
		{
			key: "2",
			validationRule: "Late Repayments Check",
			result: diligenceDetail?.data?.mlcb_check_result?.late_repayment?.status || DASH,
			details: diligenceDetail?.data?.mlcb_check_result?.late_repayment?.details || DASH,
		},
	];

	const renderInfoContent = () => {
		return (
			<>
				<div className="flex flex-col gap-2">
					<div className="flex gap-2 ">
						<div className="font-medium">MLCB check:</div>
						<div>{diligenceDetail?.data.mlcb_check_result?.mlcb_result_summary || DASH}</div>
					</div>
					<div className="flex gap-2">
						<div className="font-medium">Last check:</div>
						<div>{diligenceDetail?.data.mlcb_check_result?.last_checked || DASH }</div>
					</div>
					<div className="flex gap-2">
						<div className="font-medium">Balance Loan Quantum Allowed:</div>
						<div>{diligenceDetail?.data.mlcb_check_result?.balance_loan_quantum_allow || DASH}</div>
					</div>
					<div className="flex gap-2 mt-4">
						<div className="font-medium">Detail</div>
					</div>
				</div>
			</>
		);
	};
	return (
		<ApplicationModalLayout
			leftContent={
				historyData.length ? (
					<Table<IDueDiligence>
						size="small"
						key={historyData[0]?.id}
						columns={columnsMLCB}
						dataSource={historyData}
						rowKey={historyData[0]?.id}
						pagination={historyData.length > 10 ? undefined : false}
						onRow={(record) => ({
							onClick: () => {
								setCurrentId(record.id);
							},
						})}
						className="cursor-pointer"
					/>
				) : (
					<Skeleton active />
				)
			}
			infoContent={renderInfoContent()}
			tableContent={
				<Table
					bordered={false}
					columns={columnMLCBDetail}
					dataSource={diligenceDetailData}
					rowKey="key"
					pagination={false}
				/>
			}
		/>
	);
};

export default ModalMLCBHistory;
