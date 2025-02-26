import { Skeleton, Table, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import applicationApi from "../../../../api/module/application.api";
import { DASH } from "../../../../constants/general.constant";
import {
	IDueDiligence
} from "../../../../interface/due.dilegence.api";
import { getColorTextDiligence } from "../../../../utils/utils";
import ApplicationModalLayout from "./ApplicationModalLayout";

const ModalWorldCheckHistory = ({ id }: { id: string }) => {
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
			checkType: "Worldcheck",
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

	const columnsDNB = [
		{
			title: "Check Time",
			dataIndex: "checkType",
			key: "checkType",
			render: (status: string, record: IDueDiligence) => (
				<p> {record.data.worldcheck_result.last_checked}</p>
			),
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (result: string, record: IDueDiligence) => (
				<Typography.Text
					type={getColorTextDiligence(
						record.data.worldcheck_result?.worldcheck_check_status
					)}
				>
					{record.data.worldcheck_result?.worldcheck_check_status}
				</Typography.Text>
			),
		},
		{
			title: "Result",
			dataIndex: "result",
			key: "result",
			render: (result: string, record: IDueDiligence) => (
				<Typography.Text
					type={getColorTextDiligence(
						record.data.worldcheck_result?.worldcheck_result_summary
					)}
				>
					{record.data.worldcheck_result?.worldcheck_result_summary}
				</Typography.Text>
			),
		},
	];

	const columnsWolrdDetail = [
		{
			title: "Validation Rule",
			dataIndex: "validationRule",
			key: "validationRule",
		},
		{
			title: "Result",
			dataIndex: "result",
			key: "result",
		},
		{
			title: "Details",
			dataIndex: "details",
			key: "details",
		},
	];

	const diligenceDetailData = [
		{
			key: "1",
			validationRule: "Hits",
			result: diligenceDetail?.data?.worldcheck_result?.worldcheck_details?.result || DASH,
			details: diligenceDetail?.data?.worldcheck_result.worldcheck_details?.details || DASH,
		},
	];

	const renderInfoContent = () => {
		return (
			<>
				<div className="flex flex-col gap-2">
					<div className="flex gap-2 ">
						<div className="font-medium">Worldcheck Status:</div>
						<Typography.Text
							type={getColorTextDiligence(
								diligenceDetail?.data.worldcheck_result?.worldcheck_result_summary
							)}
						>
							{diligenceDetail?.data.worldcheck_result?.worldcheck_result_summary}
						</Typography.Text>
					</div>
					<div className="flex gap-2">
						<div className="font-medium">Last check:</div>
						<div>{diligenceDetail?.data.worldcheck_result?.last_checked}</div>
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
					columns={columnsWolrdDetail}
					dataSource={diligenceDetailData}
					rowKey={diligenceDetail?.id}
					key={diligenceDetail?.id}
					pagination={false}
				/>
			}
		/>
	);
};

export default ModalWorldCheckHistory;
