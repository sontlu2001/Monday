import { InfoCircleOutlined, LockOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, Tabs, TabsProps } from "antd";
import React, { memo, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import rolesApi from "../../../../../api/module/roles.api";
import { useRolesTabsContext } from "../../../../../context/RolesTabsContext";
import { handleApiResponseError } from "../../../../../utils/utils";
import { ROLES_TABS } from "../../../constant/role.constant";
import { IRole, IRoleForm } from "../../../interface/roles.interface";
import { roleValidationSchema } from "../../validation/roleValidationSchema";
import InformationTab from "../tabs/InformationTab";
import PermissionTab from "../tabs/PermissionTab";

interface IRoleModalProps {
	currentRole?: IRole;
	isShow?: boolean;
	setShowRolesModal: React.Dispatch<React.SetStateAction<boolean>>;
	title: string;
	eventCreateNewRole: () => void;
}

const items: TabsProps["items"] = [
	{
		key: ROLES_TABS.info,
		label: "Information",
		icon: <InfoCircleOutlined />,
		children: <InformationTab />,
	},
	{
		key: ROLES_TABS.permissions,
		label: "Permissions",
		icon: <LockOutlined />,
		children: <PermissionTab />,
	},
];

const RolesCreateModal: React.FC<IRoleModalProps> = ({
	setShowRolesModal,
	title,
	eventCreateNewRole,
}) => {
	const [activeTab, setActiveTab] = useState<string>(ROLES_TABS.info);

	const { getParamPermission } = useRolesTabsContext();

	const methods = useForm<IRoleForm>({
		resolver: yupResolver(roleValidationSchema),
	});

	const {
		formState: { errors, isSubmitting },
	} = methods;

	useEffect(() => {
		if (errors.name) setActiveTab(ROLES_TABS.info);
	}, [errors, isSubmitting]);

	const handleSubmitRoles = async (formData: IRoleForm) => {
		try {
			await rolesApi.createUserRoles({
				...formData,
				status: true,
				category: formData.category,
				permissions: getParamPermission && getParamPermission(),
				type: 'custom'
			});

				eventCreateNewRole();
				setShowRolesModal(false);
		} catch (error: unknown) {
			handleApiResponseError(error)
		}
	};

	const handleChangeTabs = (tab: string) => {
		setActiveTab(tab);
	};

	return (
		<Modal
			open
			title={title}
			width={{
				xs: "90%",
				sm: "80%",
				md: "70%",
				lg: "70%",
				xl: "70%",
				xxl: "70%",
			}}
			className="max-height-modal"
			okText="Submit"
			onOk={methods.handleSubmit(handleSubmitRoles)}
			onCancel={() => setShowRolesModal(false)}
		>
			<FormProvider {...methods}>
				<Tabs
					defaultActiveKey={ROLES_TABS.info}
					activeKey={activeTab}
					items={items}
					onChange={handleChangeTabs}
				/>
			</FormProvider>
		</Modal>
	);
};

export default memo(RolesCreateModal);
