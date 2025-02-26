import { Badge, Col, Divider, Row } from "antd";
import React, { memo, ReactNode } from "react";
import { IApplicationStatistics } from "../../../interface/application.interface";
import {
	tApplicationStatusName,
	tLoanTypeName,
} from "../../../types/common.type";
import { MAP_BADGE_COLOR_STATUS } from "../../../constants/general.constant";

interface ICard {
	title: ReactNode;
	children: ReactNode;
}

interface IStatusData {
	label: tApplicationStatusName;
	count: number;
}

interface ILoanTypeData {
	label: tLoanTypeName;
	count: number;
}

const CardItem: React.FC<ICard> = ({ title, children }) => {
	return (
		<div className="p-4 border rounded-md shadow-sm bg-white">
			{typeof title === "string" ? (
				<h2 className="text-lg font-bold mb-2">{title}</h2>
			) : (
				<div className="custom-title mb-2">{title}</div>
			)}
			<div className="card-content">{children}</div>
		</div>
	);
};

const BadgeList: React.FC<{ data: IStatusData[] }> = ({
	data,
}) => (
	<Row>
		{data.map((item, index) => {
			return (
				<Col span={12}>
					<Badge color={MAP_BADGE_COLOR_STATUS.get(item.label)} text={item.label} style={{ width: [0, 2].includes(index) ? "110px" : "80px" }} />
					<Divider type="vertical" />
					<span className="ml-1">{item.count}</span>
				</Col>
			)
		})}
	</Row>
);

const ApplicationBrief = (props: IApplicationStatistics) => {
	const { secured, unsecured } = props;
	const unsecuredApplicationStatus: IStatusData[] = [
		{ label: "Pending", count: unsecured.pending },
		{ label: "Approved", count: unsecured.approved + unsecured.disbursementUnderReview + unsecured.disbursementCancel + unsecured.disbursementReturn + unsecured.disbursementApproved + unsecured.disbursed + unsecured.editApproved + unsecured.editPending },
		{ label: "Under Review", count: unsecured.underReview },
		{ label: "Rejected", count: unsecured.rejected }
	];

	const securedApplication: IStatusData[] = [
		{ label: "Pending", count: secured.pending },
		{ label: "Approved", count: secured.approved + secured.disbursementUnderReview + secured.disbursementCancel + secured.disbursementReturn + secured.disbursementApproved + secured.disbursed + secured.editApproved + secured.editPending },
		{ label: "Under Review", count: secured.underReview },
		{ label: "Rejected", count: secured.rejected }
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
			<CardItem title={<span className="font-semibold">Unsecured Application: {unsecured.total}</span>}>
					<BadgeList data={unsecuredApplicationStatus} />
			</CardItem>
			<CardItem title={<span className="font-semibold">Secured Application: {secured.total}</span>}>
					<BadgeList data={securedApplication} />
			</CardItem>
		</div>
	);
};

export default memo(ApplicationBrief);
