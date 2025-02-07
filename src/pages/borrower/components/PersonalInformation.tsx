import { memo, useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import DatePickerField from "../../../components/form/DatePickerField";
import PhoneNumberInput from "../../../components/form/PhoneNumber";
import SelectInputField from "../../../components/form/SelectInputField";
import { TextInputField } from "../../../components/form/TextInputField";
import { VALIDATION_MESSAGES } from "../../../constants/validation.constant";
import { useBorrowerDetailContext } from "../../../context/BorrowerDetailContext";
import { IBorrower, IBorrowerDetail } from "../../../interface/borrower.interface";
import IdNumber from "./IdNumber";

const PersonalInformation = () => {
  const { configOptions } = useBorrowerDetailContext();
  const {
    control,
    setError,
    clearErrors,
    formState: { errors }
  } = useFormContext<IBorrower | IBorrowerDetail>();


  useEffect(() => {
    if (errors.phoneCode) {
      setError("handPhone", {
        type: "manual",
        message: VALIDATION_MESSAGES.REQUIRED_FIELD,
      });
    } else {
      clearErrors("handPhone");
    }
  }, [errors.phoneCode, setError, clearErrors]);

  const configOptionsMemo = useMemo(() => configOptions, [configOptions]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-2">
	    <IdNumber control={control}/>
      <SelectInputField
        control={control}
        name="idType"
        options={configOptionsMemo.listIdTypes}
        label="ID Type"
        required
        placeholder="Select ID Type"
      />
      <DatePickerField
        control={control}
        label="ID Expiry Date"
        placeholder="Select Expiry Date"
        name="idExpiryDate"
        required
      />
      <TextInputField
        control={control}
        name="fullName"
        label="Name"
        placeholder="Enter Borrower Name"
        required
      />
      <PhoneNumberInput
        options={configOptionsMemo.listPhoneNumber}
        phoneCode="phoneCode"
        control={control}
        phoneName="handPhone"
        placeHolder="Enter Phone Number"
        label="Mobile Number"
        required
      />
      <TextInputField
        control={control}
        name="email"
        label="Email ID"
        placeholder="Enter Borrower Email"
        required
      />
      <SelectInputField
        showSearch
        control={control}
        name="nationality"
        options={configOptionsMemo.listNationalities}
        label="Nationality"
        placeholder="Select Nationality"
        layout="vertical"
        required
      />
       <DatePickerField
        control={control}
        label="Date of Birth"
        placeholder="Select Expiry Date"
        name="dob"
        required
      />
      <SelectInputField
        control={control}
        name="gender"
        options={configOptionsMemo.listGenders}
        placeholder="Select Gender"
        label="Gender"
        required
      />
      <SelectInputField
        showSearch
        control={control}
        name="ethnicGroup"
        options={configOptionsMemo.listEthnicGroups}
        label="Ethnic Group"
        placeholder="Select Ethnic Group"
      />
      <SelectInputField
        control={control}
        name="typeOfResidential"
        label="Type of Residential Property"
        placeholder="Select Type of Residential Property"
        options={configOptionsMemo.listTypeOfResidential}
      />
      <SelectInputField
        control={control}
        name="propertyOwnership"
        label="Property Ownership"
        placeholder="Select Property Ownership"
        options={configOptionsMemo.listPropertyOwnerships}
      />
      <SelectInputField
        showSearch
        control={control}
        name="countryAddress"
        label="Country"
        placeholder="Select Country"
        options={configOptionsMemo.listCountries}
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
    </div>
  )
};

export default memo(PersonalInformation);
