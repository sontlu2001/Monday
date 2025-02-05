import {
	FileDoneOutlined,
	ReconciliationOutlined,
	SolutionOutlined,
	UsergroupAddOutlined
} from "@ant-design/icons";

const menuConfigs = [
	{
		key: "/borrower",
		label: "Borrower Management",
		icon: <UsergroupAddOutlined />,
		children: [
			{
				key: "/borrower/create",
				label: "Create Borrower",
				icon: <SolutionOutlined />,
			},
		],
	},
	{
		key: "/application",
		label: "Application Management",
		icon: <ReconciliationOutlined />,
		children: [
			{
				key: "/application/dashboard",
				label: "List of Applications",
				icon: <FileDoneOutlined />,
			},
			{
				key: "/application/assigned",
				label: "Assigned Applications",
				icon: <SolutionOutlined />,
			},
		],
	},
];

export default menuConfigs;
