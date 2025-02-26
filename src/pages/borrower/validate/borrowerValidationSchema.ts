import dayjs from "dayjs";
import * as yup from "yup";
import { IBorrower } from "../../../interface/borrower.interface";
import { VALIDATION_MESSAGES } from "../../../constants/validation.constant";
import { countries } from "../constants/borrower.constant";

export const createBorrowerSchema = yup.object().shape({
	idNo: yup.string().required(VALIDATION_MESSAGES.REQUIRED_FIELD),
	idType: yup.string().required(VALIDATION_MESSAGES.REQUIRED_FIELD),
	idExpiryDate: yup.mixed<dayjs.Dayjs>().nullable(),
	fullName: yup.string().required(VALIDATION_MESSAGES.REQUIRED_FIELD),
	nationality: yup.string().required(VALIDATION_MESSAGES.REQUIRED_FIELD),
	phoneCode: yup.string().required(VALIDATION_MESSAGES.REQUIRED_FIELD),
	handPhone: yup.string().required(VALIDATION_MESSAGES.REQUIRED_FIELD),
	gender: yup.string().required(VALIDATION_MESSAGES.REQUIRED_FIELD),
	email: yup.string().required(VALIDATION_MESSAGES.REQUIRED_FIELD).email("Email must be a valid email"),
	dob: yup.mixed<dayjs.Dayjs>().required(VALIDATION_MESSAGES.REQUIRED_FIELD),
	ethnicGroup: yup.string().optional(),
	address: yup.string().optional(),
	typeOfResidential: yup.string().when("countryAddress", (address, schema) => {
		const addressValue = Array.isArray(address) ? address[0] : address;
 	 	return addressValue === countries.SINGAPORE ? schema.required(VALIDATION_MESSAGES.REQUIRED_FIELD): schema.optional();
	}),
	propertyOwnership: yup.string().when("countryAddress", (address, schema) => {
		const addressValue = Array.isArray(address) ? address[0] : address;
 	 	return addressValue === countries.SINGAPORE ? schema.required(VALIDATION_MESSAGES.REQUIRED_FIELD): schema.optional();
	}),
	blk: yup.string().when("countryAddress", (address, schema) => {
		const addressValue = Array.isArray(address) ? address[0] : address;
 	 	return addressValue === countries.SINGAPORE ? schema.required(VALIDATION_MESSAGES.REQUIRED_FIELD): schema.optional();
	}),
	street: yup.string().when("countryAddress", (address, schema) => {
		const addressValue = Array.isArray(address) ? address[0] : address;
 	 	return addressValue === countries.SINGAPORE ? schema.required(VALIDATION_MESSAGES.REQUIRED_FIELD): schema.optional();
	}),
	postalCode: yup.string().when("countryAddress", (address, schema) => {
		const addressValue = Array.isArray(address) ? address[0] : address;
 	 	return addressValue === countries.SINGAPORE ? schema.required(VALIDATION_MESSAGES.REQUIRED_FIELD): schema.optional();
	}),
	employeeStatus: yup.string().when("countryAddress", (address, schema) => {
		const addressValue = Array.isArray(address) ? address[0] : address;
 	 	return addressValue === countries.SINGAPORE ? schema.required(VALIDATION_MESSAGES.REQUIRED_FIELD): schema.optional();
	}),
	month1Income: yup.number().optional(),
	month2Income: yup.number().optional(),
	month3Income: yup.number().optional(),
	grossMonthlyIncome: yup.string().optional(),
	annualIncome: yup.string().optional(),
	specialisation: yup.string().optional(),
	yearOfNoa: yup.mixed<dayjs.Dayjs>().nullable(),
	amountOfNoa:  yup.number().nullable()
}) as yup.ObjectSchema<IBorrower>;

export const detailBorrowerSchema = yup.object().shape({
	id_no: yup.string().required("ID Number is required"),
	name: yup.string().required("Name is required"),
	id_type: yup.string().required("ID Type is required"),
	phone_number: yup.string().required("Phone Number is required"),
	gender: yup.string().required("Gender is required"),
	email: yup
		.string()
		.required("Email is required")
		.email("Email must be a valid email"),
	dob: yup.mixed<dayjs.Dayjs>().nullable().required("Date of Birth is required"),
	nationality: yup.string().required("Nationality is required"),
	specialisation: yup.string().optional(),
	ethnic_group: yup.string().optional(),
	postal_code: yup.string().optional(),
	type_of_residential: yup.string().optional(),
	address: yup.string().optional(),
	property_ownership: yup.string().optional(),
	borrower_status: yup.string().optional(),
	gross_monthly_income: yup
		.number()
		.required("Gross Monthly Income is required")
		.min(0, "Gross Monthly Income cannot be negative"),
	past_3month_income: yup
		.number()
		.required("Past 3 Month Income is required")
		.min(0, "Past 3 Month Income cannot be negative"),
	annual_income: yup
		.number()
		.optional()
		.min(0, "Annual Income cannot be negative"),
	borrower_id: yup.number().optional(),
	// Todo recheck type
}) as yup.ObjectSchema<any>;
