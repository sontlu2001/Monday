import { tCheckStatus, tCheckType, tResultSummary } from "../types/common.type";
import { IApplication } from "./application.interface";

export interface IDueDiligence {
	id: string;
	checkType: tCheckType;
	status: string;
	message: string;
	data: {
		message: string;
		dnb_check_result: IDnbCheckResult;
		worldcheck_result: IWorldCheckResult;
		myInfo_check_result: IMyInfoCheckResult;
		cbs_check_result: ICbsCheckResult;
		mlcb_check_result: IMlcbCheckResult;
		blacklist_check_result: IBlacklistCheckResult;
	};
	application?: IApplication;
}

export interface IDueDiligenceHistory {
	id: string;
	check_type: tCheckType;
	status: string;
	data: string;
	application: IApplication[];
}

export interface IDnbCheckResult {
	dnb_check_status?: tCheckStatus;
	last_checked: string;
	dnb_result_summary: string;
	no_bankruptcy_proceeding: {
		status: string;
		details: string;
	};
	bankruptcy_discharged: {
		status: string;
		details: string;
	};
	no_material_litigation: {
		status: string;
		details: string;
	};
}

export interface IWorldCheckResult {
	worldcheck_check_status?: tCheckStatus;
	last_checked: string;
	status: string;
	worldcheck_result_summary: string;
	worldcheck_details: {
		result: string;
		details: string;
	};
}
export interface IMyInfoCheckResult {
	myInfo_check_status?: tCheckStatus;
	last_checked: string;
	myInfo_result_summary: string;
	spr_flag: {
		details: string;
		status: string;
	};
	borrower_age: {
		details: string;
		status: string;
	};
	legitimate_source_income: {
		details: string;
		status: string;
	};
}
export interface IMlcbCheckResult {
	header: {
		client_id: string;
		err_times: string;
		run_no: string;
		tot_items: string;
		user_id: string;
	};
	balance_loan_quantum_allow: string;
	mlcb_check_status?: tCheckStatus;
	mlcb_result_summary: string;
	last_checked: string;
	self_exclusion: {
		status: string;
		details: string;
	};
	late_repayment: {
		status: string;
		details: string;
	};
}

export interface ICbsCheckResult {
	cbs_check_status?: tCheckStatus;
	last_checked: string;
	cbs_result_summary: string;
	cbs_grade: string;
	cbs_score: string;
	aggregated_outstanding_balance_unsecured: number;
	aggregated_monthly_installment_unsecured: number;
	total_overdue_balance: number;
	cbs_grade_check: {
		value: string;
		result: string;
	};
	no_default_payment: {
		value: string;
		result: string;
	};
	no_bankruptcy_proceeding: {
		value: string;
		result: string;
	};
	no_bankruptcy_discharged: {
		value: string;
		result: string;
	};
	debt_consolidation_plan: {
		value: string;
		result: string;
	};
	debt_management_plan: {
		value: string;
		result: string;
	};
	adverse_account_history: {
		value: string;
		result: string;
	};
	key_observations: string;
}

export interface IBlacklistCheckResult {
	blacklist_check_status?: tCheckStatus;
	last_checked: string;
	blacklist_result_summary?: tResultSummary;
	blacklisted: string;
	match_percent: string | null;
}