import React, { memo, useState } from "react";
import { Badge, Collapse, CollapseProps, Table } from "antd";
import { MAP_BADGE_COLOR_STATUS } from "../../../constants/general.constant";
import { tApplicationStatusName } from "../../../types/common.type";

import { ITablePaginationConfig } from "../../../interface/pagination.interface";
import { ILoan } from "../../../interface/borrower.interface";

interface LoanData {
	key: string;
	loanId: string;
	applicationId: string;
	disbursementDate: string;
	loanAmount: string;
	outstandingAmount: string;
	status: string;
}

type TableLoanProps = {
	data: ILoan[]
}

const TableLoan: React.FC<TableLoanProps> = ({ data }) => {
	// const data: ILoan[] = [];
	const [paginationConfig, setPaginationConfig] = useState<ITablePaginationConfig>({
		current: 0,
		pageSize: 20,
		total: data.length || 0
	})

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
			render: (text: string) => <span>SGD {text}</span>,
		},
		{
			title: "Outstanding Amount",
			dataIndex: "outstandingAmount",
			key: "outstandingAmount",
			render: (text: string) => <span>{text}</span>,
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
			label: <span className="font-semibold">List of loans ({paginationConfig?.total})</span>,
			children: <Table dataSource={data} columns={columns} pagination={{
				pageSize: paginationConfig?.pageSize ? paginationConfig?.pageSize : 20,
				current: paginationConfig?.current ? paginationConfig?.current + 1 : 1,
				total: paginationConfig?.total ? paginationConfig?.total : 0,
				pageSizeOptions: [20, 50, 100],
				showSizeChanger: true
			}} />,
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
