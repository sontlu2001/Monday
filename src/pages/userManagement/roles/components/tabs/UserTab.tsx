import { ExclamationCircleOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Modal, Transfer, TransferProps } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { memo, useEffect, useState } from "react";
import { toast } from "react-toastify";
import rolesApi from "../../../../../api/module/roles.api";
import { DASH, TOAST_MESSAGE } from "../../../../../constants/general.constant";
import { useRolesTabsContext } from "../../../../../context/RolesTabsContext";
import { IUserAccount, IUserRole } from "../../../interface/roles.interface";
import { handleApiResponseError } from "../../../../../utils/utils";
const { confirm } = Modal;

const UserTab = () => {
	const [isShowModalAddUser, setShowModalAddUser] = useState(false);

	const [targetKeys, setTargetKeys] = useState<TransferProps["targetKeys"]>([]);
	const [selectedKeys, setSelectedKeys] = useState<TransferProps["targetKeys"]>(
		[]
	);

	const [assignedUser, setAssignedUser] = useState<IUserRole[]>([]);

	const [isAddUser, setIsAddUser] = useState(false);

	const [isLoading, setLoading] = useState(true);

	const [userNotAssigned, setNotAssignedUser] = useState<IUserAccount[]>([]);

	const { currentRole } = useRolesTabsContext();

	useEffect(() => {
		getUserByRoleId();
	}, []);

	useEffect(() => {
		if (isShowModalAddUser) {
			getUserNotAssign();
		}
	}, [isShowModalAddUser]);

	const getParamsIdAssignUser = (): number[] => {
		if (assignedUser.length) return assignedUser.map((user) => user.userAccount.id);
		return [];
	};

	const getUserNotAssign = async () => {
		const response = await rolesApi.getUserNotAssign({
			accountId: getParamsIdAssignUser(),
		});
		if (!response) return;
		setTargetKeys([]);
		setSelectedKeys([]);
		setNotAssignedUser(response);
	};

	const getUserByRoleId = async () => {
		try {
			setLoading(true);
			const response = await rolesApi.getUserByRoleId({ roleId: currentRole?.id });

			if (!response) return;

			setAssignedUser(response);
		} catch (error: any) {
			toast.error(error.status);
		} finally {
			setLoading(false);
		}
	};

	const onChange: TransferProps["onChange"] = (nextTargetKeys) => {
		setTargetKeys(nextTargetKeys);
	};

	const onSelectChange: TransferProps["onSelectChange"] = (
		sourceSelectedKeys,
		targetSelectedKeys
	) => {
		setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
	};

	const columns: ColumnsType<IUserRole> = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			render: (_, record) => <p>{record.userAccount.fullName}</p>,
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
			render: (_, record) => <p>{record.userAccount.email || DASH} </p>,
		},
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
			render: (_, record) => <p>{record.userAccount.id || DASH} </p>,
		},
		{
			title: "Phone Number",
			dataIndex: "phoneNumber",
			key: "phoneNumber",
			align: "center",
			render: (_, record) => <p>{record.userAccount.mobileNumber || DASH} </p>,
		},
		{
			title: "Action",
			key: "action",
			render: (_, record) => (
				<Button type="link" onClick={() => showConfirmRemoveUser(record)}>
					Remove
				</Button>
			),
		},
	];

	const handleAddUser = async () => {
		if (!targetKeys?.length) return setShowModalAddUser(false);

		setIsAddUser(true);
		try {
			await rolesApi.addUser(currentRole?.id, { users: targetKeys });
			setShowModalAddUser(false);
			getUserByRoleId();
			toast.success(TOAST_MESSAGE.SUCCESS);
		} catch (error) {
			handleApiResponseError(error);
		} finally {
			setIsAddUser(false);
		}
	};

	const handleRemoveUser = async (userRole: IUserRole) => {
		const response = await rolesApi.removeUser(currentRole?.id, {
			users: [userRole.userAccount.id],
		});
		if (!response) return;
		getUserByRoleId();
	};

	const showConfirmRemoveUser = async (userRole: IUserRole) => {
		confirm({
			title: "Are you sure remove this user?",
			icon: <ExclamationCircleOutlined />,
			okText: "Yes",
			onOk: async () => {
				handleRemoveUser(userRole);
			},
		});
	};

	return (
		<>
			<div className="flex justify-between mb-2">
				<span className="text-lg font-medium">User</span>
				<div>
					<Button
						type="primary"
						onClick={() => setShowModalAddUser(true)}
						icon={<UserAddOutlined />}
					>
						Assign Users
					</Button>
				</div>
			</div>
			<Table
				loading={isLoading}
				columns={columns}
				dataSource={assignedUser}
				size="small"
			/>

			<Modal
				open={isShowModalAddUser}
				width={{
					xs: "90%",
					sm: "80%",
					md: "40%",
					lg: "40%",
					xl: "40%",
					xxl: "40%",
				}}
				title={"Assigned Users"}
				onCancel={() => setShowModalAddUser(false)}
				centered
				onOk={handleAddUser}
				okButtonProps={{ loading: isAddUser }}
			>
				<ConfigProvider
					theme={{
						components: {
							Transfer: {
								listWidth: 300,
								listWidthLG: 350,
							},
						},
					}}
				>
					<Transfer
						className="items-center justify-center mt-4"
						dataSource={userNotAssigned.map((user) => ({
							key: user.id,
							title: user.fullName,
							description: user.email,
						}))}
						titles={["Available Users", "Assigned Users"]}
						targetKeys={targetKeys}
						selectedKeys={selectedKeys}
						onChange={onChange}
						onSelectChange={onSelectChange}
						selectAllLabels={[
							({ selectedCount, totalCount }) => (
								<span>
									{selectedCount} / {totalCount}
								</span>
							),
							({ selectedCount, totalCount }) => (
								<span>
									{selectedCount} / {totalCount}
								</span>
							),
						]}
						render={(item) => item.title}
					/>
				</ConfigProvider>
			</Modal>
		</>
	);
};

export default memo(UserTab);
