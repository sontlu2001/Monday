import InfoDisplay from "../../../../components/common/InfoDisplay";
import { MAP_LOAN_TYPE_NAME } from "../../../../constants/general.constant";
import { calcAdminFee, formatCurrency, formatDate, getFutureDate, getMasterDataName } from "../../../../utils/utils";
import { useFormContext, useWatch } from "react-hook-form";
import { useApplicationDetailContext } from "../../../../context/ApplicationDetailContext";
import { useCallback, useEffect } from "react";
import DatePickerField from "../../../../components/form/DatePickerField";
import { ILoanOffer } from "../../../../interface/loanOffer.interface";


const LoanOfferViewMode = () => {
	const { applicationDetail, configOptions } = useApplicationDetailContext();
	const { control, setValue } = useFormContext<ILoanOffer>();

	const firstPayDate = useWatch({
		control,
		name: "firstPayDate",
	});

	useEffect(() => {
		if(!firstPayDate){
			setValue("firstPayDate", getFutureDate(30));
		}
	}, [firstPayDate, setValue]);


	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-4">
			<InfoDisplay value={MAP_LOAN_TYPE_NAME.get(applicationDetail?.loanType)} label="Loan Type:" />
			<InfoDisplay value={applicationDetail?.loanPurpose} label="Loan Purpose:" />
			<InfoDisplay value={formatDate(applicationDetail?.dateOfApplication, "DD/MM/YYYY")} label="Application Date:" />
			<InfoDisplay value={`${applicationDetail?.borrower.currency} ${formatCurrency(applicationDetail?.loanOffer?.loanAmountOffer || 0)}`} label="Loan Amount Offer:" />
			<div className="col-span-2">
				<InfoDisplay value={`${applicationDetail?.tenorMonths} Months`} label="Loan Tenor Offer:" />
			</div>
			<InfoDisplay value={applicationDetail?.loanOffer?.installments} label="Installments:" />
			<InfoDisplay 
				value={
					getMasterDataName(configOptions.listInstallmentFrequency, applicationDetail?.loanOffer?.payFrequency)
				} 
				label="Installment Frequency:" 
			/>
			<InfoDisplay value={formatDate(firstPayDate, 'DD/MM/YYYY')} label="1st Installment Date:" />
			<InfoDisplay value={applicationDetail?.loanOffer?.book1} label="Book 1:" />
			<div className="col-span-2">
				<InfoDisplay 
					value={
						getMasterDataName(configOptions.listPaymentType, applicationDetail?.loanOffer?.paymentType)
					} 
					label="Payment Type:"
				/>
			</div>
			<InfoDisplay value={""} label="CBS score:" />
			<InfoDisplay value={""} label="CBS PD:" />
			<InfoDisplay value={applicationDetail?.remarks} label="Remarks:" />
			<div className="col-span-full">
				<p className="font-bold">Interest</p>
			</div>
			<InfoDisplay value={`${applicationDetail?.loanOffer?.interestMonth || 0}%`} label="Monthly Interest Rate:" />
			<InfoDisplay 
					value={
						getMasterDataName(configOptions.listLoanInterestFrequency, applicationDetail?.loanOffer?.interestFrequency)
					} 
					label="Interest Frequency:"
				/>
			<InfoDisplay
				value={
					getMasterDataName(configOptions.listInterestCalculationMethod, applicationDetail?.loanOffer?.interestCalculateMethod)
				}
				label="Interest Calculation Method:"
			/>
			<div className="col-span-full">
				<p className="font-bold">Fees</p>
			</div>
			<InfoDisplay value={applicationDetail?.loanOffer?.adminFeeRate || 0} label="Admin Fee (%)" />
			<InfoDisplay value={calcAdminFee(applicationDetail?.loanOffer?.loanAmountOffer, applicationDetail?.loanOffer?.adminFeeRate, applicationDetail?.borrower?.currency)} label="Admin Fee :" />
			<div></div>
			<InfoDisplay value={applicationDetail?.loanOffer?.lateInterest || 0} label="Late Interest (%)" />
			<InfoDisplay value={`${applicationDetail?.borrower.currency} ${formatCurrency(applicationDetail?.loanOffer?.lateFee || 0)}`} label="Late Fee :" />
		</div>
	)

};

export default LoanOfferViewMode;