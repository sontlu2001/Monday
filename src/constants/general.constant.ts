import { IOption } from "../interface/general.interface";
import {
	tApplication,
	tApplicationName,
	tApplicationProduct,
	tApplicationProductName,
	tApplicationStatus,
	tApplicationStatusColor,
	tApplicationStatusName,
	tBorrowerStatus,
	tBorrowerStatusName,
	tLoanType,
	tLoanTypeName,
} from "../types/common.type";

export const KEY_LOCAL_STORAGE = {
	TOKEN: "token",
	THEME: "theme",
} as const;

export const API_STATUS = {
	SUCCESS: 200,
};

export const THEME = {
	dark: "dark",
	light: "light",
} as const;

export const KEY_SESSION_STORAGE = {
	SESSION_DATA_PREFIX: "session_data-instance_0-",
} as const;

export const genders: IOption[] = [
	{ value: "Male", label: "Male" },
	{ value: "Female", label: "Female" },
];
export const TOAST_MESSAGE = {
	SUCCESS: "Success",
	ERROR: "Errors",
	TOKEN_EXPIRED: "Token Expired, please login again",
	UNEXPECTED_ERROR_MESSAGE: "An unexpected error occurred",
};

export const COMMON_CONFIG_KEYS = {
	borrowerStatus: "BORROWERSTT",
	currencies: "CURRENCY",
	genders: "INDGENCOD",
	nationalities: "NATCO",
	ethnicGroups: "ETHGRP",
	idTypes: "INDIDTYP",
	specialisations: "INDSTYP",
	typeOfResidential: "PROTYP",
	propertyOwnerships: "PROPOWNSH",
	phoneCodes: "PHONECOD",
	loanType: "LOANTYP",
	applicationStatus: "APPSTT",
	countries: "COUNTRYCO",
	employmentStatus: "EMPSTS",
	positions: "EMPPOS",
	listIncomeDocumentTypes: "DOCUTYPE",
	interestCalculationMethod: "INTMETHOD",
	paymentType: "PAYTYP",
	installmentFrequency: "LOANRPYFRQ",
	loanInterestFrequency: "INTFRQ",
};

export const APPLICATION_TYPE = {
	SOLE: "S",
	JOINT: "J",
	MONDAY: "M",
	NRIC: "NRIC"
} as const;

export const APPLICATION_TYPE_NAME = {
	SOLE: "Sole Application",
	JOINT: "Joint Application",
} as const;

export const MAP_APPLICATION_TYPE_NAME = new Map<
	tApplication,
	tApplicationName
>([
	[APPLICATION_TYPE.SOLE, APPLICATION_TYPE_NAME.SOLE],
	[APPLICATION_TYPE.JOINT, APPLICATION_TYPE_NAME.JOINT],
]);

export const APPLICATION_PRODUCT_TYPE = {
	INDIVIDUAL: "I",
	CORPORATE: "C",
} as const;

export const APPLICATION_PRODUCT_TYPE_NAME = {
	INDIVIDUAL: "Individual",
	CORPORATE: "Business Loan / Corporate / Company",
} as const;

export const MAP_APPLICATION_PRODUCT_TYPE_NAME = new Map<
	tApplicationProduct,
	tApplicationProductName
>([
	[APPLICATION_PRODUCT_TYPE.INDIVIDUAL, APPLICATION_PRODUCT_TYPE_NAME.INDIVIDUAL],
	[APPLICATION_PRODUCT_TYPE.CORPORATE, APPLICATION_PRODUCT_TYPE_NAME.CORPORATE],
]);

export const LOAN_TYPE = {
	UNSECURED: "U",
	SECURED: "S",
} as const;

export const LOAN_TYPE_NAME = {
	UNSECURED: "Unsecured",
	SECURED: "Secured",
} as const;

export const MAP_LOAN_TYPE_NAME = new Map<tLoanType, tLoanTypeName>([
	[LOAN_TYPE.UNSECURED, LOAN_TYPE_NAME.UNSECURED],
	[LOAN_TYPE.SECURED, LOAN_TYPE_NAME.SECURED],
]);

