
export interface ILoanOffer {
	id: number;
  loanAmountOffer: number;
  tenorMonthOffer: number;
  interestMonth: number;
  adminFeeRate: number;
  lateFee: number;
  payFrequency: string;
  interestFrequency: string;
  lateInterest: number;
  interestCalculateMethod: string;
  installments: number;
  appointmentDatetime: string;
  tier: string;
  version: number;
  isDocGenerated: string;
  isDocUploaded: string;
  remarks: string;
  book1: string;
  paymentType: string;
  firstPayDate: string;
  createdBy: string,
	createdDate: string,
}

export const INITIAL_LOAN_OFFER: ILoanOffer = {
  id: 0,
  loanAmountOffer: 0,
  tenorMonthOffer: 0,
  interestMonth: 0,
  adminFeeRate: 0,
  lateFee: 0,
  payFrequency: "",
  interestFrequency: "",
  lateInterest: 0,
  interestCalculateMethod: "",
  installments: 0,
  appointmentDatetime: "",
  tier: "",
  version: 0,
  isDocGenerated: "",
  isDocUploaded: "",
  remarks: "",
  book1: "",
  paymentType: "",
  firstPayDate: "",
  createdBy: "",
  createdDate: "",
};

export interface ILoanOfferRes {
  applicationStatus: string;
  loanOffer: ILoanOffer;
}