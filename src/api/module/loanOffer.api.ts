import { ILoanOffer } from "../../interface/application.interface";
import privateClient from "../client/private.client";

const loanOfferEndpoint = {
	detail: (loanOfferId: string) => `api/loan-offers/${loanOfferId}`,
};

const loanOfferApi = {
	getDetailLoanOffer: async (
		loanOfferId: string
	): Promise<ILoanOffer> => {
		const response = await privateClient.get<ILoanOffer>(
			loanOfferEndpoint.detail(loanOfferId)
		);
		return response.data;
	},
};

export default loanOfferApi;
