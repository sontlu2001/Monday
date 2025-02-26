import {
	IApplication,
	IApplicationDetail,
	IApplicationSearchInput,
	IApplicationStatistics,
	ICreateTask,
} from "../../interface/application.interface";
import { IDueDiligence } from "../../interface/due.dilegence.api";
import { IDataWithPagination } from "../../interface/pagination.interface";
import { tCheckType } from "../../types/common.type";
import privateClient from "../client/private.client";

interface IApplicationDetailParams {
	id?: string;
}

interface IDueDiligenceParams {
	applicationId: string | number;
	checkType: Array<string>;
	source?: string;
}
interface IHistoryDiligenceParams {
	applicationId?: string;
	checkType: tCheckType;
}

const applicationEndpoint = {
	getListApplication: `api/applications`,
	getHistoryDiligence: `api/due-diligence/history`,
	statistics: `api/applications/statistics`,
	detailApplication: (id?: string) => `api/applications/${id}`,
	diligence: `api/due-diligence`,
	diligenceById: (id: string) => `api/due-diligence/${id}`,
	createTask: `api/due-diligence/task`,
	taskRunning: `api/due-diligence/task/running`,
	detailApplicationByLoanOffer: (id?: string) => `api/applications/${id}/loan-offer`,
	generateForm: (applicationId: number, formType: string) => `api/applications/generate-form?applicationId=${applicationId}&formType=${formType}`,
	cancelDisburse: (id: number) => `api/applications/${id}/cancel-disburse`,
	manualDisburse: (id: number) => `api/applications/${id}/manual-disburse`,
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
					"dateOfApplication.greaterThanOrEqual":
						params?.dateRange && params?.dateRange[0],
					"dateOfApplication.lessThanOrEqual": params?.dateRange && params?.dateRange[1],
					page: params?.page || 0,
					size: params?.size || 20,
					sort: ["lastModifiedDate,desc"],
				},
			}
		);

		const totalDocument =
			response.headers && response.headers["x-total-count"]
				? +response.headers["x-total-count"]
				: 0;

		return {
			data: response.data,
			totalDocument,
		};
	},

	getDetailApplication: async (
		params?: IApplicationDetailParams
	): Promise<IApplicationDetail> => {
		const response = await privateClient.get<IApplicationDetail>(
			applicationEndpoint.detailApplication(params?.id)
		);
		return response.data;
	},

	getStatistics: async (params?: IApplicationSearchInput): Promise<IApplicationStatistics> => {
		const response = await privateClient.get<IApplicationStatistics>(
			applicationEndpoint.statistics,
			{
				params: {
					startDate: params?.dateRange && params?.dateRange[0],
					endDate: params?.dateRange && params?.dateRange[1],
				},
			}
		);
		return response.data;
	},

	getDiligence: async (
		params?: IDueDiligenceParams
	): Promise<IDueDiligence[]> => {
		const response = await privateClient.get<IDueDiligence[]>(
			applicationEndpoint.diligence,
			{
				params: {
					applicationId: params?.applicationId,
					checkType: params?.checkType,
				},
			}
		);
		return response.data;
	},

	getDiligenceById: async (id: string): Promise<IDueDiligence> => {
		const response = await privateClient.get<IDueDiligence>(
			applicationEndpoint.diligenceById(id)
		);
		return response.data;
	},

	getHistoryDiligence: async (
		params?: IHistoryDiligenceParams
	): Promise<IDueDiligence[]> => {
		const response = await privateClient.get<IDueDiligence[]>(
			applicationEndpoint.getHistoryDiligence,
			{
				params: {
					checkType: params?.checkType,
					applicationId: params?.applicationId,
				},
			}
		);
		return response.data;
	},

	createTask: async (params?: IDueDiligenceParams): Promise<ICreateTask[]> => {
		const response = await privateClient.post<ICreateTask[]>(
			applicationEndpoint.createTask,
			{
				applicationId: params?.applicationId,
				checkType: params?.checkType,
				source: params?.source,
			}
		);
		return response.data;
	},

	getTaskResult: async (params?: ICreateTask[]): Promise<IDueDiligence[]> => {
		const response = await privateClient.post<IDueDiligence[]>(
			applicationEndpoint.taskRunning,
			params
		);
		return response.data;
	},

	getDetailApplicationByLoanOffer: async (
		params?: IApplicationDetailParams
	): Promise<IApplicationDetail> => {
		const response = await privateClient.get<IApplicationDetail>(
			applicationEndpoint.detailApplicationByLoanOffer(params?.id)
		);
		return response.data;
	},

	generateForm: async (applicationId: number, formType: string): Promise<any> => {
		const response = await privateClient.get<any>(
			applicationEndpoint.generateForm(applicationId, formType),
		)
		return response.data;
	},

	cancelDisburse: async (applicationId: number): Promise<any> => {
		const response = await privateClient.post<any>(
			applicationEndpoint.cancelDisburse(applicationId),
			undefined
		)
		return response.data;
	},

	manualDisburse: async (applicationId: number): Promise<any> => {
		const response = await privateClient.post<any>(
			applicationEndpoint.manualDisburse(applicationId),
			undefined
		)
		return response.data;
	}
};

export default applicationApi;
