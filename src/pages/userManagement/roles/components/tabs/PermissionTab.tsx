import { Checkbox, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { useRolesTabsContext } from "../../../../../context/RolesTabsContext";
import { IModulePermissions } from "../../../interface/roles.interface";

const PermissionTab: React.FC = () => {
	const { listPermission, setListPermission, currentRole } = useRolesTabsContext();

	const handleChangePermission = (
		record: IModulePermissions,
		category: "read" | "write",
		checked: boolean
	) => {
		const updatedList = listPermission.map((module) => {
			if (module.module_code === record.module_code) {
				return {
					...module,
					permissions: module.permissions.map((permission) => {
						if (permission.category === category) {
							return {
								...permission,
								status: checked,
							};
						}
						if (category === "write" && checked && permission.category === "read") {
							return {
								...permission,
								status: true,
							};
						}
						return permission;
					}),
				};
			}
			return module;
		});
		setListPermission(updatedList);
	};

	const columns: ColumnsType<IModulePermissions> = [
		{
			title: "Title",
			dataIndex: "module_code",
			key: "title",
		},
		{
			title: "Read",
			key: "read",
			render: (text, record) => {
				const readPermission = record.permissions.find(
					(permission) => permission.category === "read"
				);
				return readPermission ? (
					<Checkbox
						checked={readPermission.status || false}
						onChange={(e) => handleChangePermission(record, "read", e.target.checked)}
						disabled={
							currentRole?.type === "base" ||
							record.permissions.some((item) => item.category === "write" && item.status)
						}
					/>
				) : null;
			},
		},
		{
			title: "Write",
			key: "write",
			render: (text, record) => {
				const writePermission = record.permissions.find(
					(permission) => permission.category === "write"
				);
				return writePermission ? (
					<Checkbox
						checked={writePermission.status || false}
						onChange={(e) => handleChangePermission(record, "write", e.target.checked)}
						disabled={currentRole?.type === "base"}
					/>
				) : null;
			},
		},
	];

	return (
		<Table
			rowKey="module_code"
			size="small"
			dataSource={listPermission}
			columns={columns}
			pagination={false}
		/>
	);
};

export default PermissionTab;
