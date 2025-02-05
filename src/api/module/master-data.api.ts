import { IConfig } from "../../interface/borrower.interface";
import privateClient from "../client/private.client";

interface IBorrowerConfigParams {
	key: string;
}

const masterDataEndpoint = {
	getConfig: `api/master-data`,
};

const masterDataApi = {
	getConfig: async (params: IBorrowerConfigParams): Promise<IConfig[]> => {
		const response = await privateClient.get<IConfig[]>(
			masterDataEndpoint.getConfig,
			{
				params: {
					"key.contains": params.key,
					'size': 1000,
				},
			}
		);
		return response.data;
	},
};

export default masterDataApi;
