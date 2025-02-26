import { ObjectValues, tRoleType } from "../../../types/common.type";
import { SEARCH_ROLE_TYPE } from "../constant/role.constant";

import { InferType } from "yup";
import { roleValidationSchema } from "../roles/validation/roleValidationSchema";
export interface IFormSearchBar {
	role: string;
}

export interface IRoleSearchBarProps {
	eventSearchRoles: (formData: IFormSearchBar) => void;
	eventResetSearchRoles: (formData: IFormSearchBar) => void;
}
export interface IRole {
	id: number;
	name: string;
	description: string;
	roleUuid: string;
	type: tRoleType;
	status: boolean;
	createdBy: string;
	createdDate: string;
	lastModifiedBy: string;
	lastModifiedDate: string;
  category: ICategory;
}

export interface IPermissionList {
	permissions_lst: IModulePermissions[];
}

export interface IModulePermissions {
	module_code: string;
	permissions: IPermission[];
}
export interface IPermission {
	id: number;
	name: string;
	description: string;
	category: "read" | "write";
	method: string;
	endpointUrl: string;
	status: boolean;
}

export interface ICategory {
  id: number;
  name: string;
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
}
export interface IRoleCategory {
  id: number;
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  role: IRole;
  category: ICategory;
}

export interface IUserAccount {
  id: number;
  uuid: string;
  mlcbIdNo: string;
  email: string;
  fullName: string;
  mobileNumber: string | null;
  status: boolean;
  userName: string;
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
}

export interface IUserRole {
  id: number;
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  userAccount: IUserAccount;
  role: IRole;
}


export type IRoleForm = InferType<typeof roleValidationSchema>;

export type tSearchRoleType = ObjectValues<typeof SEARCH_ROLE_TYPE>;
