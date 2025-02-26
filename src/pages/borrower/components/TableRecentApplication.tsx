import { Badge, Collapse, CollapseProps, Table } from "antd";
import { useBorrowerDetailContext } from "../../../context/BorrowerDetailContext";
import { IApplication } from "../../../interface/application.interface";
import { formatCurrency, formatDate } from "../../../utils/utils";
import { LOAN_TYPE, MAP_APPLICATION_STATUS_COLOR, MAP_APPLICATION_STATUS_NAME, MAP_LOAN_TYPE_NAME } from "../../../constants/general.constant";
import { tApplicationStatus } from "../../../types/common.type";
import { useState } from "react";
import { ITablePaginationConfig } from "../../../interface/pagination.interface";
import { useNavigate } from "react-router-dom";

interface RecentApplication {
	key: number;
	applicationId: number;
	loanId: string;
	applicationDate: string;
	productType: string;
	applicationAmount: string;
	status: string;
}

const TableRecentApplication = () => {
	const { listApplications } = useBorrowerDetailContext();
	const navigate = useNavigate();
	const data: RecentApplication[] = listApplications.map((item: IApplication) => {
		return {
			key: item.id,
			applicationId: item.id,
			loanId: String(item.loanId || "-"),
			applicationDate: formatDate(item.dateOfApplication, "DD/MM/YYYY"),
			productType: MAP_LOAN_TYPE_NAME.get(item.loanType) || MAP_LOAN_TYPE_NAME.get(LOAN_TYPE.UNSECURED)!,
			applicationAmount: formatCurrency(item.loanAmount),
			status: item.applicationStatus,
		};
	});
	const [paginationConfig, setPaginationConfig] = useState<ITablePaginationConfig>({
		current: 0,
		pageSize: 20,
		total: data.length || 0,
	})

	const columns = [
		{
			title: "Application ID",
			dataIndex: "applicationId",
			key: "applicationId",
			render: (text: string) => (
				// <span className={[text === "-" ? "" : "cursor-pointer text-blue-700"].join(" ")}>{text}</span>
				<a
					href="#"
					className="text-blue-500"
					onClick={(e) => {
						e.preventDefault();
						navigate(`/application/dashboard/${text}`);
					}}
				>
					{text}
				</a>
			),
		},
		{
			title: "Loan ID",
			dataIndex: "loanId",
			key: "loanId",
			render: (text: string) => (
				<span className={[text === "-" ? "" : "cursor-pointer text-blue-700"].join(" ")}>{text}</span>
			),
		},
		{
			title: "Application Date",
			dataIndex: "applicationDate",
			key: "applicationDate",
			render: (text: string) => <span>{new Date(text).toLocaleDateString()}</span>,
		},
		{ title: "Product Type", dataIndex: "productType", key: "productType", render: (text: string) => <span>{text}</span>, },
		{
			title: "Application Amount",
			dataIndex: "applicationAmount",
			key: "applicationAmount",
			render: (text: string) => <span>SGD {text}</span>,
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (text: string) =>
				<Badge
					color={MAP_APPLICATION_STATUS_COLOR.get(text as tApplicationStatus)}
					text={MAP_APPLICATION_STATUS_NAME.get(text as tApplicationStatus)}
				/>,
		},
	];

	const collapseItem: CollapseProps["items"] = [
		{
			key: "1",
			label: <span className="font-semibold">List of Applications ({paginationConfig?.total})</span>,
			children: <Table dataSource={data} columns={columns} pagination={{
				pageSize: paginationConfig?.pageSize ? paginationConfig?.pageSize : 20,
				current: paginationConfig?.current ? paginationConfig?.current + 1 : 1,
				total: paginationConfig?.total ? paginationConfig?.total : 0,
				pageSizeOptions: [20, 50, 100],
				showSizeChanger: true
			}}></Table>,
		},
	];
	return (
		<Collapse
			items={collapseItem}
			defaultActiveKey={["1"]}
			expandIconPosition="end"
		></Collapse>
	);
};

export default TableRecentApplication;
