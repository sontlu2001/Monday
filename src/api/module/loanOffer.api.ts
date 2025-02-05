import { ILoanOffer } from "../../interface/application.interface";
import {
	IBorrower,
	IBorrowerDetail,
	IConfig,
} from "../../interface/borrower.interface";
import { tApplicationSearchType } from "../../types/common.type";
import privateClient from "../client/private.client";

interface ILoanOfferParams {
	loanOfferId: string;
}

const loanOfferEndpoint = {
	detail: (loanOfferId: string) => `api/loan-offers/${loanOfferId}`,
};

const loanOfferApi = {
	getDetailLoanOffer: async (
		params: ILoanOfferParams
	): Promise<IBorrowerDetail> => {
		const response = await privateClient.get<IBorrowerDetail>(
			loanOfferEndpoint.detail(params.loanOfferId)
		);
		return response.data;
	},
};

export default loanOfferApi;
