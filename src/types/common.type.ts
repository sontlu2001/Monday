import { APPLICATION_PRODUCT_TYPE, APPLICATION_PRODUCT_TYPE_NAME, APPLICATION_SEARCH_TYPE, APPLICATION_STATUS, APPLICATION_STATUS_COLOR, APPLICATION_STATUS_NAME, APPLICATION_TYPE, APPLICATION_TYPE_NAME, BORROWER_STATUS, BORROWER_STATUS_NAME, CHECK_TYPE, COMMON_CHECK_STATUS, COMMON_RESULT_SUMMARY, KEY_LOCAL_STORAGE, KEY_SESSION_STORAGE, LOAN_TYPE, LOAN_TYPE_NAME, THEME } from "../constants/general.constant";
import { ROLE_TYPES } from "../pages/userManagement/constant/role.constant";

/**
 *  This general type is mainly used to create type from constant object.
 */
export type ObjectValues<T> = T[keyof T];

export type ObjectKeys<T> = keyof T;

/**
 * Create a type that its value is set by some specific property value of that object (you have to pick it in a picky way ;) ).
 */
export type ObjectValuesPicky<T, K extends keyof T> = T[keyof Partial<
	Pick<T, K>
>];

/**
 * Create a type that its value is defined by value of sub property(S) belong to the property main constant
 */
export type SubObjectValues<T, S extends keyof T[keyof T]> = T[keyof T][S];

export type ReadonlyNonEmptyArray<T> = ReadonlyArray<T> & { readonly 0: T };

export type GetKeys<T> = keyof T;
export type GetArrayObjectType<T> = T extends ReadonlyArray<infer U>
	? U
	: never;
export type GetNonEmptyArrayObjectType<T> = T extends ReadonlyNonEmptyArray<
	infer U
>
	? U
	: never;

export type tLocalStorageKey = ObjectValues<typeof KEY_LOCAL_STORAGE>;
export type tSessionStorageKey = ObjectValues<typeof KEY_SESSION_STORAGE>;

export type ObjectPropType<T, K extends ObjectKeys<T>> = T[K];

export type tTheme = ObjectValues<typeof THEME>;

export type tApplication = ObjectValues<typeof APPLICATION_TYPE>;
export type tApplicationName = ObjectValues<typeof APPLICATION_TYPE_NAME>;

export type tLoanType = ObjectValues<typeof LOAN_TYPE>;
export type tLoanTypeName = ObjectValues<typeof LOAN_TYPE_NAME>;

export type tApplicationProduct = ObjectValues<typeof APPLICATION_PRODUCT_TYPE>;
export type tApplicationProductName = ObjectValues<typeof APPLICATION_PRODUCT_TYPE_NAME>;

export type tApplicationStatus = ObjectValues<typeof APPLICATION_STATUS>;
export type tApplicationStatusName = ObjectValues<typeof APPLICATION_STATUS_NAME>;
export type tApplicationStatusColor = ObjectValues<typeof APPLICATION_STATUS_COLOR>;

export type tBorrowerStatus = ObjectValues<typeof BORROWER_STATUS>;
export type tBorrowerStatusName = ObjectValues<typeof BORROWER_STATUS_NAME>;
export type tApplicationSearchType = ObjectValues<typeof APPLICATION_SEARCH_TYPE>;

export type tCheckType = ObjectValues<typeof CHECK_TYPE>;

export type tCheckStatus = ObjectValues<typeof COMMON_CHECK_STATUS>;
export type tResultSummary = ObjectValues<typeof COMMON_RESULT_SUMMARY>;
export type tRoleType = ObjectValues<typeof ROLE_TYPES>;
