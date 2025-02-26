import React, { createContext, useContext, useEffect, useState } from "react";
import rolesApi from "../api/module/roles.api";
import {
	ICategory,
	IModulePermissions,
	IRole,
} from "../pages/userManagement/interface/roles.interface";

interface IRolesTabContext {
	listPermission: IModulePermissions[];
	setListPermission: React.Dispatch<React.SetStateAction<IModulePermissions[]>>;
	getParamPermission?: () => number[];
	listCategory: ICategory[];
	currentRole?: IRole;
}

const RolesTabContext = createContext<IRolesTabContext | undefined>(undefined);

export const RolesTabProvider: React.FC<{
	children: React.ReactNode;
	roleId?: number;
	currentRole?: IRole;
}> = ({ children, currentRole }) => {
	const [listPermission, setListPermission] = useState<IModulePermissions[]>([]);

	const [listCategory, setListCategory] = useState<ICategory[]>([]);

	useEffect(() => {
		if (currentRole && currentRole.id) {
			getPermissionByRoleId();
		} else {
			getPermission();
		}
	}, []);

	useEffect(() => {
		getListCategory();
	}, []);

	const getPermission = async () => {
		const response = await rolesApi.getListPermission();
		if (!response) return;

		setListPermission(response.permissions_lst);
	};

	const getPermissionByRoleId = async () => {
		const response = await rolesApi.getPermissionByRoleId({
			roleId: currentRole?.id,
		});
		if (!response) return;

		setListPermission(response.permissions_lst);
	};

	const getListCategory = async () => {
		const response = await rolesApi.getCategory();
		if (!response) return;

		setListCategory(response);
	};

	const getParamPermission = (): number[] => {
		return listPermission
			.flatMap((module) => module.permissions)
			.filter((permission) => permission.status)
			.map((item) => item.id);
	};

	return (
		<RolesTabContext.Provider
			value={{
				listCategory,
				listPermission,
				setListPermission,
				getParamPermission,
				currentRole,
			}}
		>
			{children}
		</RolesTabContext.Provider>
	);
};

export const useRolesTabsContext = () => {
	const context = useContext(RolesTabContext);
	if (!context) {
		throw new Error("useRolesTabsContext must be used within a RolesTabProvider");
	}
	return context;
};
