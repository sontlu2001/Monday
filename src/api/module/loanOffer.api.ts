import {
	IRepaymentSchedule,
} from "../../interface/application.interface";
import { ILoanOffer } from "../../interface/loanOffer.interface";
import privateClient from "../client/private.client";


const loanOffderEndpoint = {
	loanOfferDetail: (loanOfferId: string) => `api/loan-offers/${loanOfferId}`,
	loanOfferHistory: `api/loan-offers`,
	getRepaymentSchedule: 'api/repayment-schedules',
	updateLoanOffer: () => `api/loan-offer/request-new`,
};

const loanOfferApi = {
	getDetailLoanOffer: async (
		loanOfferId: string
	): Promise<ILoanOffer> => {
		const response = await privateClient.get<ILoanOffer>(
			loanOffderEndpoint.loanOfferDetail(loanOfferId)
		);
		return response.data;
	},

	getRepaymentSchedules: async (params:{
		loanOfferId: number,
		size: number,
		sort: string,
	}): Promise<IRepaymentSchedule[]> => {
		const response = await privateClient.get<IRepaymentSchedule[]>(
			loanOffderEndpoint.getRepaymentSchedule,
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
			loanOffderEndpoint.loanOfferHistory,
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
	): Promise<any> => {
		const response = await privateClient.post<any>(
			loanOffderEndpoint.updateLoanOffer(),
			params
		);
		return response.data;
	},
};

export default loanOfferApi;
