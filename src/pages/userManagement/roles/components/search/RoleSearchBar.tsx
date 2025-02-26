import { Button, Form, Input, Space } from "antd";
import React, { memo } from "react";
import {
	IFormSearchBar,
	IRoleSearchBarProps,
} from "../../../interface/roles.interface";

const RoleSearchBar: React.FC<IRoleSearchBarProps> = ({
	eventSearchRoles,
	eventResetSearchRoles,
}) => {
	const [formSearch] = Form.useForm<IFormSearchBar>();

	const handleSearchRoles = (formData: IFormSearchBar) => {
		eventSearchRoles(formData);
	};

	const handleResetSearchRoles = () => {
		formSearch.resetFields();
		eventResetSearchRoles(formSearch.getFieldValue("role"));
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key !== "Enter") return;
		e.preventDefault();
		formSearch.submit();
	};

	return (
		<div className="card">
			<Form
				form={formSearch}
				layout="inline"
				className="grid grid-cols-1 md:grid-cols-2 justify-between"
				onFinish={handleSearchRoles}
			>
				<Form.Item<IFormSearchBar> className="w-2/4" name={"role"} label={"Roles"}>
					<Input
						placeholder="Please enter Roles Name"
						allowClear
						onKeyDown={handleKeyDown}
					/>
				</Form.Item>
				<div className="justify-self-end">
					<Space>
						<Button type="default" onClick={handleResetSearchRoles}>
							Reset
						</Button>
						<Button variant="filled" type="primary" htmlType="submit">
							Search
						</Button>
					</Space>
				</div>
			</Form>
		</div>
	);
};

export default memo(RoleSearchBar);
