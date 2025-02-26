import { Skeleton, Table, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import applicationApi from "../../../../api/module/application.api";
import { IDueDiligence } from "../../../../interface/due.dilegence.api";
import { getColorTextDiligence } from "../../../../utils/utils";
import ApplicationModalLayout from "./ApplicationModalLayout";
import { DASH } from "../../../../constants/general.constant";

const ModalMyInfoHistory = ({ id }: { id: string }) => {
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
			checkType: "MyInfo",
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

	const columnsMyInfo = [
		{
			title: "Check Time",
			dataIndex: "checkType",
			key: "checkType",
			render: (status: string, record: IDueDiligence) => (
				<p> {record.data.myInfo_check_result?.last_checked}</p>
			),
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (result: string, record: IDueDiligence) => (
				<Typography.Text
					type={getColorTextDiligence(
						record.data.myInfo_check_result?.myInfo_check_status
					)}
				>
					{record.data.myInfo_check_result?.myInfo_check_status}
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
						record.data.myInfo_check_result?.myInfo_result_summary
					)}
				>
					{record.data.myInfo_check_result?.myInfo_result_summary}
				</Typography.Text>
			),
		},
	];

	const columnsDNBDetail = [
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
		},
	];

	const diligenceDetailData = [
		{
			key: "1",
			validationRule: "Singaporean/Permanent Resident",
			result: diligenceDetail?.data?.myInfo_check_result?.spr_flag?.status || DASH,
			details: diligenceDetail?.data?.myInfo_check_result?.spr_flag?.details || DASH,
		},
		{
			key: "2",
			validationRule: "Age Between 21 and 65 Years",
			result:
				diligenceDetail?.data?.myInfo_check_result?.borrower_age?.status || DASH,
			details:
				diligenceDetail?.data?.myInfo_check_result?.borrower_age?.details || DASH,
		},
		{
			key: "3",
			validationRule: "Legitimate Source of Income",
			result: diligenceDetail?.data?.myInfo_check_result?.legitimate_source_income?.status || DASH,
			details: diligenceDetail?.data?.myInfo_check_result?.legitimate_source_income?.details || DASH,
		},
	];

	const renderInfoContent = () => {
		return (
			<>
				<div className="flex flex-col gap-2">
					<div className="flex gap-2 ">
						<div className="font-medium">MyInfo check:</div>
						<Typography.Text
							type={getColorTextDiligence(
								diligenceDetail?.data.myInfo_check_result?.myInfo_result_summary
							)}
						>
							{diligenceDetail?.data.myInfo_check_result?.myInfo_result_summary || DASH}
						</Typography.Text>
					</div>
					<div className="flex gap-2">
						<div className="font-medium">Last check:</div>
						<div>{diligenceDetail?.data.myInfo_check_result?.last_checked || DASH}</div>
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
						columns={columnsMyInfo}
						dataSource={historyData}
						rowKey={historyData[0]?.id}
						pagination={historyData.length > 10 ? undefined : false}
						onRow={(record) => ({
							onClick: () => {
								setCurrentId(record?.id);
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

export default ModalMyInfoHistory;
