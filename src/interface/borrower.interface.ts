import dayjs from "dayjs";
import { tBorrowerStatus } from "../types/common.type";

export interface IBorrower {
  id: number;
  idNo: string;
  idType: string;
  idExpiryDate: dayjs.Dayjs | null;
  fullName: string;
  handPhone: string;
  phoneCode: string;
  gender: string;
  email: string;
  dob: dayjs.Dayjs | null;
  nationality: string;
  specialization?: string;
  ethnicGroup?: string;
  postalCode?: string;
  typeOfResidential?: string;
  propertyOwnership?: string;
  address?: string;
  grossMonthlyIncome?: number;
  borrowerStatus?: string;
  blacklisted: string;
  borrowerId?: number;
  source?: string,
  currency: string,
  dnbResultId?: number,
  yearOfNoa?: string,
  amountOfNoa?: number,
  month1Income: number,
  month2Income: number,
  month3Income: number,
  fridBorrowerId?: string,
  lastTimeDnbCheck: string;
  countryName?: string;
  specialisation?: string;
  past3MonthsIncome?: number;
  annualIncome?: number,
  countryAddress?: string;
  blk?: string;
  street?: string;
  unit?: string;
  building?: string;
  employeeStatus?: string;
  currentEmployerName?: string;
  position?: string;
  incomeDocType?: string;
}

export interface IBorrowerSummary {
  total_outstanding: number;
  total_overdue: number;
  days_past_due: number;
}

export interface ILoan {
  // loan_id: number;
  // application_id: number;
  // disbursement_date: string;
  // loan_amount: number;
  // outstanding_amount: number;
  // loan_status: string;
  key: string;
  loanId: string;
  applicationId: string;
  disbursementDate: string;
  loanAmount: string;
  outstandingAmount: string;
  status: string;
}

export interface ILoanSearchInput {
  borrowerId?: string;
  status?: string;
  fromDate?: string;
  toDate?: string;
  loanStatus?: string;
  loanId?: string;
  page?: number;
  size?: number;
}

export interface IBorrowerDetail {
  id: number;
  idNo: string;
  idType: string;
  fullName: string;
  handPhone: string;
  email: string;
  gender: string;
  dob: string;
  nationality: string;
  specialization: string;
  ethnicGroup: string;
  postalCode: string;
  typeOfResidential: string;
  propertyOwnership: string;
  address: string;
  grossMonthlyIncome: number;
  annualIncome: number;
  borrowerStatus: tBorrowerStatus;
  blacklisted: string;
  source: string;
  createdDate: string;
  createdBy: string;
  lastModifiedDate: string;
  lastModifiedBy: string;
  myInfoData: string;
  currency: string;
  dnbResultId: number;
  phoneCode: string;
  version: number;
  yearOfNoa: string;
  amountOfNoa: number;
  month2Income: number;
  month3Income: number;
  fridBorrowerId: string;
  month1Income: number;
  idExpiryDate: string;
  countryAddress: string;
  blk: string;
  street: string;
  unit: string;
  building: string;
  employeeStatus: string;
  currEmployer: string;
  position: string;
  incomeDocType: string;
}


export interface IConfig {
  id?: number,
  key: number;
  code: string;
  name: string;
}

export const INIT_BORROWER_DETAIL: IBorrowerDetail = {
  id: 0,
  idNo: "",
  idType: "",
  fullName: "",
  handPhone: "",
  email: "",
  gender: "",
  dob: "",
  nationality: "",
  specialization: "",
  ethnicGroup: "",
  postalCode: "",
  typeOfResidential: "",
  propertyOwnership: "",
  address: "",
  grossMonthlyIncome: 0,
  annualIncome: 0,
  borrowerStatus: "",
  blacklisted: "",
  source: "",
  createdDate: "",
  createdBy: "",
  lastModifiedDate: "",
  lastModifiedBy: "",
  myInfoData: "",
  currency: "",
  dnbResultId: 0,
  phoneCode: "",
  version: 0,
  yearOfNoa: "",
  amountOfNoa: 0,
  month2Income: 0,
  month3Income: 0,
  fridBorrowerId: "",
  month1Income: 0,
  idExpiryDate: '',
  countryAddress: '',
  blk: '',
  street: '',
  unit: '',
  building: '',
  employeeStatus: '',
  currEmployer: '',
  position: '',
  incomeDocType: '',
}


