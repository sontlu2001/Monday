import { Button, Divider, Form, Input, InputRef, Space } from "antd";
import React, { useRef, useState } from "react";
import { TextInputField } from "../../../../../components/form/TextInputField";
import { useFormContext } from "react-hook-form";
import { IRoleForm } from "../../../interface/roles.interface";
import { TextAreaField } from "../../../../../components/form/TextAreaField";
import SelectInputField from "../../../../../components/form/SelectInputField";
import { PlusOutlined } from "@ant-design/icons";
import RadioField from "../../../../../components/form/RadioField";
import { useRolesTabsContext } from "../../../../../context/RolesTabsContext";
import { ROLE_TYPES } from "../../../constant/role.constant";

interface IInformationTabProps {
	haveStatus?: boolean;
}

const InformationTab: React.FC<IInformationTabProps> = ({
	haveStatus = false,
}) => {
	const method = useFormContext<IRoleForm>();
	const inputRef = useRef<InputRef>(null);
	const {listCategory} = useRolesTabsContext()
	const [name, setName] = useState("");
	const addItem = (
		e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
	) => {
		e.preventDefault();
		setName("");
		setTimeout(() => {
			inputRef.current?.focus();
		}, 0);
	};
	const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const { control } = method;
	return (
		<>
			<TextInputField
				control={control}
				name="name"
				label="Role Name"
				required
			></TextInputField>
			<TextAreaField
				control={control}
				name="description"
				label="Description"
			></TextAreaField>
			{haveStatus && (
				<RadioField
					control={control}
					name="status"
					label="Status"
					options={[
						{ label: "Active", value: true },
						{ label: "Inactive", value: false},
					]}
					disabled = {method.getValues('type') === ROLE_TYPES.BASE}
				/>
			)}
			<SelectInputField
				control={control}
				name="category"
				label="Category"
				required
				options={listCategory.map((option) => (
					{
						value: option.id,
						label:option.name,
					}
				))}
				dropdownRender={(menu) => (
					<>
						{menu}
						{/* <Divider style={{ margin: "8px 0" }} /> */}
						{/* <Space style={{ padding: "0 8px 4px" }}>
							<Input
								placeholder="Please enter item"
								ref={inputRef}
								value={name}
								onChange={onNameChange}
								onKeyDown={(e) => e.stopPropagation()}
							/>
							<Button type="text" icon={<PlusOutlined />} onClick={addItem}>
								Add item
							</Button>
						</Space> */}
					</>
				)}
			></SelectInputField>
		</>
	);
};

export default InformationTab;
