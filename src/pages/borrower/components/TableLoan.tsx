import React, { memo } from "react";
import { Badge, Collapse, CollapseProps, Table } from "antd";
import { MAP_BADGE_COLOR_STATUS } from "../../../constants/general.constant";
import { tApplicationStatusName } from "../../../types/common.type";

interface LoanData {
	key: string;
	loanId: string;
	applicationId: string;
	disbursementDate: string;
	loanAmount: string;
	outstandingAmount: string;
	status: string;
}

const TableLoan: React.FC = () => {
	const data: LoanData[] = [];

	const columns = [
		{
			title: "Loan ID",
			dataIndex: "loanId",
			key: "loanId",
			render: (text: string) => (
				<span className="text-blue-700 cursor-pointer">{text}</span>
			),
		},
		{
			title: "Application ID",
			dataIndex: "applicationId",
			key: "applicationId",
			render: (text: string) => (
				<span className="text-blue-700 cursor-pointer">{text}</span>
			),
		},
		{
			title: "Disbursement Date",
			dataIndex: "disbursementDate",
			key: "disbursementDate",
			render: (text: string) => <span>{new Date(text).toLocaleDateString()}</span>,
		},
		{
			title: "Loan Amount",
			dataIndex: "loanAmount",
			key: "loanAmount",
			render: (text: string) => <span style={{ color: "green" }}>{text}</span>,
		},
		{
			title: "Outstanding Amount",
			dataIndex: "outstandingAmount",
			key: "outstandingAmount",
			render: (text: string) => <span style={{ color: "red" }}>{text}</span>,
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (text: tApplicationStatusName) => <Badge color={MAP_BADGE_COLOR_STATUS.get(text)} text={text} />,
		},
	];

	const collapseItem: CollapseProps["items"] = [
		{
			key: "1",
			label: "List of loans",
			children: <Table dataSource={data} columns={columns}></Table>,
		},
	];

	return (
		<Collapse
			items={collapseItem}
			defaultActiveKey={["1"]}
			expandIconPosition="end"
			className="mb-2"
		></Collapse>
	);
};

export default memo(TableLoan);
