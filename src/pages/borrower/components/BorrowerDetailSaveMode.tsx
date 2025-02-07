import { Card } from "antd";
import { memo, useState } from "react";
import { useFormContext } from "react-hook-form";
import InfoDisplay from "../../../components/common/InfoDisplay";
import { useBorrowerDetailContext } from "../../../context/BorrowerDetailContext";
import { IBorrowerDetail } from "../../../interface/borrower.interface";
import { formatCurrency, formatDate, formatPhoneNumber } from "../../../utils/utils";

const PersonalInfo = () => {
	const { getValues } = useFormContext<IBorrowerDetail>();
	const { configOptions } = useBorrowerDetailContext();

	const formValue = getValues();
	return (
		<>
			<InfoDisplay label="ID Number:" value={formValue.idNo}></InfoDisplay>
			<InfoDisplay
				label="ID Type:"
				value={
					configOptions.listIdTypes.find((idType) => idType.value === formValue.idType)
						?.name
				}
			></InfoDisplay>
			<InfoDisplay
				label="ID Expiry Date:"
				value={formatDate(formValue.idExpiryDate)}
			></InfoDisplay>
		</>
	);
};

const AdditionalPersonalInfo = () => {
	const { getValues } = useFormContext<IBorrowerDetail>();
	const { configOptions } = useBorrowerDetailContext();

	const formValue = getValues();
	return (
		<>
			<InfoDisplay label="Name:" value={formValue.fullName} />
			<InfoDisplay
				label="Phone Number:"
				value={formatPhoneNumber(
					formValue.phoneCode,
					formValue.handPhone,
					configOptions.listPhoneNumber
				)}
			/>
			<InfoDisplay value={formValue.email} label="Email ID:" />
			<InfoDisplay
				label="Nationality:"
				value={
					configOptions.listNationalities.find(
						(national) => national.value === formValue.nationality
					)?.name
				}
			/>
			<InfoDisplay
				value={formatDate(formValue.dob)}
				label="Date of Birth"
			/>
			<InfoDisplay
				value={
					configOptions.listGenders.find((gender) => gender.value === formValue.gender)
						?.name
				}
				label="Gender:"
			/>
			<InfoDisplay
				value={
					configOptions.listEthnicGroups.find(
						(ethnic) => ethnic.value === formValue.ethnicGroup
					)?.name
				}
				label="Ethnic Group:"
			/>
			<InfoDisplay
				value={
					configOptions.listTypeOfResidential.find(
						(type) => type.value === formValue.typeOfResidential
					)?.name
				}
				label="Type of Residential Property:"
			/>
			<InfoDisplay
				value={
					configOptions.listPropertyOwnerships.find(
						(property) => property.value === formValue.propertyOwnership
					)?.name
				}
				label="Property Ownership:"
			/>
			<InfoDisplay 
				value={configOptions.listCountries.find(
					(country) => country.value === formValue.countryAddress)?.name}
				label="Country:">
			</InfoDisplay>
			<InfoDisplay value={formValue.blk} label="Blk:"></InfoDisplay>
			<InfoDisplay value={formValue.street} label="Street:"></InfoDisplay>
			<InfoDisplay value={formValue.unit} label="Unit No:"></InfoDisplay>
			<InfoDisplay value={formValue.building} label="Building:"></InfoDisplay>
			<InfoDisplay value={formValue.postalCode} label="Postal Code:"></InfoDisplay>
			<InfoDisplay value={formValue.address} label="Address:"></InfoDisplay>
		</>
	);
};

const EmploymentIncomeDetails = () => {
	const { getValues } = useFormContext<IBorrowerDetail>();
	const { configOptions } = useBorrowerDetailContext();
	const formValue = getValues();

	return (
		<>
			<InfoDisplay
				label="Employment Status:"
				value={configOptions.listEmploymentStatus.find(
					(status) => status.value === formValue.employeeStatus
				)?.name}
			/>
			<InfoDisplay label="Current Employer Name:" value={formValue.currEmployer} />
			<InfoDisplay
				value={
					configOptions.listSpecialisations.find(
						(property) => property.value === formValue.specialization
					)?.name
				}
				label="Specialization:"
			/>
			<InfoDisplay
				label="Position:"
				value={configOptions.listPositions.find(
					(position) => position.value === formValue.position
				)?.name}
			/>
			<div />
			<div />
			<InfoDisplay
				label="Income Document Type:"
				value={configOptions.listIncomeDocumentTypes.find(
					(type) => type.value === formValue.incomeDocType
				)?.name}
			/>
			<InfoDisplay
				value={`${formValue.currency} ${formatCurrency(formValue.amountOfNoa)}`}
				label="Amount of NOA:"
			></InfoDisplay>
			<InfoDisplay
				value={formatDate(formValue.yearOfNoa)}
				label="Year of NOA:"
			></InfoDisplay>
			<InfoDisplay
				value={`${formValue.currency} ${formatCurrency(formValue.month1Income)}`}
				label="Income 1:"
			></InfoDisplay>
			<InfoDisplay
				value={`${formValue.currency} ${formatCurrency(formValue.grossMonthlyIncome)}`}
				label="Gross Monthly Income:"
			></InfoDisplay>
			<br />
			<InfoDisplay
				value={`${formValue.currency} ${formatCurrency(formValue.month2Income)}`}
				label="Income 2:"
			></InfoDisplay>
			<InfoDisplay
				value={`${formValue.currency} ${formatCurrency(formValue.annualIncome)}`}
				label="Annual Income:"
			></InfoDisplay>
			<br />
			<InfoDisplay
				value={`${formValue.currency} ${formatCurrency(formValue.month3Income)}`}
				label="Income 3:"
			></InfoDisplay>
		</>
	);
};

const BorrowerDetailSaveMode = () => {
	const { getValues } = useFormContext<IBorrowerDetail>();
	const formValue = getValues();

	const [collapse, setCollapse] = useState(true);
	const onToggleCollapse = () => {
		setCollapse(!collapse);
	};
	return (
		<>
			<Card
				title="Personal Information"
				className="mb-2"
				extra={
					<a className="font-medium text-blue-700" onClick={onToggleCollapse}>
						{collapse ? "More" : "Less"}
					</a>
				}
			>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
					<PersonalInfo></PersonalInfo>
				</div>
				<div
					className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 transition-all duration-500 ease-in-out overflow-hidden ${collapse ? "max-h-0 opacity-0" : "max-h-96 opacity-100"
						}`}
				>
					<AdditionalPersonalInfo />
				</div>
			</Card>

			<Card
				title="Employment and Income Details"
				className={`mb-2 transition-all duration-500 ease-in-out overflow-hidden ${collapse ? "max-h-0 opacity-0" : "max-h-96 opacity-100"
					}`}
			>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
					<EmploymentIncomeDetails />
				</div>
			</Card>
		</>
	);
};

export default memo(BorrowerDetailSaveMode);
