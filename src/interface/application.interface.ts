import { tApplicationStatus, tLoanType } from "../types/common.type";
import { IBorrower } from "./borrower.interface";
import { ILoanOffer } from "./loanOffer.interface";

export interface IApplication {
	id: number;
	applicationType: string;
	applicationProductType: string;
	loanId?: number;
	loanType: tLoanType;
	loanPurpose: string;
	loanPurposeOther: string;
	loanAmount: number;
	tenorMonths: number;
	applicantType: string;
	sprFlag: number;
	countryAddress: string;
	blk: string;
	street: string;
	unit: string;
	employeeStatus: string;
	currEmployer: string;
	position: string;
	incomeDocType: string;
	applicationStatus: tApplicationStatus;
	dateOfApplication: string;
	noteFromApplicant: string;
	rejectReasonId: string;
	rejectReasonOther: string;
	debtConsolidationType: number;
	loanOfficerId: string;
	deadlineReviewDate: string;
	remarks: string;
	borrowerId: number;
	mlcbReportType: string;
	version: number;
	frdAppId: string;
	source: string;
	borrower: IBorrower;
	lastModifiedDate: string;
}

export interface IApplicationSearchInput {
	applicationId?: string;
	borrowerName?: string;
	status?: any;
	loanType?: string;
	dateRange?: string[];
	page?: number;
	size?: number;
}

export interface IApplicationDetail {
	id: number;
	applicationType: string;
	applicationProductType: string;
	loanType: tLoanType;
	loanPurpose: string;
	loanPurposeOther: string;
	loanAmount: number;
	tenorMonths: number;
	applicantType: string;
	sprFlag: number;
	countryAddress: string;
	blk: string;
	street: string;
	unit: string;
	employeeStatus: string;
	currEmployer: string;
	position: string;
	incomeDocType: string;
	applicationStatus: tApplicationStatus;
	dateOfApplication: string;
	noteFromApplicant: string;
	rejectReasonId: string;
	rejectReasonOther: string;
	debtConsolidationType: number;
	loanOfficerId: string;
	deadlineReviewDate: string;
	remarks: string;
	borrowerId: number;
	mlcbReportType: string;
	version: number;
	frdAppId: string;
	source: string;
	borrower: IBorrower;
	loanOffer: ILoanOffer;
}

export interface IStatusApplication {
	total: number,
	pending: number,
	underReview: number,
	approved: number,
	rejected: number,
	disbursed: number,
	disbursementCancel: number,
	disbursementUnderReview: number,
	disbursementApproved: number,
	disbursementReturn: number,
	editPending: number,
	editApproved: number,
}
export interface IApplicationStatistics {
	unsecured: IStatusApplication;
	secured: IStatusApplication;
}
export interface ICreateTask {
	job_id: string;
	check_type: string;
}
export interface IRepaymentSchedule {
	id?: number;
	key?: number | string;
	date: string;
	principalAmount: number;
	interestAmount: number;
	totalAmount: number;
	repaymentDate: string;
	loanOffer: ILoanOffer;
}
