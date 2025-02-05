import { Card } from "antd";
import { useFormContext } from "react-hook-form";
import DatePickerField from "../../../components/form/DatePickerField";
import PhoneNumberInput from "../../../components/form/PhoneNumber";
import SelectInputField from "../../../components/form/SelectInputField";
import { TextInputField } from "../../../components/form/TextInputField";
import { useBorrowerDetailContext } from "../../../context/BorrowerDetailContext";
import { IBorrowerDetail } from "../../../interface/borrower.interface";

const BorrowerDetailEditMode = () => {
	const { control } = useFormContext<IBorrowerDetail>();

	const { configOptions } = useBorrowerDetailContext();
	return (
		<Card title="Personal Information" className="mb-2">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				<TextInputField<IBorrowerDetail>
					control={control}
					name="idNo"
					label="ID Number"
					required={true}
				/>
				<SelectInputField<IBorrowerDetail>
					control={control}
					options={configOptions.listIdTypes}
					name="idType"
					label="ID Type"
					required={true}
				/>
				<DatePickerField<IBorrowerDetail>
					control={control}
					name="idExpiryDate"
					label="ID Expiry Date"
					required={true}
				/>
				<TextInputField<IBorrowerDetail>
					control={control}
					name="fullName"
					label="Name"
					required={true}
				/>
				<PhoneNumberInput<IBorrowerDetail>
					control={control}
					options={configOptions.listPhoneNumber}
					phoneCode="phoneCode"
					phoneName="handPhone"
					label="Mobile Number"
					required={true}
				/>
				<TextInputField<IBorrowerDetail> control={control} name="email" label="Email" />
				<SelectInputField
					control={control}
					showSearch
					name="nationality"
					options={configOptions.listNationalities}
					layout="vertical"
					label="Nationality"
					required={true}
				/>
					<DatePickerField<IBorrowerDetail>
					control={control}
					name="dob"
					label="Date of Birth"
					required={true}
				/>
				<SelectInputField<IBorrowerDetail>
					control={control}
					name="gender"
					options={configOptions.listGenders}
					label="Gender"
					required={true}
				/>
				<SelectInputField<IBorrowerDetail>
					control={control}
					name="ethnicGroup"
					options={configOptions.listEthnicGroups}
					label="Ethnic Group"
				/>
				<SelectInputField
					control={control}
					name="typeOfResidential"
					label="Type of Residential Property"
					placeholder="Select Type of Residential Property"
					options={configOptions.listTypeOfResidential}
				/>
				<SelectInputField
					control={control}
					name="propertyOwnership"
					label="Property Ownership"
					placeholder="Select Property Ownership"
					options={configOptions.listPropertyOwnerships}
				/>
				<SelectInputField
					showSearch
					control={control}
					name="countryAddress"
					label="Country"
					placeholder="Select Country"
					options={configOptions.listCountries}
				/>
				<TextInputField
					control={control}
					name="blk"
					label="Blk"
					placeholder="Enter Blk"
				/>
				<TextInputField
					control={control}
					name="street"
					label="Street"
					placeholder="Enter Street"
				/>
				<TextInputField
					control={control}
					name="unit"
					label="Unit No"
					placeholder="Enter Unit No"
				/>
				<TextInputField
					control={control}
					name="building"
					label="Building"
					placeholder="Enter Buiding"
				/>
				<TextInputField
					control={control}
					name="postalCode"
					label="Postal Code"
					placeholder="Enter Postal Code"
				/>
				<TextInputField
					control={control}
					name="address"
					label="Address"
					placeholder="Enter Address"
				/>
				<SelectInputField<IBorrowerDetail>
					control={control}
					name="borrowerStatus"
					options={configOptions.listBorrowerStatus}
					label="Borrower Status"
				/>
			</div>
		</Card>
	);
};

export default BorrowerDetailEditMode;
