import { IApplicationDetail } from "../../../interface/application.interface";
import { IBorrower } from "../../../interface/borrower.interface";
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
  phoneCode:"",
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

export const INITIAL_DUE_DILIGENCE = {
	
}