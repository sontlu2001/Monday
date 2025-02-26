import React, { createContext, useContext } from "react";
import { IApplicationDetail, IRepaymentSchedule } from "../interface/application.interface";
import { IOption } from "../interface/general.interface";

interface ApplicationContextProps {
	applicationDetail: IApplicationDetail;
	configOptions: {
		listPhoneNumber: IOption<string>[];
		listNationalities: IOption<string>[];
		listLoanType: IOption<string>[];
		listInterestCalculationMethod: IOption<string>[];
		listPaymentType: IOption<string>[];
		listInstallmentFrequency: IOption<string>[];
		listLoanInterestFrequency: IOption<string>[];
		listIdType:IOption<string>[];
	};
	fetchApplicationDetail: () => Promise<void>;
}

const ApplicationContext = createContext<ApplicationContextProps | undefined>(
	undefined
);

export const useApplicationDetailContext = () => {
	const context = useContext(ApplicationContext);
	if (!context) {
		throw new Error(
			"useApplicationContext must be used within ApplicationProvider"
		);
	}
	return context;
};

export const ApplicationProvider: React.FC<{
	value: ApplicationContextProps;
	children: React.ReactNode;
}> = ({ value, children }) => (
	<ApplicationContext.Provider value={value}>
		{children}
	</ApplicationContext.Provider>
);
