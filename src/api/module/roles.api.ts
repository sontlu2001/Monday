import { Key } from "react";
import {
	ICategory,
	IPermissionList,
	IRole,
	IRoleCategory,
	IRoleForm,
	IUserAccount,
	IUserRole,
} from "../../pages/userManagement/interface/roles.interface";
import privateClient from "../client/private.client";

interface IRoleParams {
	rolesName?: string;
	status?: boolean;
}

interface IRoleParams {
	rolesName?: string;
	status?: boolean;
}

interface ICreateRoleParam extends IRoleForm {
	permissions?: number[];
}

interface IEditRoleParam extends IRoleForm {
	permissions?: number[];
}

interface IAddUser {
	users?: Key[] | number[];
}
const rolesEndpoint = {
	getRoles: `api/roles`,
	getPermission: "api/role-management/base-permission",
	getPermissionByRoleId: (id?: number) => `api/role/${id}/permission`,
	getRolesByRoleId: (id?: number) => `api/roles/${id}`,
	getRoleCategory: "api/role-categories",
	getUserAccount: "api/user-accounts",
	getUserByRoleId: `api/user-roles`,
	addUser: (id?: number) => `api/role-management/${id}/add-user`,
	removeUser: (id?: number) => `api/role-management/${id}/remove-user`,
	editRole: (id?: number) => `api/role-management/${id}/edit-role`,
	createUserRole: "api/role-management/create-role",
	getCategory: "api/categories",
};

const rolesApi = {
	getListRoles: async (params: IRoleParams): Promise<IRole[]> => {
		const response = await privateClient.get<IRole[]>(rolesEndpoint.getRoles, {
			params: {
				size: 1000,
				"status.equals": params.status,
				"name.contains": params.rolesName,
				sort: ["lastModifiedDate,desc"],
			},
		});
		return response.data;
	},

	getListPermission: async (): Promise<IPermissionList> => {
		const response = await privateClient.get<IPermissionList>(
			rolesEndpoint.getPermission
		);
		return response.data;
	},

	getRolesByRoleId: async (params: { roleId: number }): Promise<IRole[]> => {
		const response = await privateClient.get<IRole[]>(
			rolesEndpoint.getRolesByRoleId(params.roleId)
		);
		return response.data;
	},

	getUserByRoleId: async (params: { roleId?: number }): Promise<IUserRole[]> => {
		const response = await privateClient.get<IUserRole[]>(
			rolesEndpoint.getUserByRoleId,
			{
				params: {
					"roleId.equals": params.roleId,
				},
			}
		);
		return response.data;
	},

	getUserNotAssign: async (params?: {
		accountId: number[];
	}): Promise<IUserAccount[]> => {
		const response = await privateClient.get<IUserAccount[]>(
			rolesEndpoint.getUserAccount,
			{
				params: {
					"id.NotIn": params?.accountId,
				},
			}
		);
		return response.data;
	},

	getPermissionByRoleId: async (params: { roleId?: number }): Promise<any> => {
		const response = await privateClient.get<IPermissionList>(
			rolesEndpoint.getPermissionByRoleId(params?.roleId)
		);
		return response.data;
	},

	getRoleCategory: async (): Promise<IRoleCategory[]> => {
		const response = await privateClient.get<IRoleCategory[]>(
			rolesEndpoint.getRoleCategory
		);
		return response.data;
	},

	addUser: async (id?: number, params?: IAddUser): Promise<any> => {
		const response = await privateClient.post<any>(
			rolesEndpoint.addUser(id),
			params
		);
		return response.data;
	},

	removeUser: async (id?: number, params?: IAddUser): Promise<any> => {
		const response = await privateClient.post<any>(
			rolesEndpoint.removeUser(id),
			params
		);
		return response.data;
	},

	createUserRoles: async (params: ICreateRoleParam): Promise<IPermissionList> => {
		const response = await privateClient.post<IPermissionList>(
			rolesEndpoint.createUserRole,
			params
		);
		return response.data;
	},

	editRole: async (
		params: IEditRoleParam,
		id?: number
	): Promise<IPermissionList> => {
		const response = await privateClient.put<IPermissionList>(
			rolesEndpoint.editRole(id),
			params
		);
		return response.data;
	},

	getCategory: async (): Promise<ICategory[]> => {
		const response = await privateClient.get<ICategory[]>(
			rolesEndpoint.getCategory,
		);
		return response.data;
	},
};

export default rolesApi;
