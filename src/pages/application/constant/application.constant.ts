import { IApplicationDetail, IApplicationStatistics } from "../../../interface/application.interface";
import { IBorrower } from "../../../interface/borrower.interface";
import { IDueDiligence } from "../../../interface/due.dilegence.api";
import { INITIAL_LOAN_OFFER } from "../../../interface/loanOffer.interface";

export const INITIAL_BORROWER: IBorrower = {
	id: 0,
	idNo: "",
	idType: "",
	idExpiryDate: null,
	fullName: "",
	handPhone: "",
	gender: "",
	email: "",
	phoneCode: "",
	dob: null,
	nationality: "",
	blacklisted: "",
	month1Income: 0,
	month2Income: 0,
	month3Income: 0,
	lastTimeDnbCheck: "",
	currency: "",
};

export const INITIAL_APPLICATION_DETAIL: IApplicationDetail = {
	id: 0,
	applicationType: "",
	applicationProductType: "",
	loanType: "S",
	loanPurpose: "",
	loanPurposeOther: "",
	loanAmount: 0,
	tenorMonths: 0,
	applicantType: "",
	sprFlag: 0,
	countryAddress: "",
	blk: "",
	street: "",
	unit: "",
	employeeStatus: "",
	currEmployer: "",
	position: "",
	incomeDocType: "",
	applicationStatus: "AP",
	dateOfApplication: "",
	noteFromApplicant: "",
	rejectReasonId: "",
	rejectReasonOther: "",
	debtConsolidationType: 0,
	loanOfficerId: "",
	deadlineReviewDate: "",
	remarks: "",
	borrowerId: 0,
	mlcbReportType: "",
	version: 0,
	frdAppId: "",
	source: "",
	borrower: INITIAL_BORROWER,
	loanOffer: INITIAL_LOAN_OFFER,
};

export const INITIAL_DUE_DILIGENCE: IDueDiligence = {
	id: "",
	checkType: "CBS",
	status: "",
	message: "",
	data: {
		message: "",
		dnb_check_result: {
			dnb_check_status: undefined,
			last_checked: "",
			dnb_result_summary: "",
			no_bankruptcy_proceeding: {
				status: "",
				details: "",
			},
			bankruptcy_discharged: {
				status: "",
				details: "",
			},
			no_material_litigation: {
				status: "",
				details: "",
			},
		},
		worldcheck_result: {
			worldcheck_check_status: undefined,
			last_checked: "",
			status: "",
			worldcheck_result_summary: "",
			worldcheck_details: {
				result: "",
				details: "",
			},
		},
		myInfo_check_result: {
			myInfo_check_status: undefined,
			last_checked: "",
			myInfo_result_summary: "",
			spr_flag: {
				details: "",
				status: "",
			},
			borrower_age: {
				details: "",
				status: "",
			},
			legitimate_source_income: {
				details: "",
				status: "",
			},
		},
		cbs_check_result: {
			cbs_check_status: undefined,
			last_checked: "",
			cbs_result_summary: "",
			cbs_grade: "",
			cbs_score: "",
			aggregated_outstanding_balance_unsecured: 0,
			aggregated_monthly_installment_unsecured: 0,
			total_overdue_balance: 0,
			cbs_grade_check: {
				value: "",
				result: "",
			},
			no_default_payment: {
				value: "",
				result: "",
			},
			no_bankruptcy_proceeding: {
				value: "",
				result: "",
			},
			no_bankruptcy_discharged: {
				value: "",
				result: "",
			},
			debt_consolidation_plan: {
				value: "",
				result: "",
			},
			debt_management_plan: {
				value: "",
				result: "",
			},
			adverse_account_history: {
				value: "",
				result: "",
			},
			key_observations: "",
		},
		mlcb_check_result: {
			header: {
				client_id: "",
				err_times: "",
				run_no: "",
				tot_items: "",
				user_id: "",
			},
			balance_loan_quantum_allow: "",
			mlcb_check_status: undefined,
			mlcb_result_summary: "",
			last_checked: "",
			self_exclusion: {
				status: "",
				details: "",
			},
			late_repayment: {
				status: "",
				details: "",
			},
		},
		blacklist_check_result: {
			blacklist_check_status:undefined,
			blacklist_result_summary: undefined,
			blacklisted:'',
			last_checked:'',
			match_percent: '',
		}
	},
	application: undefined,
};

const INITIAL_DUE_DILIGENCE_CBS: IDueDiligence = {
	...INITIAL_DUE_DILIGENCE,
	checkType: "CBS",
};
const INITIAL_DUE_DILIGENCE_DNB: IDueDiligence = {
	...INITIAL_DUE_DILIGENCE,
	checkType: "DNB",
};
const INITIAL_DUE_DILIGENCE_MLCB: IDueDiligence = {
	...INITIAL_DUE_DILIGENCE,
	checkType: "MLCB",
};
const INITIAL_DUE_DILIGENCE_MYINFO: IDueDiligence = {
	...INITIAL_DUE_DILIGENCE,
	checkType: "MyInfo",
};
const INITIAL_DUE_DILIGENCE_WORLDCHECK: IDueDiligence = {
	...INITIAL_DUE_DILIGENCE,
	checkType: "Worldcheck",
};
const INITIAL_DUE_DILIGENCE_BLACK_LIST: IDueDiligence = {
	...INITIAL_DUE_DILIGENCE,
	checkType: "Blacklist",
};

export const INITIAL_DUE_DILIGENCE_LIST: IDueDiligence[] = [
	INITIAL_DUE_DILIGENCE_BLACK_LIST,
	INITIAL_DUE_DILIGENCE_CBS,
	INITIAL_DUE_DILIGENCE_DNB,
	INITIAL_DUE_DILIGENCE_MLCB,
	INITIAL_DUE_DILIGENCE_MYINFO,
	INITIAL_DUE_DILIGENCE_WORLDCHECK,
];


export const INITIAL_STATISTICS: IApplicationStatistics = {
	secured: {
		total: 0,
		pending: 0,
		underReview: 0,
		approved: 0,
		rejected: 0,
		disbursed: 0,
		disbursementCancel: 0,
		disbursementUnderReview: 0,
		disbursementApproved: 0,
		disbursementReturn: 0,
		editPending: 0,
		editApproved: 0,
	},
	unsecured: {
		total: 0,
		pending: 0,
		underReview: 0,
		approved: 0,
		rejected: 0,
		disbursed: 0,
		disbursementCancel: 0,
		disbursementUnderReview: 0,
		disbursementApproved: 0,
		disbursementReturn: 0,
		editPending: 0,
		editApproved: 0,
	},
};
