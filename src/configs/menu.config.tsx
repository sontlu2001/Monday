import {
	CreditCardOutlined,
	DollarOutlined,
	FileAddOutlined,
	FileDoneOutlined,
	IdcardOutlined,
	ReconciliationOutlined,
	SafetyOutlined,
	SolutionOutlined,
	TeamOutlined,
	WalletOutlined
} from "@ant-design/icons";

const menuConfigs = [
	{
		key: "/borrower",
		label: "Borrower Management",
		icon: <WalletOutlined   />,
		children: [
			{
				key: "/borrower/create",
				label: "Create Borrower",
				icon: <FileAddOutlined />,
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
	{
		key: "/user",
		label: "User Management",
		icon: <TeamOutlined />,
		children: [
			{
				key: "/user/list",
				label: "User",
				icon: <IdcardOutlined />,
			},
			{
				key: "/user/roles",
				label: "Roles",
				icon: <SafetyOutlined />,
			},
		],
	},
	{
		key: "/loan",
		label: "Loan Management",
		icon: <DollarOutlined />,
		children: [
			{
				key: "/loan/dashboard",
				label: "Loan Dashboard",
				icon: <CreditCardOutlined />,
			},
		],
	},
];

export default menuConfigs;
