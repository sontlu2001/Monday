import {
	DownOutlined,
	ExclamationCircleOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import {
	Badge,
	Breadcrumb,
	Button,
	Divider,
	Dropdown,
	Modal,
	Radio,
	RadioChangeEvent,
	Space,
	Table,
	TableProps,
	Typography,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import rolesApi from "../../../api/module/roles.api";
import { RolesTabProvider } from "../../../context/RolesTabsContext";
import { SEARCH_ROLE_TYPE } from "../constant/role.constant";
import {
	IFormSearchBar,
	IRole,
	tSearchRoleType,
} from "../interface/roles.interface";
import RoleDetailModal from "./components/modal/RoleDetailModal";
import RolesCreateModal from "./components/modal/RolesCreateModal";
import RoleSearchBar from "./components/search/RoleSearchBar";
import { handleApiResponseError } from "../../../utils/utils";

const { confirm } = Modal;

const RolesPage = () => {
	const [listRoles, setListRoles] = useState<IRole[]>([]);
	const [isCreateRoleModal, setShowCreateRoleModal] = useState(false);
	const [isDetailRoleModal, setShowDetailRoleModal] = useState(false);
	const [currentRole, setCurrentRole] = useState<IRole>();
	const [titleModal, setTitleModal] = useState("");
	const [isGettingRoles, setGettingRoles] = useState(true);
	const [searchRoleType, setSearchRoleType] = useState<tSearchRoleType>(
		SEARCH_ROLE_TYPE.active
	);
	const [searchParams, setSearchParams] = useState<IFormSearchBar>();

	const getListRoles = useCallback(
		async (formData?: IFormSearchBar) => {
			setGettingRoles(true);

			try {
				const response = await rolesApi.getListRoles({
					rolesName: formData?.role,
					status: searchRoleType,
				});

				if (response) {
					setListRoles(response);
				}
			} catch (error) {
				console.error(error);
			} finally {
				setGettingRoles(false);
			}
		},
		[searchRoleType]
	);

	useEffect(() => {
		getListRoles(searchParams);
	}, [searchRoleType, searchParams]);
	const handleShowDetailRoles = (roles: IRole) => {
		setCurrentRole(roles);
		setTitleModal(roles.name);
		setShowDetailRoleModal(true);
	};

	const updateRoleStatus = async (row: IRole) => {
		try {
			const updatedRole = {
				name: row.name,
				category: row.category?.id,
				description: row.description,
				status: !row.status,
			};

			await rolesApi.editRole(updatedRole, row.id);

			getListRoles();
		} catch (error: unknown) {
			handleApiResponseError(error);
		}
	};

	const showConfirmUpdateStatus = (row: IRole) => {
		confirm({
			title: `Are you sure ${row.status ? 'deactivate' :'activate'} this role?`,
			icon: <ExclamationCircleOutlined />,
			okText: "Yes",
			onOk: async () => {
				await updateRoleStatus(row);
			},
		});
	};

	const columns: TableProps<IRole>["columns"] = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			render: (_, row) => (
				<Space>
					<Badge status={row.status ? "success" : "default"} />
					{row.name}
				</Space>
			),
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "Category",
			dataIndex: "category",
			key: "category",
			render: (_, row) => <span>{row.category?.name}</span>,
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			align: "center",
			render: (_, row) => (
				<Space size="middle">
					<Button type="link" onClick={() => handleShowDetailRoles(row)}>
						Edit
					</Button>
					<Divider type="vertical" />
					<Dropdown
						menu={{
							items: [
								{
									key: "2",
									label: row.status ? "Deactive Roles" : "Activate Roles",
									onClick: () => showConfirmUpdateStatus(row),
								},
							],
						}}
					>
						<div className="text-blue-500 flex gap-2 cursor-pointer">
							More <DownOutlined />
						</div>
					</Dropdown>
				</Space>
			),
		},
	];

	const onSearchRole = useCallback((formData: IFormSearchBar) => {
		setSearchParams(formData);
	}, []);

	const onResetSearchRole = useCallback((formData: IFormSearchBar) => {
		setSearchParams(formData);
	}, []);

	const handleShowRoleModal = () => {
		setShowCreateRoleModal(true);
		setTitleModal("Create New Role");
	};

	const handleChangeSearchType = (e: RadioChangeEvent) => {
		setSearchRoleType(e.target.value);
	};

	const getNewRoles = useCallback(() => {
		getListRoles();
	}, [getListRoles]);

	return (
		<>
			<main className="flex flex-col gap-4">
				<section>
					<Breadcrumb
						items={[{ title: "Home" }, { title: "User Management" }, { title: "Roles" }]}
					/>
					<p className="font-semibold text-2xl pt-2">Roles</p>
				</section>
				<section>
					<RoleSearchBar
						eventSearchRoles={onSearchRole}
						eventResetSearchRoles={onResetSearchRole}
					/>
				</section>
				<section>
					<div className="card">
						<div className="flex justify-between items-center">
						<Typography.Title className="!mb-0" level={5}>
								Roles
							</Typography.Title>
							<Space>
								<Radio.Group value={searchRoleType} onChange={handleChangeSearchType}>
									<Radio.Button value={SEARCH_ROLE_TYPE.active}>Active Roles</Radio.Button>
									<Radio.Button value={SEARCH_ROLE_TYPE.deactivate}>Inactive Roles</Radio.Button>
								</Radio.Group>
								<Button
									icon={<PlusOutlined />}
									variant="filled"
									type="primary"
									onClick={handleShowRoleModal}
								>
									Add New
								</Button>
							</Space>
						</div>
						<Table
							rowKey="id"
							className="pt-4"
							size="small"
							dataSource={listRoles}
							columns={columns}
							loading={isGettingRoles}
							scroll={{ x: 240 }}
						/>
					</div>
				</section>
				{isCreateRoleModal && (
					<RolesTabProvider>
						<RolesCreateModal
							title={titleModal}
							setShowRolesModal={setShowCreateRoleModal}
							eventCreateNewRole={getNewRoles}
						/>
					</RolesTabProvider>
				)}
				{isDetailRoleModal && (
					<RolesTabProvider roleId={currentRole?.id} currentRole={currentRole}>
						<RoleDetailModal
							title={titleModal}
							setShowRolesModal={setShowDetailRoleModal}
							eventCreateNewRole={getNewRoles}
						/>
					</RolesTabProvider>
				)}
			</main>
		</>
	);
};

export default RolesPage;
