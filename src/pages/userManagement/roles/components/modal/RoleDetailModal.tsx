import {
	InfoCircleOutlined,
	LockOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Modal, Space, Tabs, TabsProps } from "antd";
import React, { memo, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRolesTabsContext } from "../../../../../context/RolesTabsContext";
import { ROLES_TABS } from "../../../constant/role.constant";
import { IRoleForm } from "../../../interface/roles.interface";
import { roleValidationSchema } from "../../validation/roleValidationSchema";
import InformationTab from "../tabs/InformationTab";
import PermissionTab from "../tabs/PermissionTab";
import UserTab from "../tabs/UserTab";
import rolesApi from "../../../../../api/module/roles.api";
import { TOAST_MESSAGE } from "../../../../../constants/general.constant";
import { toast } from "react-toastify";
import { handleApiResponseError } from "../../../../../utils/utils";

interface IRoleModalProps {
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
		children: <InformationTab haveStatus />,
	},
	{
		key: ROLES_TABS.user,
		label: "User",
		icon: <UserOutlined />,
		children: <UserTab />,
	},
	{
		key: ROLES_TABS.permissions,
		label: "Permissions",
		icon: <LockOutlined />,
		children: <PermissionTab />,
	},
];

const RoleDetailModal: React.FC<IRoleModalProps> = ({
	setShowRolesModal,
	title,
	eventCreateNewRole,
}) => {
	const [activeTab, setActiveTab] = useState<string>(ROLES_TABS.info);
	const { currentRole, getParamPermission } = useRolesTabsContext();

	const methods = useForm<IRoleForm>({
		defaultValues: {
			name: currentRole?.name,
			description: currentRole?.description,
			status: currentRole?.status,
			category: currentRole?.category?.id,
			type: currentRole?.type,
		},
		resolver: yupResolver<IRoleForm>(roleValidationSchema),
	});

	const handleUpdateRoles = async (formData: IRoleForm) => {
		try {
			const response = await rolesApi.editRole(
				{
					...formData,
					status: formData.status,
					category: formData.category,
					permissions: getParamPermission && getParamPermission(),
					type: undefined
				},
				currentRole?.id
			);

			if (!response) return;

			toast.success(TOAST_MESSAGE.SUCCESS);
			setShowRolesModal(false);
			eventCreateNewRole();
		} catch (error: unknown) {
			handleApiResponseError(error);
		}
	};

	const handleChangeTabs = (activeKey: string) => {
		setActiveTab(activeKey);
	};

	const {
		formState: { errors, isSubmitting },
	} = methods;

	useEffect(() => {
		if (errors.name) setActiveTab(ROLES_TABS.info);
	}, [errors, isSubmitting]);

	return (
		<Modal
			className="max-height-modal"
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
			footer={
				activeTab !== ROLES_TABS.user && (
					<Space>
						<Button onClick={() => setShowRolesModal(false)}>Cancel</Button>
						<Button
							type="primary"
							onClick={methods.handleSubmit(handleUpdateRoles)}
							loading={methods.formState.isSubmitting}
						>
							Submit
						</Button>
					</Space>
				)
			}
			onCancel={() => setShowRolesModal(false)}
		>
			<FormProvider {...methods}>
				<Tabs activeKey={activeTab} items={items} onChange={handleChangeTabs} />
			</FormProvider>
		</Modal>
	);
};

export default memo(RoleDetailModal);
