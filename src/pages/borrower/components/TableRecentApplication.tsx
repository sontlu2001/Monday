import { Badge, Collapse, CollapseProps, Table } from "antd";
import { useBorrowerDetailContext } from "../../../context/BorrowerDetailContext";
import { IApplication } from "../../../interface/application.interface";
import { formatCurrency, formatDate } from "../../../utils/utils";
import { MAP_APPLICATION_STATUS_COLOR, MAP_APPLICATION_STATUS_NAME, MAP_LOAN_TYPE_NAME } from "../../../constants/general.constant";
import { tApplicationStatus } from "../../../types/common.type";

interface RecentApplication {
	key: string;
	applicationId: string;
	loanId: string;
	applicationDate: string;
	productType: string;
	applicationAmount: string;
	status: string;
}

const TableRecentApplication = () => {
	const {listApplications} = useBorrowerDetailContext();
	const data: RecentApplication[]  = listApplications.map((item: IApplication) => {
		return {
			key: item.id,	
			applicationId: item.id,
			loanId: "",
			applicationDate: formatDate(item.dateOfApplication,"DD/MM/YYYY"),
			productType: MAP_LOAN_TYPE_NAME.get(item.loanType),
			applicationAmount: formatCurrency(item.loanAmount),
			status: item.applicationStatus,
		};
	});

	const columns = [
		{
			title: "Application ID",
			dataIndex: "applicationId",
			key: "applicationId",
			render: (text: string) => (
				<span className="text-blue-700 cursor-pointer">{text}</span>
			),
		},
		{
			title: "Loan ID",
			dataIndex: "loanId",
			key: "loanId",
			render: (text: string) => (
				<span className="text-blue-700 cursor-pointer">{text}</span>
			),
		},
		{
			title: "Application Date",
			dataIndex: "applicationDate",
			key: "applicationDate",
		},
		{ title: "Product Type", dataIndex: "productType", key: "productType" },
		{
			title: "Application Amount",
			dataIndex: "applicationAmount",
			key: "applicationAmount",
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
			label: "Recent Application",
			children: <Table dataSource={data} columns={columns}></Table>,
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