export const APPLICATION_STATUS = {
	PENDING: "PD",
	UNDER_REVIEW: "UR",
	APPROVED: "AP",
	REJECTED: "RJ",
	DISBURSEMENT_CANCEL: "DC",
	DISBURSEMENT_UNDER_REVIEW: "DU",
	DISBURSEMENT_RETURN: "DR",
	DISBURSEMENT_APPROVED: "DA",
	EDIT_APPROVED: "EA",
	DISBURSED: "DB",
	EDIT_PENDING: "EP",
	// OFFER_PENDING: "OP",
	// OFFER_APPROVED: "OA",
	// OFFER_REVIEW: "OR",
	// COMMENCE_DISBURSEMENT: "CD",
} as const;

export const APPLICATION_STATUS_NAME = {
	PENDING: "Pending",
	UNDER_REVIEW: "Under Review",
	APPROVED: "Approved",
	REJECTED: "Rejected",
	DISBURSEMENT_CANCEL: "Disbursement Cancel",
	DISBURSEMENT_UNDER_REVIEW: "Disbursement Under Review",
	DISBURSEMENT_RETURN: "Disbursement Return",
	DISBURSEMENT_APPROVED: "Disbursement Approved",
	EDIT_APPROVED: "Edit Approved",
	DISBURSED: "Disbursed",
	EDIT_PENDING: "Edit Pending",
	// OFFER_PENDING: "Offer Pending",
	// OFFER_APPROVED: "Offer Approved",
} as const;

export const APPLICATION_STATUS_COLOR = {
	PENDING: "#FFD700",
	UNDER_REVIEW: "#4682B4",
	APPROVED: "#2E8B57",
	REJECTED: "#CD5C5C",
	DISBURSEMENT_CANCEL: "#FF8C00",
	DISBURSEMENT_UNDER_REVIEW: "#9370DB",
	DISBURSEMENT_RETURN: "#000080",
	DISBURSEMENT_APPROVED: "#32CD32",
	EDIT_APPROVED: "#008080",
	DISBURSED: "#006400",
	EDIT_PENDING: "#EEE8AA",
	// OFFER_PENDING: "#208B0B",
	// OFFER_APPROVED: "#EE8142",
} as const;

export const MAP_APPLICATION_STATUS_NAME = new Map<
	tApplicationStatus,
	tApplicationStatusName
>([
	[APPLICATION_STATUS.PENDING, APPLICATION_STATUS_NAME.PENDING],
	[APPLICATION_STATUS.UNDER_REVIEW, APPLICATION_STATUS_NAME.UNDER_REVIEW],
	[APPLICATION_STATUS.APPROVED, APPLICATION_STATUS_NAME.APPROVED],
	[APPLICATION_STATUS.REJECTED, APPLICATION_STATUS_NAME.REJECTED],
	[APPLICATION_STATUS.DISBURSEMENT_CANCEL, APPLICATION_STATUS_NAME.DISBURSEMENT_CANCEL],
	[APPLICATION_STATUS.DISBURSEMENT_UNDER_REVIEW, APPLICATION_STATUS_NAME.DISBURSEMENT_UNDER_REVIEW],
	[APPLICATION_STATUS.DISBURSEMENT_RETURN, APPLICATION_STATUS_NAME.DISBURSEMENT_RETURN],
	[APPLICATION_STATUS.DISBURSEMENT_APPROVED, APPLICATION_STATUS_NAME.DISBURSEMENT_APPROVED],
	[APPLICATION_STATUS.EDIT_APPROVED, APPLICATION_STATUS_NAME.EDIT_APPROVED],
	[APPLICATION_STATUS.DISBURSED, APPLICATION_STATUS_NAME.DISBURSED],
	[APPLICATION_STATUS.EDIT_PENDING, APPLICATION_STATUS_NAME.EDIT_PENDING]
	// [APPLICATION_STATUS.OFFER_PENDING, APPLICATION_STATUS_NAME.OFFER_PENDING],
	// [APPLICATION_STATUS.OFFER_APPROVED, APPLICATION_STATUS_NAME.OFFER_APPROVED],
]);

