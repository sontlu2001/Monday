import {
	IApplication,
	IApplicationDetail,
	IApplicationSearchInput,
	IApplicationStatistics,
} from "../../interface/application.interface";
import { IDataWithPagination } from "../../interface/pagination.interface";
import privateClient from "../client/private.client";

interface IApplicationDetailParams {
	id?: string;
}

const applicationEndpoint = {
	getListApplication: `api/applications`,
	statistics: `api/applications/statistics`,
	detailApplication: (id?: string) => `api/applications/${id}`,
	diligence: `api/due-diligence`,
};

const applicationApi = {
	getListApplication: async (
		params?: IApplicationSearchInput
	): Promise<IDataWithPagination<IApplication>> => {
		const response = await privateClient.get<IApplication[]>(
			applicationEndpoint.getListApplication,
			{
				params: {
					"applicationStatus.in": params?.status,
					"loanType.equals": params?.loanType,
					"id.equals": params?.applicationId,
					"dateOfApplication.greaterThanOrEqual": params?.dateRange && params?.dateRange[0],
					"dateOfApplication.lessThanOrEqual": params?.dateRange && params?.dateRange[1],
					"page": params?.page || 0,
					"size": params?.size || 20,
					"sort": ["lastModifiedDate,desc"]
				},
			}
		);

		const totalDocument = response.headers && response.headers['x-total-count'] ? +response.headers['x-total-count'] : 0;

		return {
			data: response.data,
			totalDocument
		}
	},

	getDetailApplication: async (
		params?: IApplicationDetailParams
	): Promise<IApplicationDetail> => {
		const response = await privateClient.get<IApplicationDetail>(
			applicationEndpoint.detailApplication(params?.id)
		);
		return response.data;
	},

	getStatistics: async ( params?: IApplicationSearchInput): Promise<IApplicationStatistics> => {
		const response = await privateClient.get<IApplicationStatistics>(
			applicationEndpoint.statistics,
			{
				params: {
					startDate: params?.dateRange && params?.dateRange[0],
					endDate: params?.dateRange && params?.dateRange[1],
				}
			}
		);
		return response.data;
	},

	getDiligence: async (params: {
		applicationId: number,
		checkType: string,
	}): Promise<any> => {
		const response = await privateClient.get<any>(
			applicationEndpoint.diligence,
			{
				params: {
					"applicationId": params?.applicationId,
					"checkType": params?.checkType,
				},
			}
		);
		return response.data;
	},
};

export default applicationApi;
