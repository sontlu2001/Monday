import {
	IRepaymentSchedule,
} from "../../interface/application.interface";
import { ILoanOffer, ILoanOfferRes } from "../../interface/loanOffer.interface";
import privateClient from "../client/private.client";


const loanOfferEndpoint = {
	loanOfferDetail: (loanOfferId: string) => `api/loan-offers/${loanOfferId}`,
	loanOfferHistory: `api/loan-offers`,
	getRepaymentSchedule: 'api/repayment-schedules',
	updateLoanOffer: () => `api/loan-offer/request-new`,
	cancelLoanOffer: (loanOfferId: string) => `api/loan-offer/${loanOfferId}/request-cancel`,
};

const loanOfferApi = {
	getDetailLoanOffer: async (
		loanOfferId: string
	): Promise<ILoanOffer> => {
		const response = await privateClient.get<ILoanOffer>(
			loanOfferEndpoint.loanOfferDetail(loanOfferId)
		);
		return response.data;
	},

	getRepaymentSchedules: async (params:{
		loanOfferId: number,
		size?: number,
		sort?: string,
	}): Promise<IRepaymentSchedule[]> => {
		const response = await privateClient.get<IRepaymentSchedule[]>(
			loanOfferEndpoint.getRepaymentSchedule,
			{
				params: {
					"loanOfferId.equals": params?.loanOfferId,
					"sort": params?.sort,
					"size": params?.size,
				},
			}
		);
		return response.data;
	},

	getLoanOfferHistory: async (
		applicationId: number | string,
	): Promise<any> => {
		const response = await privateClient.get<any>(
			loanOfferEndpoint.loanOfferHistory,
			{
				params: {
					"applicationId.equals": applicationId,
          "sort": "createdDate,desc",
				},
			}
		);
		return response.data;
	},

	updateLoanOffer: async (
		params: ILoanOffer
	): Promise<ILoanOfferRes> => {
		const response = await privateClient.post<any>(
			loanOfferEndpoint.updateLoanOffer(),
			params
		);
		return response.data;
	},

	cancelLoanOffer: async (
		loanOfferId: string
	): Promise<ILoanOfferRes> => {
		const response = await privateClient.post<ILoanOfferRes>(
			loanOfferEndpoint.cancelLoanOffer(loanOfferId)
		);
		return response.data;
	},

};

export default loanOfferApi;
