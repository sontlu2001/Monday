import {
	LogoutOutlined,
	MenuOutlined,
	SearchOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { useAuthContext } from "@asgardeo/auth-react";
import { AutoComplete, Dropdown, Input, Layout, Menu, Typography } from "antd";
import { DefaultOptionType } from "antd/es/select";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import globalSearchApi from "../../api/module/global.search.api";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import useDebounce from "../../hooks/useDebounce";
import {
	IGlobalSearch,
	IGroupedOption,
} from "../../interface/global.search.interface";
import { setSidebarCollapsed } from "../../redux/slice/sidebarSlice";
import "./header.scss";
import { ROUTES } from "../../constants/routes.constant";
import { MAP_LOAN_TYPE_NAME } from "../../constants/general.constant";
import logo from "../../assets/header-logo.png";

const { Text } = Typography;
const { Header: AntdHeader } = Layout;

const createOptions = (
	data: IGlobalSearch,
	searchTerm: string
): IGroupedOption[] => [
	{
		label: <span>Applications</span>,
		options: data.application.map((application) => ({
			value: `${application.id} - ${MAP_LOAN_TYPE_NAME.get(application.loanType)}`,
			label: (
				<div className="search-item">
					{application.id} - {MAP_LOAN_TYPE_NAME.get(application.loanType)}
				</div>
			),
			path: ROUTES.APPLICATION_DETAIL(application.id),
		})),
	},
	{
		label: <span>Borrowers</span>,
		options: data.borrower.map((item) => ({
			value: `${item.fullName} - ${item.idNo}`,
			label: (
				<div className="search-item">
					{item.fullName} - {item.idNo}
				</div>
			),
			path: ROUTES.BORROWER_DETAIL(item.id),
		})),
	},
];

const Header: React.FC = () => {
	const { signOut } = useAuthContext();
	const isCollapsed = useAppSelector((state) => state.sidebar.isCollapsed);
	const dispatch = useAppDispatch();
	const [options, setOptions] = useState<IGroupedOption[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const debouncedSearchTerm = useDebounce<string>(searchTerm, 400);
	const navigate = useNavigate();

	useEffect(() => {
		const getDataGlobalSearch = async () => {
			if (debouncedSearchTerm) {
				try {
					const response = await globalSearchApi.getOption(debouncedSearchTerm);
					setOptions(createOptions(response, debouncedSearchTerm));
				} catch (error) {
					console.error(error);
				}
			} else {
				setOptions([]);
			}
		};

		getDataGlobalSearch();
	}, [debouncedSearchTerm]);

	const toggleCollapseSidebar = () => {
		dispatch(setSidebarCollapsed(!isCollapsed));
	};

	const handleSelectOption = (_: string, option: DefaultOptionType) => {
		navigate(option.path);
	};

	// Handle Logout
	const handleLogout = () => {
		signOut();
	};

	const userMenu = (
		<Menu>
			<Menu.Item key="logout" onClick={handleLogout}>
				<LogoutOutlined />
				<span style={{ marginLeft: 8 }}>Logout</span>
			</Menu.Item>
		</Menu>
	);

	return (
		<AntdHeader className="custom-header">
			{/* Sidebar Toggle and Title */}
			<div
				className="header-left cursor-pointer"
				onClick={() => navigate(ROUTES.CREATE_BORROWER)}
			>
				<img srcSet={logo} alt="logo" />
				<Text className="header-title">Monday Portal</Text>
			</div>

			<div className="header-search">
				<AutoComplete
					className="search-input"
					options={options}
					size="large"
					onSearch={setSearchTerm}
					onSelect={handleSelectOption}
				>
					<Input.Search
						size="large"
						placeholder="Search borrowers, loans, applications..."
						enterButton={<SearchOutlined />}
					/>
				</AutoComplete>
			</div>

			<div className="header-user">
				<Text className="user-name">Admin</Text>
				<Dropdown overlay={userMenu} trigger={["click"]}>
					<UserOutlined className="user-icon" />
				</Dropdown>
			</div>
		</AntdHeader>
	);
};

export default Header;
