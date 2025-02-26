import { VERSION_API } from "../../constants/api.constant";
import { IResponse } from "../../interface/api.interface";
import { IApplication } from "../../interface/application.interface";
import {
	IBorrower,
	IBorrowerDetail,
	IConfig,
	ILoan,
	ILoanSearchInput,
} from "../../interface/borrower.interface";
import { tApplicationSearchType } from "../../types/common.type";
import privateClient from "../client/private.client";

interface IBorrowerParams {
	borrowerId: string;
}

interface IUpdateBorrowerParams {
	id_no?: string;
	id_type?: string;
	name?: string;
	phone_number?: string;
	email?: string;
	gender?: string;
	dob?: string;
	nationality?: string;
	specialisation?: string;
	ethnic_group?: string;
	postal_code?: string;
	type_of_residential?: string;
	property_ownership?: string;
	address?: string;
	past_3month_income?: number;
	gross_monthly_income?: number;
	annual_income?: number;
	borrower_status?: string;
	blacklist_status?: string;
	source?: string;
}
interface IBorrowerConfigParams {
	key: string;
}

const borrowerEndpoint = {
	detail: (borrowerId: string) => `api/borrowers/${borrowerId}`,
	getConfig: `api/master-data`,
	updateBorrowers: (id: number) => `api/borrowers/${id}`,
	create: (borrower: IBorrower) => `/api/borrowers`,
	searchBorrowers: '/api/borrowers',
	getApplications: '/api/applications',
	getListOfLoans: '/api/loans',
};

const borrowerApi = {
	getDetailBorrower: async (
		params: IBorrowerParams
	): Promise<IBorrowerDetail> => {
		const response = await privateClient.get<IBorrowerDetail>(
			borrowerEndpoint.detail(params.borrowerId)
		);
		return response.data;
	},

	updateBorrower: async (
		params: IBorrowerDetail
	): Promise<IBorrowerDetail> => {
		const response = await privateClient.patch<IBorrowerDetail>(
			borrowerEndpoint.updateBorrowers(params.id),
			params
		);
		return response.data;
	},

	getConfig: async (
		params: IBorrowerConfigParams
	): Promise<IConfig[]> => {
		const response = await privateClient.get<IConfig[]>(
			borrowerEndpoint.getConfig,
			{
				params: {
					'key.contains': params.key,
				},
			}
		);
		return response.data;
	},

	createBorrower: async (borrower: IBorrower): Promise<IBorrower> => {
		const response = await privateClient.post<IBorrower>(
			borrowerEndpoint.create(borrower),
			borrower
		);
		return response.data;
	},

	searchBorrower: async (idNo: string, searchMode: tApplicationSearchType): Promise<IBorrower[]> => {
		const response = await privateClient.get<IBorrower[]>(
			borrowerEndpoint.searchBorrowers,
			{
				params: {
					[`idNo.${searchMode}`]: idNo,
				},
			}
		);
		return response.data;
	},

	getApplications: async (borrowerId: string): Promise<IApplication[]> => {
		const response = await privateClient.get<IApplication[]>(
			borrowerEndpoint.getApplications,
			{
				params: {
					[`borrowerId.equals`]: borrowerId,
				},
			}
		);
		return response.data;
	},

	getLoans: async (params?: ILoanSearchInput): Promise<ILoan[]> => {
		const response = await privateClient.get<ILoan[]>(
			borrowerEndpoint.getListOfLoans,
			{
				params: {
					"borrowerId.equals": params?.borrowerId,
					// from_date: '',
					// to_date: '',
					// loan_status: '',
					// loan_id: 0,
					page: params?.page || 0,
					size: params?.size || 20,
					// sort: ["lastModifiedDate,desc"],
				},
			}
		)
		return response.data;
	}
};

export default borrowerApi;