export const MAP_APPLICATION_STATUS_COLOR = new Map<
	tApplicationStatus,
	tApplicationStatusColor
>([
	[APPLICATION_STATUS.PENDING, APPLICATION_STATUS_COLOR.PENDING],
	[APPLICATION_STATUS.UNDER_REVIEW, APPLICATION_STATUS_COLOR.UNDER_REVIEW],
	[APPLICATION_STATUS.APPROVED, APPLICATION_STATUS_COLOR.APPROVED],
	[APPLICATION_STATUS.REJECTED, APPLICATION_STATUS_COLOR.REJECTED],
	[APPLICATION_STATUS.DISBURSEMENT_CANCEL, APPLICATION_STATUS_COLOR.DISBURSEMENT_CANCEL],
	[APPLICATION_STATUS.DISBURSEMENT_UNDER_REVIEW, APPLICATION_STATUS_COLOR.DISBURSEMENT_UNDER_REVIEW],
	[APPLICATION_STATUS.DISBURSEMENT_APPROVED, APPLICATION_STATUS_COLOR.DISBURSEMENT_APPROVED],
	[APPLICATION_STATUS.DISBURSEMENT_RETURN, APPLICATION_STATUS_COLOR.DISBURSEMENT_RETURN],
	[APPLICATION_STATUS.EDIT_APPROVED, APPLICATION_STATUS_COLOR.EDIT_APPROVED],
	[APPLICATION_STATUS.DISBURSED, APPLICATION_STATUS_COLOR.DISBURSED],
	[APPLICATION_STATUS.EDIT_PENDING, APPLICATION_STATUS_COLOR.EDIT_PENDING]
	// [APPLICATION_STATUS.OFFER_PENDING, APPLICATION_STATUS_COLOR.OFFER_PENDING],
	// [APPLICATION_STATUS.OFFER_APPROVED, APPLICATION_STATUS_COLOR.OFFER_APPROVED],
]);

export const MAP_BADGE_COLOR_STATUS = new Map<
	tApplicationStatusName,
	tApplicationStatusColor
>([
	[APPLICATION_STATUS_NAME.PENDING, APPLICATION_STATUS_COLOR.APPROVED],
	[APPLICATION_STATUS_NAME.UNDER_REVIEW, APPLICATION_STATUS_COLOR.UNDER_REVIEW],
	[APPLICATION_STATUS_NAME.APPROVED, APPLICATION_STATUS_COLOR.APPROVED],
	[APPLICATION_STATUS_NAME.REJECTED, APPLICATION_STATUS_COLOR.REJECTED],
	[APPLICATION_STATUS_NAME.DISBURSEMENT_CANCEL, APPLICATION_STATUS_COLOR.DISBURSEMENT_CANCEL],
	[APPLICATION_STATUS_NAME.DISBURSEMENT_UNDER_REVIEW, APPLICATION_STATUS_COLOR.DISBURSEMENT_UNDER_REVIEW],
	[APPLICATION_STATUS_NAME.DISBURSEMENT_APPROVED, APPLICATION_STATUS_COLOR.DISBURSEMENT_APPROVED],
	[APPLICATION_STATUS_NAME.DISBURSEMENT_RETURN, APPLICATION_STATUS_COLOR.DISBURSEMENT_RETURN],
	[APPLICATION_STATUS_NAME.EDIT_APPROVED, APPLICATION_STATUS_COLOR.EDIT_APPROVED],
	[APPLICATION_STATUS_NAME.DISBURSEMENT_RETURN, APPLICATION_STATUS_COLOR.DISBURSEMENT_RETURN],
	[APPLICATION_STATUS_NAME.DISBURSED, APPLICATION_STATUS_COLOR.DISBURSED],
	[APPLICATION_STATUS_NAME.EDIT_PENDING, APPLICATION_STATUS_COLOR.EDIT_PENDING]
	// [APPLICATION_STATUS_NAME.OFFER_PENDING, APPLICATION_STATUS_COLOR.OFFER_PENDING],
	// [APPLICATION_STATUS_NAME.OFFER_APPROVED, APPLICATION_STATUS_COLOR.OFFER_APPROVED],
]);

