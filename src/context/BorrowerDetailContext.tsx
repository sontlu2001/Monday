import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from "react";
import { useParams } from "react-router-dom";
import borrowerApi from "../api/module/borrower.api";
import {
	IBorrowerDetail,
	ILoan,
	INIT_BORROWER_DETAIL,
} from "../interface/borrower.interface";
import { COMMON_CONFIG_KEYS } from "../constants/general.constant";
import { IOption } from "../interface/general.interface";
import masterDataApi from "../api/module/master-data.api";
import { IApplication } from "../interface/application.interface";

interface BorrowerContextProps {
	borrowerDetails: IBorrowerDetail;
	listApplications: IApplication[];
	listLoans: ILoan[];
	setBorrowerDetails: React.Dispatch<React.SetStateAction<IBorrowerDetail>>;
	getDetailBorrower: () => Promise<void>;
	isEditMode: boolean;
	setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
	loading: boolean;
	configOptions: {
		listIdTypes: IOption<string>[];
		listPhoneNumber: IOption<string>[];
		listGenders: IOption<string>[];
		listNationalities: IOption<string>[];
		listCurrencies: IOption<string>[];
		listSpecialisations: IOption<string>[];
		listEthnicGroups: IOption<string>[];
		listPropertyOwnerships: IOption<string>[];
		listTypeOfResidential: IOption<string>[];
		listBorrowerStatus: IOption<string>[];
		listCountries: IOption<string>[];
		listEmploymentStatus: IOption<string>[];
		listPositions: IOption<string>[];
		listIncomeDocumentTypes: IOption<string>[];
	};
}

const BorrowerContext = createContext<BorrowerContextProps | undefined>(
	undefined
);

export const useBorrowerDetailContext = () => {
	const context = useContext(BorrowerContext);
	if (!context) {
		throw new Error(
			"useBorrowerDetailContext must be used within a BorrowerProvider"
		);
	}
	return context;
};

export const BorrowerProvider = ({ children }: { children: ReactNode }) => {
	const [borrowerDetails, setBorrowerDetails] =
		useState<IBorrowerDetail>(INIT_BORROWER_DETAIL);
	const [listApplications, setListApplications] = useState<IApplication[]>([]);
	const [listLoans, setListLoans] = useState<ILoan[]>([]);
	const [isEditMode, setEditMode] = useState(false);
	const paramsUrl = useParams();
	const [configOptions, setConfigOptions] = useState<{
		listIdTypes: IOption<string>[];
		listPhoneNumber: IOption<string>[];
		listGenders: IOption<string>[];
		listNationalities: IOption<string>[];
		listSpecialisations: IOption<string>[];
		listEthnicGroups: IOption<string>[];
		listPropertyOwnerships: IOption<string>[];
		listTypeOfResidential: IOption<string>[];
		listBorrowerStatus: IOption<string>[];
		listCurrencies: IOption<string>[];
		listCountries: IOption<string>[];
		listEmploymentStatus: IOption<string>[];
		listPositions: IOption<string>[];
		listIncomeDocumentTypes: IOption<string>[];
	}>({
		listIdTypes: [],
		listPhoneNumber: [],
		listGenders: [],
		listNationalities: [],
		listSpecialisations: [],
		listEthnicGroups: [],
		listPropertyOwnerships: [],
		listTypeOfResidential: [],
		listBorrowerStatus: [],
		listCurrencies: [],
		listCountries: [],
		listEmploymentStatus: [],
		listPositions: [],
		listIncomeDocumentTypes: [],
	});

	const [loading, setLoading] = useState(true);

	const getDetailBorrower = async () => {
		try {
			if (!paramsUrl.slug) return;
			const response = await borrowerApi.getDetailBorrower({
				borrowerId: paramsUrl.slug,
			});
			setBorrowerDetails(response);
		} catch (error) {
			console.error(error);
		}
	};

	const getCommonConfig = async () => {
		const configKeys = [
			{ key: COMMON_CONFIG_KEYS.genders, field: "listGenders" },
			{ key: COMMON_CONFIG_KEYS.nationalities, field: "listNationalities" },
			{ key: COMMON_CONFIG_KEYS.ethnicGroups, field: "listEthnicGroups" },
			{ key: COMMON_CONFIG_KEYS.idTypes, field: "listIdTypes" },
			{ key: COMMON_CONFIG_KEYS.specialisations, field: "listSpecialisations" },
			{ key: COMMON_CONFIG_KEYS.typeOfResidential, field: "listTypeOfResidential" },
			{ key: COMMON_CONFIG_KEYS.propertyOwnerships, field: "listPropertyOwnerships" },
			{ key: COMMON_CONFIG_KEYS.phoneCodes, field: "listPhoneNumber" },
			{ key: COMMON_CONFIG_KEYS.borrowerStatus, field: "listBorrowerStatus" },
			{ key: COMMON_CONFIG_KEYS.currencies, field: "listCurrencies" },
			{ key: COMMON_CONFIG_KEYS.countries, field: "listCountries" },
			{ key: COMMON_CONFIG_KEYS.employmentStatus, field: "listEmploymentStatus" },
			{ key: COMMON_CONFIG_KEYS.positions, field: "listPositions" },
			{ key: COMMON_CONFIG_KEYS.listIncomeDocumentTypes, field: "listIncomeDocumentTypes" },
		];

		try {
			const configResults = await Promise.all(
				configKeys.map(async ({ key }) => {
					const response = await masterDataApi.getConfig({ key });
					return response.map((item) => ({
						id: item.id,
						value: item.code,
						label: item.name,
						name: item.name,
						key: item.id,
					}));
				})
			);

			const newConfigOptions = configKeys.reduce((acc, { field }, index) => {
				acc[field as keyof typeof configOptions] = configResults[index];
				return acc;
			}, {} as typeof configOptions);

			setConfigOptions(newConfigOptions);
			setLoading(false);
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	};

	const getApplications = async () => {
		try {
			if (!paramsUrl.slug) return;
			const response = await borrowerApi.getApplications(paramsUrl.slug);
			setListApplications(response);
		} catch (error) {
			console.error(error);
		}
	}

	const getLoans = async () => {
		try {
			if (!paramsUrl.slug) return;
			const response = await borrowerApi.getLoans(paramsUrl.slug);
			setListLoans(response);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		getDetailBorrower();
		getCommonConfig();
		getApplications();
		getLoans();
	}, [paramsUrl.slug]);

	return (
		<BorrowerContext.Provider
			value={{
				borrowerDetails,
				listApplications,
				listLoans,
				setBorrowerDetails,
				getDetailBorrower,
				isEditMode,
				setEditMode,
				loading,
				configOptions,
			}}
		>
			{children}
		</BorrowerContext.Provider>
	);
};
