import InfoDisplay from "../../../../components/common/InfoDisplay";
import { MAP_LOAN_TYPE_NAME } from "../../../../constants/general.constant";
import { formatCurrency, formatDate } from "../../../../utils/utils";
import { useFormContext } from "react-hook-form";
import { ILoanOffer } from "../../../../interface/application.interface";


const LoanOfferViewMode = () => {
	const { getValues }= useFormContext<ILoanOffer>();
	const formData = getValues();
	console.log(formData, '');

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-60 gap-4">
			<InfoDisplay value={MAP_LOAN_TYPE_NAME.get(formData?.application?.loanType || "S")} label="Loan Type:" />
			<InfoDisplay value={formData?.application?.loanPurpose} label="Loan Purpose:" />
			<InfoDisplay value={formatDate(formData?.application?.dateOfApplication, "DD/MM/YYYY")} label="Application Date:" />
			<InfoDisplay value={`${formData?.application?.borrower.currency} ${formatCurrency(formData?.application?.loanAmount)}`} label="Loan Amount Offer:" />
			<div className="col-span-2">
				<InfoDisplay value={`${formData?.application?.tenorMonths} Months`} label="Loan Tenor Offer:" />
			</div>
			<InfoDisplay value={formData?.installments} label="Installments:" />
			<InfoDisplay value={"test"} label="Installment Frequency:" />
			<InfoDisplay value={formData?.firstPayDate} label="1st Installment Date:" />
			<InfoDisplay value={formData?.book1} label="Book 1:" />
			<div className="col-span-2">
				<InfoDisplay value={formData?.paymentType} label="Payment Type:" />
			</div>
			<InfoDisplay value={"Test"} label="CBS score:" />
			<InfoDisplay value={"Test"} label="CBS PD:" />
			<InfoDisplay value={formData?.application?.remarks} label="Remarks:" />
			<div className="col-span-full">
				<p className="font-bold">Interest</p>
			</div>
			<InfoDisplay value={formData?.interestMonth} label="Monthly Interest Rate:" />
			<InfoDisplay value={formData?.interestFrequency} label="Interest Frequency:" />
			<InfoDisplay value={formData?.interestCalculateMethod} label="Interest Calculation Method:" />
			<div className="col-span-full">
				<p className="font-bold">Fees</p>
			</div>
			<InfoDisplay value={formData?.adminFeeRate} label="Admin Fee (%)" />
			<InfoDisplay value={"test"} label="Admin Fee :" />
			<div></div>
			<InfoDisplay value={formData?.lateInterest} label="Late Interest (%)" />
			<InfoDisplay value={"test"} label="Late Fee :" />
		</div>
	)

};

export default LoanOfferViewMode;
