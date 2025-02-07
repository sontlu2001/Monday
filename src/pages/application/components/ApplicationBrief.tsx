import { Badge, Divider } from "antd";
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
		<div className="border px-4 py-4 rounded-md shadow-sm">
			{typeof title === "string" ? (
				<h2 className="text-lg font-bold mb-2">{title}</h2>
			) : (
				<div className="custom-title mb-2">{title}</div>
			)}
			<div className="card-content">{children}</div>
		</div>
	);
};

const BadgeList: React.FC<{ data: IStatusData[]}> = ({
	data,
}) => (
	<>
		{data.map((item, index) => (
			<div key={index} className="flex items-center">
					<Badge color={MAP_BADGE_COLOR_STATUS.get(item.label)} text={item.label} />
					<div>
						<Divider type="vertical" />
						<span>{item.count}</span>
					</div>
			</div>
		))}
	</>
);

const ApplicationBrief = (props: IApplicationStatistics) => {
	const {secured, unsecured} = props;
	const unsecuredApplicationStatus: IStatusData[] = [
		{ label: "Pending", count: unsecured.pending },
		{ label: "Disbursement Cancel", count: unsecured.disbursementCancel},
		{ label: "Offer Pending", count: unsecured.editPending },
		{ label: "Under Review", count: unsecured.underReview },
		{ label: "Disbursement Under Review", count: unsecured.disbursementUnderReview},
		{ label: "Offer Approved", count: unsecured.editApproved },
		{ label: "Approved", count: unsecured.approved },
		{ label: "Disbursement Approved", count: unsecured.disbursementApproved},
		{ label: "Disbursed", count: unsecured.disbursed },
		{ label: "Rejected", count: unsecured.rejected },
		{ label: "Disbursement Return", count: unsecured.disbursementReturn},
	];

	const securedApplication: IStatusData[] = [
		{ label: "Pending", count: secured.pending },
		{ label: "Disbursement Cancel", count: secured.disbursementCancel},
		{ label: "Offer Pending", count: secured.editPending },
		{ label: "Under Review", count: secured.underReview },
		{ label: "Disbursement Under Review", count: secured.disbursementUnderReview},
		{ label: "Offer Approved", count: secured.editApproved },
		{ label: "Approved", count: secured.approved },
		{ label: "Disbursement Approved", count: secured.disbursementApproved},
		{ label: "Disbursed", count: secured.disbursed },
		{ label: "Rejected", count: secured.rejected },
		{ label: "Disbursement Return", count: secured.disbursementReturn},
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
			<CardItem title={<span className="font-semibold">Unsecured Application: {unsecured.total}</span>}>
				<div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4">
					<BadgeList data={unsecuredApplicationStatus} />
				</div>
			</CardItem>
			<CardItem title={<span className="font-semibold">Secured Application: {secured.total}</span>}>
				<div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4">
					<BadgeList data={securedApplication} />
				</div>
			</CardItem>
		</div>
	);
};

export default memo(ApplicationBrief);
