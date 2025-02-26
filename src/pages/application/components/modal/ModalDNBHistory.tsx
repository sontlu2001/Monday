import { Skeleton, Table, TableProps, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import applicationApi from "../../../../api/module/application.api";
import { IDueDiligence } from "../../../../interface/due.dilegence.api";
import { getColorTextDiligence } from "../../../../utils/utils";
import ApplicationModalLayout from "./ApplicationModalLayout";
import { DASH } from "../../../../constants/general.constant";

interface IDNBDetail {
	key: string;
	validationRule: string;
	result: string | undefined;
	details: string | undefined;
}

const ModalDNBHistory = ({ id }: { id: string }) => {
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
			checkType: "DNB",
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

	const columnsDNB: TableProps<IDueDiligence>["columns"] = [
		{
			title: "Check Time",
			dataIndex: "checkType",
			key: "checkType",
			render: (status: string, record: IDueDiligence) => (
				<p> {record.data.dnb_check_result?.last_checked || DASH}</p>
			),
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			align: "center",
			render: (status: string, record: IDueDiligence) => (
				<Typography.Text
					type={getColorTextDiligence(record?.data.dnb_check_result?.dnb_check_status)}
				>
					{record?.data.dnb_check_result?.dnb_check_status || DASH}
				</Typography.Text>
			),
		},
		{
			title: "Result",
			dataIndex: "result",
			key: "result",
			align: "center",
			render: (result: string, record: IDueDiligence) => (
				<Typography.Text
					type={getColorTextDiligence(record?.data.dnb_check_result?.dnb_result_summary)}
				>
					{record?.data.dnb_check_result?.dnb_result_summary || DASH}
				</Typography.Text>
			),
		},
	];

	const columnsDNBDetail: TableProps<IDNBDetail>["columns"] = [
		{
			title: "Validation Rule",
			dataIndex: "validationRule",
			key: "validationRule",
		},
		{
			title: "Result",
			dataIndex: "result",
			key: "result",
			render: (result: string | undefined) => (
				<Typography.Text type={getColorTextDiligence(result)}>
					{result || DASH}
				</Typography.Text>
			),
		},
		{
			title: "Details",
			dataIndex: "details",
			key: "details",
			render: (details: string | undefined) => (
				<Typography.Text>{details || DASH}</Typography.Text>
			),
		},
	];

	const diligenceDetailData = [
		{
			key: "1",
			validationRule: "No Bankruptcy Proceeding",
			result:
				diligenceDetail?.data?.dnb_check_result?.no_bankruptcy_proceeding?.status,
			details:
				diligenceDetail?.data?.dnb_check_result?.no_bankruptcy_proceeding?.details,
		},
		{
			key: "2",
			validationRule: "Bankruptcy Discharged",
			result: diligenceDetail?.data?.dnb_check_result?.bankruptcy_discharged?.status,
			details:
				diligenceDetail?.data?.dnb_check_result?.bankruptcy_discharged?.details,
		},
		{
			key: "3",
			validationRule: "No Material Litigation",
			result: diligenceDetail?.data?.dnb_check_result?.no_material_litigation?.status,
			details:
				diligenceDetail?.data?.dnb_check_result?.no_material_litigation?.details,
		},
	];

	const renderInfoContent = () => {
		return (
			<>
				<div className="flex flex-col gap-2">
					<div className="flex gap-2 ">
						<div className="font-medium">DNB check:</div>
						<Typography.Text
							type={getColorTextDiligence(
								diligenceDetail?.data.dnb_check_result?.dnb_result_summary
							)}
						>
							{diligenceDetail?.data.dnb_check_result?.dnb_result_summary || DASH}
						</Typography.Text>
					</div>
					<div className="flex gap-2">
						<div className="font-medium">Last check:</div>
						<div>{diligenceDetail?.data.dnb_check_result?.last_checked || DASH}</div>
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
						columns={columnsDNB}
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
					<Skeleton active></Skeleton>
				)
			}
			infoContent={renderInfoContent()}
			tableContent={
				<Table
					bordered={false}
					columns={columnsDNBDetail}
					dataSource={diligenceDetailData}
					rowKey={diligenceDetail?.id}
					key={diligenceDetail?.id}
					pagination={false}
				/>
			}
		/>
	);
};

export default ModalDNBHistory;
