import { tApplicationStatus, tLoanType } from "../types/common.type";
import { IBorrower } from "./borrower.interface";

export interface IApplication {
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
}

export interface IApplicationSearchInput {
	applicationId?: string;
	borrowerName?: string;
	status?: string;
	loanType?: string;
	dateRange?: string[];
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

export interface ILoanOffer {
	loanType: tLoanType;
	loanPurpose: string;
	applicationDate: string;
	loanAmountOffer: number;
	loanTenorOffer: number;
	installments: number;
	installmentFrequency: string;
	installmentDate: string;
	book: string
	paymentType: string;
	cbsScore: number;
	cbsPd: number;
	remarks: string;
	monthlyInterestRate: number;
	interestFrequency: string;
	interestCalculationMethod: string;
	adminFeePercentage : number;
	adminFee : number;
	lateFee: number;
	lateFeePercentage: number;
}