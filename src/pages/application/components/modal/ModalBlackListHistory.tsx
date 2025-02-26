import { Table, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import applicationApi from "../../../../api/module/application.api";
import { DASH } from "../../../../constants/general.constant";
import { IDueDiligence } from "../../../../interface/due.dilegence.api";
import {
	convertToPercent,
	getColorTextDiligence,
} from "../../../../utils/utils";
import ApplicationModalLayout from "./ApplicationModalLayout";
import TemplateInfoItem from "../common/TemplateInfoItem";

const ModalBlackListHistory = ({ id }: { id: string }) => {
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
			checkType: "Blacklist",
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

	const columnsBlackList = [
		{
			title: "Check Time",
			dataIndex: "checkType",
			key: "checkType",
			render: (status: string, record: IDueDiligence) => (
				<p> {record.data.blacklist_check_result.last_checked}</p>
			),
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (status: string, record: IDueDiligence) => (
				<Typography.Text
					type={getColorTextDiligence(
						record?.data.blacklist_check_result?.blacklist_check_status
					)}
				>
					{record?.data.blacklist_check_result?.blacklist_check_status || DASH}
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
						record?.data.blacklist_check_result?.blacklist_result_summary
					)}
				>
					{record?.data.blacklist_check_result?.blacklist_result_summary || DASH}
				</Typography.Text>
			),
		},
	];

	const renderInfoContent = () => {
		const { blacklist_result_summary, last_checked, blacklisted, match_percent } = diligenceDetail?.data.blacklist_check_result || {};
		return (
			<>
				<div className="flex flex-col gap-2">
					<TemplateInfoItem
						label="Blacklist Check Status"
						content={
							<Typography.Text type={getColorTextDiligence(blacklist_result_summary)}>
								{blacklist_result_summary || DASH}
							</Typography.Text>
						}
					/>
					<TemplateInfoItem label="Last check" content={last_checked} />
					<TemplateInfoItem label="Blacklisted" content={blacklisted} />
					<TemplateInfoItem label="Match Percentage" content={convertToPercent(match_percent)} />
				</div>
			</>
		);
	};

	return (
		<ApplicationModalLayout
			leftContent={
				<Table
					size="small"
					key={historyData[0]?.id}
					columns={columnsBlackList}
					dataSource={historyData}
					rowKey={historyData[0]?.id}
					pagination={false}
					onRow={(record) => ({
						onClick: () => {
							setCurrentId(record.id);
						},
					})}
					className="cursor-pointer"
				/>
			}
			infoContent={renderInfoContent()}
		/>
	);
};

export default ModalBlackListHistory;
