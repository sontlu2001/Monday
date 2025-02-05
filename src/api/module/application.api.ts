import {
	IApplication,
	IApplicationDetail,
	IApplicationSearchInput,
	IApplicationStatistics,
} from "../../interface/application.interface";
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
	): Promise<IApplication[]> => {
		const response = await privateClient.get<IApplication[]>(
			applicationEndpoint.getListApplication,
			{
				params: {
					"applicationStatus.equals": params?.status,
					"loanType.equals": params?.loanType,
					"id.equals": params?.applicationId,
					"dateOfApplication.greaterThanOrEqual": params?.dateRange && params?.dateRange[0],
					"dateOfApplication.lessThanOrEqual": params?.dateRange && params?.dateRange[1],
				},
			}
		);
		return response.data;
	},

	getDetailApplication: async (
		params?: IApplicationDetailParams
	): Promise<IApplicationDetail> => {
		const response = await privateClient.get<IApplicationDetail>(
			applicationEndpoint.detailApplication(params?.id)
		);
		return response.data;
	},

	getStatistics: async (): Promise<IApplicationStatistics> => {
		const response = await privateClient.get<IApplicationStatistics>(
			applicationEndpoint.statistics
		);
		return response.data;
	},
	getDiligence: async (): Promise<any> => {
		const response = await privateClient.get<any>(
			applicationEndpoint.diligence,
		);
		return response.data;
	},
};

export default applicationApi;