export const BORROWER_STATUS = {
	ACTIVE: "ACT",
	BANKRUPT: "BRT",
};

export const BORROWER_STATUS_NAME = {
	ACTIVE: "Active",
	BANKRUPT: "Bankrupt",
};

export const MAP_BORROWER_STATUS_NAME = new Map<
	tBorrowerStatus,
	tBorrowerStatusName
>([
	[BORROWER_STATUS.ACTIVE, BORROWER_STATUS_NAME.ACTIVE],
	[BORROWER_STATUS.BANKRUPT, BORROWER_STATUS_NAME.BANKRUPT],
]);

export const MAP_BORROWER_STATUS_COLOR = new Map<tBorrowerStatus, string>([
	[BORROWER_STATUS.ACTIVE, "green"],
	[BORROWER_STATUS.BANKRUPT, "red"],
]);

export const MAP_APPLICATION_STATUS_STEP = new Map<tApplicationStatus, number>([
	[APPLICATION_STATUS.PENDING, 0],
	[APPLICATION_STATUS.UNDER_REVIEW, 0],
	[APPLICATION_STATUS.APPROVED, 1],
	[APPLICATION_STATUS.REJECTED, 1],
	[APPLICATION_STATUS.EDIT_PENDING, 1],
	[APPLICATION_STATUS.EDIT_APPROVED, 1],
	[APPLICATION_STATUS.DISBURSEMENT_CANCEL, 1],
	[APPLICATION_STATUS.DISBURSEMENT_UNDER_REVIEW, 2],
	[APPLICATION_STATUS.DISBURSED, 4],
	// [APPLICATION_STATUS.OFFER_REVIEW, 2],
	// [APPLICATION_STATUS.COMMENCE_DISBURSEMENT, 3],
]);

export const APPLICATION_SEARCH_TYPE = {
	CONTAINS: "contains",
	EQUALS: "equals",
	NOT_CONTAINS: "doesNotContain",
	NOT_EQUALS: "notEquals",
} as const;

export const CHECK_TYPE = {
	MLCB: "MLCB",
	DNB: "DNB",
	WORLDCHECK: "Worldcheck",
	MYINFO: "MyInfo",
	CBS: "CBS",
	BLACKLIST: "Blacklist",
} as const;

export const COMMON_CHECK_RESULT = {
	PASS: "Pass",
	ATTENTION: "Attention",
} as const;

export const COMMON_CHECK_STATUS = {
	PASS: "Pass",
	FAIL: "Fail",
} as const;

export const COMMON_RESULT_SUMMARY = {
	OK: "OK",
	ATTENTION: "Attention",
} as const;

export const SELECT_MLCB_OPTIONS = [
	{ key: "mlcb", value: CHECK_TYPE.MLCB, label: "MLCB" },
	{ key: "dnb", value: CHECK_TYPE.DNB, label: "DNB" },
	{ key: "worldcheck", value: CHECK_TYPE.WORLDCHECK, label: "Worldcheck" },
	{ key: "myinfo", value: CHECK_TYPE.MYINFO, label: "MyInfo" },
	{ key: "cbs", value: CHECK_TYPE.CBS, label: "CBS" },
	{ key: "blacklist", value: CHECK_TYPE.BLACKLIST, label: "Blacklist" },
];

export const JOB_STATUS = {
	PENDING: "PD",
	NOT_EXITS: "F",
	SUCCESS: "DN"
}

export const DASH = "-"

export const SOURCE = {
	FRIDAY: "F",
	MONDAY: "M"
}