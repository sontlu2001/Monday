import { IGlobalSearch } from "../../interface/global.search.interface";
import privateClient from "../client/private.client";


const applicationEndpoint = {
	getSearch: `api/globalSearch`,
};

const globalSearchApi = {
	getOption: async (
		params?: string
	): Promise<IGlobalSearch> => {
		const response = await privateClient.get<IGlobalSearch>(
			applicationEndpoint.getSearch,
			{
				params: {
					"query": params,
				},
			}
		);
		return response.data;
	},
};

export default globalSearchApi;
